#!/bin/sh

echo "Runner script started"

# Set the PATH to include the directory where Node.js is installed
export PATH="/usr/local/bin:$PATH"

# Function to execute a code file with multiple input files
run_code() {
  local code_file=$1
  local input_file=$2
  local output_file=$3

  echo "Running code file: $code_file with input file: $input_file"

  if [ ! -f "$code_file" ]; then
    echo "Code file not found: $code_file"
    return 1
  fi

  if [ ! -f "$input_file" ]; then
    echo "Input file not found: $input_file"
    return 1
  fi

  echo "Contents of $input_file:"
  cat "$input_file"
  
  node "$code_file" < "$input_file" > "$output_file"
  if [ $? -eq 0 ]; then
    echo "Output generated: $output_file"
  else
    echo "Error running code file: $code_file"
  fi
}

# Call the function with arguments
run_code "$1" "$2" "$3"
