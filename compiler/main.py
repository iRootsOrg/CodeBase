import subprocess
import os
import hashlib
import pickle
import logging
import psutil
import time
import threading

# Set the time limit in seconds
TIME_LIMIT = 5

# Set the memory limit in bytes (e.g., 100MB)
MEMORY_LIMIT = 100 * 1024 * 1024

# Set up logging
logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)

# Define the cache file location
cache_file = 'cache.pkl'

def load_cache():
    """Load the cache from the file if it exists."""
    if os.path.exists(cache_file):
        with open(cache_file, 'rb') as f:
            return pickle.load(f)
    return {}

def save_cache(cache):
    """Save the cache to the file."""
    with open(cache_file, 'wb') as f:
        pickle.dump(cache, f, protocol=pickle.HIGHEST_PROTOCOL)

def get_file_hash(file_path, block_size=65536):
    """Calculate SHA-256 hash of the file content in chunks for efficiency."""
    hasher = hashlib.sha256()
    with open(file_path, 'rb') as f:
        buf = f.read(block_size)
        while len(buf) > 0:
            hasher.update(buf)
            buf = f.read(block_size)
    return hasher.hexdigest()

def read_input_from_file(input_file):
    """Read input data from a specified file."""
    with open(input_file, 'r') as f:
        return f.read().strip()

def monitor_memory(process, terminate_event):
    """Monitor the memory usage of the process and terminate if it exceeds the limit."""
    try:
        while process.is_running():
            if terminate_event.is_set():
                break
            memory_usage = process.memory_info().rss
            if memory_usage > MEMORY_LIMIT:
                process.terminate()
                logger.error("Memory limit exceeded")
                with open('output.txt', 'w') as f:
                    f.write("Memory limit exceeded")
                terminate_event.set()
                return "Memory limit exceeded"
            time.sleep(0.1)
    except psutil.NoSuchProcess:
        pass

def execute_code(file_path, cache):
    """Compile and run the code if not cached; otherwise, return the cached result."""
    # Define compile and run commands based on file extension
    language_settings = {
        '.py': {
            'compile_cmd': None,
            'run_cmd': ['python', '{file_path}']
        },
        '.cpp': {
            'compile_cmd': ['g++', '{file_path}', '-o', '{file_base}.out'],
            'run_cmd': ['./{file_base}.out']
        },
        '.java': {
            'compile_cmd': ['javac', '{file_path}'],
            'run_cmd': ['java', '{file_base}']
        },
        '.js': {
            'compile_cmd': None,
            'run_cmd': ['node', '{file_path}']
        },
        '.rb': {
            'compile_cmd': None,
            'run_cmd': ['ruby', '{file_path}']
        },
    }

    _, file_extension = os.path.splitext(file_path)
    if file_extension not in language_settings:
        raise ValueError(f"Unsupported file extension: {file_extension}")

    settings = language_settings[file_extension]
    compile_cmd = settings['compile_cmd']
    run_cmd = settings['run_cmd']

    file_base, _ = os.path.splitext(file_path)

    # Calculate file hash
    file_hash = get_file_hash(file_path)

    # Read inputs from input.txt file
    input_data = read_input_from_file('input.txt')

    # Check if result is already in cache, considering input
    if file_hash in cache and 'input' in cache[file_hash]:
        cached_input = cache[file_hash]['input']
        if cached_input == input_data:
            return cache[file_hash]['output']

    try:
        # Compile the code if necessary
        if compile_cmd:
            compile_cmd = [arg.format(file_path=file_path, file_base=file_base) for arg in compile_cmd]
            compile_process = subprocess.run(compile_cmd, capture_output=True, text=True, timeout=TIME_LIMIT)
            if compile_process.returncode != 0:
                error_message = f"Compilation Error:\n{compile_process.stderr.strip()}"
                logger.error(error_message)
                return error_message

        # Run the code
        if input_data:
            run_cmd = [arg.format(file_path=file_path, file_base=file_base) for arg in run_cmd]
            process = psutil.Popen(run_cmd, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
            process.stdin.write(input_data)
            process.stdin.close()
        else:
            run_cmd = [arg.format(file_path=file_path, file_base=file_base) for arg in run_cmd]
            process = psutil.Popen(run_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

        terminate_event = threading.Event()
        # Start the memory monitoring thread
        memory_thread = threading.Thread(target=monitor_memory, args=(process, terminate_event))
        memory_thread.start()

        try:
            stdout, stderr = process.communicate(timeout=TIME_LIMIT)
        except subprocess.TimeoutExpired:
            process.kill()
            terminate_event.set()
            memory_thread.join()
            logger.error("Time limit exceeded")
            return "Time limit exceeded"

        memory_thread.join()

        if terminate_event.is_set():
            return "Memory limit exceeded"

        if process.returncode != 0:
            error_message = f"Runtime Error:\n{stderr.strip()}"
            logger.error(error_message)
            return error_message

        # Cache the result along with the input
        output = stdout
        cache[file_hash] = {'output': output, 'input': input_data}
        save_cache(cache)
        return output

    except Exception as e:
        error_message = f"Error:\n{str(e)}"
        logger.error(error_message)
        return error_message
    finally:
        # Check if the files are present before removing them
        if compile_cmd:
            if file_extension == '.cpp' and os.path.exists(f"{file_base}.out"):
                os.remove(f"{file_base}.out")
            elif file_extension == '.java' and os.path.exists(f"{file_base}.class"):
                os.remove(f"{file_base}.class")

# Main script
output = 'None'
if __name__ == '__main__':
    cache = load_cache()
    print("Files available in the current directory:")
    current_files = [file_name for file_name in os.listdir('.') if os.path.isfile(file_name) and file_name != 'main.py']
    for file_name in current_files:
        print(file_name)

    file_to_execute = input("\nEnter the filename you want to execute: ")
    if not os.path.isfile(file_to_execute):
        print("File not found in the current directory.")
    else:
        output = execute_code(file_to_execute, cache)
        print(f"Output:\n{output}")

    if output != "Memory limit exceeded":
        # Write the output to output.txt file
        with open('output.txt', 'w') as f:
            f.write(output)
    print("Output written to output.txt file.")