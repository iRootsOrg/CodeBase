# Code Runner Docker Container

This repository contains a Docker container setup to run JavaScript code files with corresponding input files. Follow the steps below to build and run the container, and to use the API for running your code files and fetching the output.

## Steps to Run the Docker Container

1. Navigate to the `compiler` directory:
    ```sh
    cd .\compiler\
    ```

2. Navigate to the `javascript` directory:
    ```sh
    cd .\javascript\
    ```

3. Build the Docker container with the tag `code-runner`:
    ```sh
    docker build -t code-runner .
    ```

4. Run the Docker container in detached mode and map port 5000 of the container to port 5000 of your host:
    ```sh
    docker run -d -p 5000:5000 code-runner
    ```

## Using Postman to Interact with the API

### Upload Code and Input Files

1. Open Postman and create a POST request to:
    ```
    http://localhost:5000/upload
    ```

2. In the body section, select `form-data` and create two key-value pairs:
    - `codefile`: Select multiple code files (their names must be in the format `codefile1.js`, `codefile2.js`, etc.).
    - `inputfile`: Select multiple input files (their names must be in the format `inputfile1_1.txt`, `inputfile2_1.txt`, etc.). Even if there is only one input file, it should be named `inputfile1_1.txt`.

### Download Output Files

1. To download the output file, create a GET request to:
    ```
    http://localhost:5000/download/outputfile1_1.txt
    ```
   You will get your output in the response.

## Notes

- Ensure that the code files and input files follow the specified naming conventions.
- The container runs a service that continuously monitors for new code and input files, executes the code, and generates the output files.
