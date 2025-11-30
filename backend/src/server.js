require('dotenv').config();
const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

connectDB();

const server = http.createServer(app);
// later: attach socket.io for realtime chat here

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
