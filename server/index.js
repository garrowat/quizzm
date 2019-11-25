const express = require('express');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

server.listen(3000);

app.use(express.static(__dirname + '/../src'));

io.on('connection', function (socket)) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log({data});
  });
});
