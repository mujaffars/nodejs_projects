const http = require('http');
const { parser } = require('stream-json');
const { streamArray } = require('stream-json/streamers/StreamArray');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/upload-json') {
    const jsonParser = parser();
    const jsonArrayStream = streamArray();

    req.pipe(jsonParser.input);
    jsonParser.pipe(jsonArrayStream.input);

    jsonArrayStream.on('data', ({ key, value }) => {
      // Process each JSON object in the array
      console.log(`Processing item with key: ${key}, value: ${JSON.stringify(value)}`);
    });

    jsonArrayStream.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('JSON processed successfully');
    });

    jsonArrayStream.on('error', (err) => {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Failed to process JSON');
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
