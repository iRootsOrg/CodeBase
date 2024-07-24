#!/bin/sh

echo "Runner script started"

# Set the PATH to include the directory where Node.js is installed
export PATH="/usr/local/bin:$PATH"

# Function to execute a code file
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

# Ensure the output directory exists
mkdir -p /usr/src/app/output

# Iterate over the input directory and find code files
for code_file in /usr/src/app/input/codefile*.js; do
  # Derive the base name from the code file name
  base_name=$(basename "$code_file" .js)
  echo "Processing code file: $code_file"
  
  # Find all input files matching the pattern for this code file
  input_files_found=false
  for input_file in /usr/src/app/input/inputfile${base_name#codefile}_*.txt; do
    echo "Checking input file: $input_file"
    if [ -f "$input_file" ]; then
      input_files_found=true
      # Derive the output file name from the input file name
      output_base=$(basename "$input_file" .txt | sed 's/inputfile/outputfile/')
      output_file="/usr/src/app/output/${output_base}.txt"

      # Run the code file if output doesn't exist or input file is newer
      if [ ! -f "$output_file" ] || [ "$input_file" -nt "$output_file" ]; then
        echo "Running code file: $code_file with input file: $input_file"
        run_code "$code_file" "$input_file" "$output_file"
      else
        echo "No changes detected for: $code_file with input file: $input_file"
      fi
    else
      echo "No input files found matching pattern for: $code_file"
    fi
  done

  if [ "$input_files_found" = false ]; then
    echo "No input files found matching pattern for: $code_file"
  fi
done
