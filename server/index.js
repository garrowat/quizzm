const express = require('express');
const path = require('path');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3001;

const quizzes = require('./models');

const players = [];
const lobby = [];

io.on('connection', (socket) => {

  socket.on('player connected', (data) => {
    players.push(data.newName);
    io.emit('player connected', players);
    console.log( { players } );
  });

  socket.on('join lobby', (data) => {
    lobby.push(data.name);
    io.emit('join lobby', lobby);
    console.log(data.message);
  });

  socket.on('quiz started', (data) => {
    console.log(data.message);
    io.emit('quiz started', quizzes[0]);
  });
});

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


