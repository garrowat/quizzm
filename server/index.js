const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const http = require('http').Server(app);

const io = require('socket.io')(http);

io.on('connection', (socket) => {
  socket.on('player connected', (data) => {
    io.emit('player connected', data);
    console.log( { data } );
  });

  socket.on('join lobby', (data) => {
    io.emit('join lobby', data);
    console.log( socket.id );
  });
});

http.listen(3001);

app.use(express.static(path.join(__dirname, '../build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


