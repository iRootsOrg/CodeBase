import sys
import subprocess
import io


def execute_python(code):
    original=sys.stdout
    sys.stdout=output_capture=io.StringIO()
    
    try:
        exec(code)
        out=output_capture.getvalue()
        print('out of the code',out)
        return out
    except Exception as e:
        return str(e)
    finally:
        sys.stdout=original
 
 
 
def execute_java(code):
    try:
        print('Code received:', code)

        with open('/tmp/Main.java', 'w') as java_file:
            java_file.write(code)

        import subprocess

       
        compile_result = subprocess.run(
            ['javac', '/tmp/Main.java'], stdout=subprocess.PIPE, stderr=subprocess.PIPE
        )
        print('Compilation result:', compile_result.returncode)

        if compile_result.returncode != 0:
       
            return f"Compilation failed: {compile_result.stderr.decode()}"
        else:
         
            run_result = subprocess.run(
                ['java', '-classpath', '/tmp', 'Main'], stdout=subprocess.PIPE, stderr=subprocess.PIPE
            )
            print('Run result:', run_result.returncode)
            return run_result.stdout.decode()

    except Exception as e:
        return str(e)
    



def execute_cpp(code):
    try:
        print('This is the code that we have received:\n', code)
        
      
        with open('/tmp/temp.cpp', 'w') as cpp_file:
            cpp_file.write(code)
        
        compile_result = subprocess.run(
            ['g++', '/tmp/temp.cpp', '-o', '/tmp/temp'],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        print('Compilation result:', compile_result.returncode)
        
        if compile_result.returncode != 0:
            return f"Compilation failed: {compile_result.stderr.decode()}"
        
       
        run_result = subprocess.run(
            ['/tmp/temp'],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        print('Run result:', run_result.returncode)
        return run_result.stdout.decode()
    
    except Exception as e:
        return str(e)

    
    
    
    
def handler(event, context):
    language = event.get('language', 'python')
    code = event.get('code', '')
    if language == 'python' :
        res=execute_python(code)
    elif language == 'java' :
        res = execute_java(code)
    elif language == 'cpp' :
        res = execute_cpp(code)
    else:
        res = 'Unsupported Language' + language
    return{
        'statusCode' : 200,
        'body' : res 
    }
        