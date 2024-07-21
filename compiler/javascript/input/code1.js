// Read from stdin (input.txt) and write to stdout (output.txt)
process.stdin.setEncoding('utf8');

let input = '';

process.stdin.on('data', function(chunk) {
    input += chunk;
});

process.stdin.on('end', function() {
    // Process the input data
    const output = input.toUpperCase(); // Example: convert input to uppercase
    console.log(output);
});
