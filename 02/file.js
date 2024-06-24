const fs = require('fs');

const filename = 'example100.txt';
const initialData = 'Hello, Node.js!';

// Read file
fs.readFile(filename, 'utf8', (err, data) => {
  if (err) {
    // If file doesn't exist, create it and add initial data
    if (err.code === 'ENOENT') {
      console.log(`${filename} does not exist. Creating the file...`);
      fs.writeFile(filename, initialData, err => {
        if (err) throw err;
        console.log(`${filename} created with initial data.`);
      });
      return;
    }
    // Handle other errors
    throw err;
  }
  console.log(data);
});

// Write to file
fs.writeFile(filename, 'Hello, Node.js!', { flag: 'a' }, err => {
  if (err) throw err;
  console.log('Data appended to file.');
});
