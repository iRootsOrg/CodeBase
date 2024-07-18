import sys
import subprocess
import io

def execute_python(code, user_inputs=None):
    original_stdout = sys.stdout
    original_stdin = sys.stdin
    
    # Redirect stdout to capture output
    sys.stdout = io.StringIO()
    
    if user_inputs is None:
        user_inputs = []
    
    # Simulate user inputs by redirecting stdin
    sys.stdin = io.StringIO("\n".join(user_inputs))
    
    try:
        exec(code)
        out = sys.stdout.getvalue()
        return out
    except Exception as e:
        return str(e)
    finally:
        sys.stdout = original_stdout
        sys.stdin = original_stdin  # Reset stdin to the default



def execute_java(code, user_inputs=None):
    try:
        if user_inputs is None:
            user_inputs = []

        # Write the Java code to a file
        with open('/tmp/Main.java', 'w') as java_file:
            java_file.write(code)

        # Compile the Java code
        compile_result = subprocess.run(
            ['javac', '/tmp/Main.java'], stdout=subprocess.PIPE, stderr=subprocess.PIPE
        )

        # Check if compilation was successful
        if compile_result.returncode != 0:
            return {
                'statusCode': 400,
                'body': f"Compilation failed: {compile_result.stderr.decode()}"
            }

        # Prepare the input string
        input_str = "\n".join(user_inputs)

        # Run the Java code
        run_result = subprocess.run(
            ['java', '-classpath', '/tmp', 'Main'],
            input=input_str.encode(),  # Pass user inputs to the Java program
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )

        # Check for runtime errors
        if run_result.returncode != 0:
            return {
                'statusCode': 400,
                'body': f"Runtime error: {run_result.stderr.decode()}"
            }

        # Get the output and remove any trailing newlines
        output = run_result.stdout.decode().strip()

        # Return the output from the Java program
        return {
            'statusCode': 200,
            'body': output
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': f"Exception: {str(e)}"
        }


def execute_cpp(code, user_inputs=None):
    try:
        if user_inputs is None:
            user_inputs = []

        with open('/tmp/temp.cpp', 'w') as cpp_file:
            cpp_file.write(code)

        # Compile the C++ code
        compile_result = subprocess.run(
            ['g++', '/tmp/temp.cpp', '-o', '/tmp/temp'],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )

        if compile_result.returncode != 0:
            return f"Compilation failed: {compile_result.stderr.decode()}"

        # Prepare the input string
        input_str = "\n".join(user_inputs)

        # Run the C++ code
        run_result = subprocess.run(
            ['/tmp/temp'],
            input=input_str.encode(),  # Pass user inputs to the C++ program
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        return run_result.stdout.decode() + run_result.stderr.decode()

    except Exception as e:
        return str(e)

def handler(event, context):
    language = event.get('language', 'python')
    code = event.get('code', '')
    user_inputs = event.get('inputs', [])  # Get a list of user inputs from the event

    if language == 'python':
        res = execute_python(code, user_inputs)
    elif language == 'java':
        res = execute_java(code, user_inputs)
    elif language == 'cpp':
        res = execute_cpp(code, user_inputs)
    else:
        res = f'Unsupported Language: {language}'

    return {
        'statusCode': 200,
        'body': res
    }
