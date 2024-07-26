#!/bin/sh

echo "Starting check_and_run script..."

# Directory paths
INPUT_DIR="/usr/src/app/input"
OUTPUT_DIR="/usr/src/app/output"

# Ensure the output directory exists
mkdir -p "$OUTPUT_DIR"

while true; do
    echo "Checking for new files..."
    
    # Iterate over the input directory and find code files
    for code_file in "$INPUT_DIR"/codefile*.js; do
        # Derive the base name from the code file name
        base_name=$(basename "$code_file" .js)
        echo "Processing code file: $code_file"
        
        # Flag to check if corresponding input files are found
        input_files_found=false

        # Find all input files matching the pattern for this code file
        for input_file in "$INPUT_DIR"/inputfile${base_name#codefile}_*.txt; do
            if [ -f "$input_file" ]; then
                input_files_found=true
                echo "Checking input file: $input_file"
                # Derive the output file name from the input file name
                output_base=$(basename "$input_file" .txt | sed 's/inputfile/outputfile/')
                output_file="$OUTPUT_DIR/${output_base}.txt"

                # Run the code file if output doesn't exist or input file is newer
                if [ ! -f "$output_file" ] || [ "$input_file" -nt "$output_file" ]; then
                    echo "Running code file: $code_file with input file: $input_file"
                    /usr/src/app/runner.sh "$code_file" "$input_file" "$output_file"
                else
                    echo "No changes detected for: $code_file with input file: $input_file"
                fi
            fi
        done

        if [ "$input_files_found" = false ]; then
            echo "No input files found matching pattern for: $code_file, skipping..."
        fi
    done

    # Sleep for a short period before checking again to avoid busy-waiting
    sleep 1
done
