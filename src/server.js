const http = require('http');
const app = require('./app');
const logger = require('./helpers/logger');

const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);
const address = server.address();
const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;

const errorHandler = (error) => {
  if (error.syscall !== 'listen') throw error;
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`);
      break;
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use.`);
      break;
    default:
      throw error;
  }
  process.exit(1);
};

server.on('error', errorHandler);
server.on('listening', () => {
  logger.info(`Listening on ${bind}`);
});

server.listen(port);
