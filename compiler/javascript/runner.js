const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.length !== 3) {
  console.error('Usage: node runner.js <codeFile> <inputFile> <outputFile>');
  process.exit(1);
}

const [codeFile, inputFile, outputFile] = args;

if (!fs.existsSync(codeFile)) {
  console.error(`Code file not found: ${codeFile}`);
  process.exit(1);
}

if (!fs.existsSync(inputFile)) {
  console.error(`Input file not found: ${inputFile}`);
  process.exit(1);
}

// Execute the code file with the input file and write the result to the output file
const { spawn } = require('child_process');

const nodeProcess = spawn('node', [codeFile]);

const inputStream = fs.createReadStream(inputFile);
const outputStream = fs.createWriteStream(outputFile);

inputStream.pipe(nodeProcess.stdin);
nodeProcess.stdout.pipe(outputStream);

nodeProcess.on('close', (code) => {
  if (code !== 0) {
    console.error(`Code file execution failed with code: ${code}`);
    process.exit(1);
  } else {
    console.log(`Output file generated: ${outputFile}`);
    process.exit(0);
  }
});

nodeProcess.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});
