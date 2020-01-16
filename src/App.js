/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';

function App() {
  const socket = io('http://localhost:3001');
  const [name, setName] = useState('Anonymous Coward')
  const [inLobby, setInLobby] = useState(false);
  const [quiz, setQuiz] = useState('Start a Quiz');

  useEffect(() => {
    socket.emit('player connected', { room: 'Someone has connected' });
  });

  const joinLobby = (e) => {
    e.preventDefault();
    setInLobby(!inLobby);
    socket.emit('join lobby', { message: 'Someone has joined the lobby' });
  };

  return (
    <div className="App">
      <input type=""></input>
      <div>
        { inLobby ? 'Joined Lobby' : 'Not in Lobby' }
      </div>
      <div>
        <button type="button" onClick={joinLobby}>
          { inLobby ? 'Leave Lobby' : 'Join lobby' }
        </button>
      </div>
      <div>
        Current quiz:
        { quiz }
      </div>
      <div>
        <button>Start Quiz</button>
      </div>
    </div>
  );
}

export default App;
