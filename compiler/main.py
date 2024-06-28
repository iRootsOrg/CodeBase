import subprocess
import os

def execute_code(file_path):
    # Define compile and run commands based on file extension
    language_settings = {
        '.py': {
            'compile_cmd': None,
            'run_cmd': 'python {file_path}'
        },
        '.cpp': {
            'compile_cmd': 'g++ {file_path} -o {file_base}.out',
            'run_cmd': '{file_base}.out'
        },
        '.java': {
            'compile_cmd': 'javac {file_path}',
            'run_cmd': 'java {file_base}'
        },
        '.js': {
            'compile_cmd': None,
            'run_cmd': 'node {file_path}'
        },
        '.rb': {
            'compile_cmd': None,
            'run_cmd': 'ruby {file_path}'
        },
        # Add more languages as needed
    }

    _, file_extension = os.path.splitext(file_path)
    if file_extension not in language_settings:
        raise ValueError(f"Unsupported file extension: {file_extension}")

    settings = language_settings[file_extension]
    compile_cmd = settings['compile_cmd']
    run_cmd = settings['run_cmd']

    file_base, _ = os.path.splitext(file_path)

    try:
        # Compile the code if necessary
        if compile_cmd:
            compile_cmd = compile_cmd.format(file_path=file_path, file_base=file_base)
            compile_process = subprocess.run(compile_cmd, shell=True, capture_output=True, text=True)
            if compile_process.returncode != 0:
                return f"Compilation Error:\n{compile_process.stderr}"

        # Run the code
        run_cmd = run_cmd.format(file_path=file_path, file_base=file_base)
        run_process = subprocess.run(run_cmd, shell=True, capture_output=True, text=True)
        if run_process.returncode != 0:
            return f"Runtime Error:\n{run_process.stderr}"

        return run_process.stdout

    finally:
        if compile_cmd:
            if file_extension == '.cpp':
                os.remove(f"{file_base}.out")
            elif file_extension == '.java':
                os.remove(f"{file_base}.class")

# Main script
if __name__ == '__main__':
    print("Files available in the current directory:")
    for file_name in os.listdir('.'):
        if os.path.isfile(file_name):
            print(file_name)

    file_to_execute = input("\nEnter the filename you want to execute: ")
    if not os.path.isfile(file_to_execute):
        print("File not found in the current directory.")
    else:
        output = execute_code(file_to_execute)
        print(f"Output:\n{output}")
