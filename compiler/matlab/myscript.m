% my_script.m
function myscript
    % Read input from file
    inputFile = fopen('inputfile.txt', 'r');
    
    % Check if the file was opened successfully
    if inputFile == -1
        error('Failed to open input file.');
    end
    
    inputValue = fscanf(inputFile, '%f');
    fclose(inputFile);
    
    % Perform some computation
    result = inputValue + 10;
    
    % Write result to output file
    outputFile = fopen('outputfile.txt', 'w');
    if outputFile == -1
        error('Failed to open output file.');
    end
    
    fprintf(outputFile, '%f\n', result);
    fclose(outputFile);
end



