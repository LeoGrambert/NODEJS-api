require('dotenv').config();
const http = require('http');

const server = http.createServer((req, res) => {
  res.end('API MARKETPLACE');
});

server.listen(process.env.PORT || 3000);
