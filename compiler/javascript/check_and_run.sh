#!/bin/sh

echo "Checking for new files..."

# Directory paths
INPUT_DIR="/usr/src/app/input"
OUTPUT_DIR="/usr/src/app/output"

# Iterate over the input directory and find code files
for code_file in "$INPUT_DIR"/codefile*.js; do
    # Derive the base name from the code file name
    base_name=$(basename "$code_file" .js)
    echo "Processing code file: $code_file"
    
    # Find all input files matching the pattern for this code file
    input_files_found=false
    for input_file in "$INPUT_DIR"/inputfile${base_name#codefile}_*.txt; do
        echo "Checking input file: $input_file"
        if [ -f "$input_file" ]; then
            input_files_found=true
            # Derive the output file name from the input file name
            output_file="$OUTPUT_DIR/$(basename "$input_file" .txt).txt"

            # Run the code file if output doesn't exist or input file is newer
            if [ ! -f "$output_file" ] || [ "$input_file" -nt "$output_file" ]; then
                echo "Running code file: $code_file with input file: $input_file"
                /usr/src/app/runner.sh
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
