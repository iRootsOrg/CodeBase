function y = myfunction(inputFile, outputFile)
    % Read input
    input = load(inputFile);
    
    % Process input
    y = input^2;
    
    % Write output
    save(outputFile, 'y');
end
