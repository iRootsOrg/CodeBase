const express = require('express');
const multer = require('multer');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');

const app = express();
const port = 5000;

// Set up storage for multer to save uploaded files to the desired directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/usr/src/app/input');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Configure multer to handle multiple files for each field without specifying maxCount
const upload = multer({ storage: storage }).fields([
  { name: 'codefile' },
  { name: 'inputfile' }
]);

app.post('/upload', (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(400).json({ error: 'An unknown error occurred.' });
    }

    if (!req.files['codefile'] || !req.files['inputfile']) {
      return res.status(400).json({ error: 'Both codefile and inputfile are required' });
    }

    const codeFiles = req.files['codefile'].map(file => file.path);
    const inputFiles = req.files['inputfile'].map(file => file.path);

    // Example of how to process files, replace with actual processing
    // For now, we'll just respond with the list of uploaded files
    res.status(200).json({
      message: 'Files processed successfully',
      codeFiles: codeFiles,
      inputFiles: inputFiles
    });
  });
});

// Route to download the output file
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join('/usr/src/app/output', filename);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
