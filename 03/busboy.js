const http = require('http');
const Busboy = require('busboy');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/upload') {
    const busboy = new Busboy({ headers: req.headers });

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      const saveTo = `./uploads/${filename}`;
      file.pipe(fs.createWriteStream(saveTo));

      file.on('end', () => {
        console.log(`File [${fieldname}] finished`);
      });
    });

    busboy.on('finish', () => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('File uploaded successfully');
    });

    req.pipe(busboy);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
