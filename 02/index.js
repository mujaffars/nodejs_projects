const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, world ssa ad a adfas fas!\n');
});

const PORT = process.env.PORT || 3005;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
