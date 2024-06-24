const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/upload') {
      const fileStream = fs.createWriteStream('./uploaded_file');
      req.pipe(fileStream);

      req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('File uploaded successfully');
      });

      req.on('error', (err) => {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('File upload failed');
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });

  server.listen(3000, () => {
    console.log(`Worker ${process.pid} started`);
  });
}
