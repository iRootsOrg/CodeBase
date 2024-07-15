#!/bin/sh

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

  node "$code_file" < "$input_file" > "$output_file"
}

# Ensure the output directory exists
mkdir -p output

# Iterate over the input directory and find code files
for code_file in input/code*.js; 
do
  # Derive the input and output file names from the code file name
  base_name=$(basename "$code_file" .js | sed 's/code/input/')
  input_file="input/${base_name}.txt"
  output_base=$(basename "$code_file" .js | sed 's/code/output/')
  output_file="output/${output_base}.txt"
  
  echo "Running code file: $code_file with input file: $input_file"
  
  # Run the code file in the background
  run_code "$code_file" "$input_file" "$output_file" &
done

# Wait for all background processes to finish
wait
