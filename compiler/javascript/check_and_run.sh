#!/bin/sh

echo "Checking for new files..."

# Directory paths
INPUT_DIR="/usr/src/app/input"
OUTPUT_DIR="/usr/src/app/output"

# Iterate over the input directory and find code files
for code_file in "$INPUT_DIR"/codefile*.js; do
    # Derive the input and output file names from the code file name
    base_name=$(basename "$code_file" .js | sed 's/codefile/inputfile/')
    input_file="$INPUT_DIR/${base_name}.txt"
    output_base=$(basename "$code_file" .js | sed 's/codefile/outputfile/')
    output_file="$OUTPUT_DIR/${output_base}.txt"

    # Run the code file if output doesn't exist or input file is newer
    if [ ! -f "$output_file" ] || [ "$input_file" -nt "$output_file" ]; then
        echo "Running code file: $code_file with input file: $input_file"
        /usr/src/app/runner.sh
    else
        echo "No changes detected for: $code_file"
    fi
done
