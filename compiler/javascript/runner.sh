#!/bin/sh

echo "Runner script started"

# Set the PATH to include the directory where Node.js is installed
export PATH="/usr/local/bin:$PATH"

# Function to execute a code file
run_code() {
  local code_file=$1
  local input_file=$2
  local output_file=$3

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
  echo "Output generated: $output_file"
}

# Ensure the output directory exists
mkdir -p /usr/src/app/output

# Iterate over the input directory and find code files
for code_file in /usr/src/app/input/codefile*.js; do
  # Derive the input and output file names from the code file name
  base_name=$(basename "$code_file" .js | sed 's/codefile/inputfile/')
  input_file="/usr/src/app/input/${base_name}.txt"
  output_base=$(basename "$code_file" .js | sed 's/codefile/outputfile/')
  output_file="/usr/src/app/output/${output_base}.txt"

  # Run the code file if output doesn't exist or input file is newer
  if [ ! -f "$output_file" ] || [ "$input_file" -nt "$output_file" ]; then
    echo "Running code file: $code_file with input file: $input_file"
    run_code "$code_file" "$input_file" "$output_file"
  else
    echo "No changes detected for: $code_file"
  fi
done
