const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const http = require('http').Server(app);

const io = require('socket.io')(http);

io.on('connection', (socket) => {
  socket.emit('challenge', { hello: 'world' });
  socket.on('my other event', (data) => {
    console.log('received', { data });
  });
});

http.listen(3001);

app.use(express.static(__dirname + '../public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
