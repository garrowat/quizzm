const express = require('express');
const path = require('path');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const { getRandomQuizQuestion, getQuizAnswer } = require('./quizzes');

const PORT = process.env.PORT || 3001;
const router = require('./router');

io.on('connection', (socket) => {
  socket.on('join room', ({ name, room }, callback) => {
    const { user, error } = addUser({ id: socket.id, name, room });

    if (error) {
      return callback(error);
    }
    socket.emit('message', { user: 'lobby', text: `Hello ${user.name}, welcome to ${user.room}` });
    socket.broadcast.to(user.room).emit('message', { user: 'lobby', text: `${user.name} has joined!` });

    socket.join(user.room);
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', (data) => {
    console.log('A user disconnected: ', data);
  });
});

app.use(router);

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
