/* eslint-disable linebreak-style */
const express = require('express');
const path = require('path');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3001;
const router = require('./router');

const quizzes = require('./models');

const players = {};
const quiz = {};

io.on('connection', (socket) => {
  socket.on('disconnect', (data) => {
    console.log('A user disconnected: ', data);
  });

  socket.on('join room', ({ name, room }) => {
    console.log({ name, room });
  });
});

app.use(router);

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
