/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';

function App() {
  const socket = io('http://localhost:3001');
  const [name, setName] = useState(null);
  const [inLobby, setInLobby] = useState(false);
  const [lobbyList, setLobbyList] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quiz, setQuiz] = useState(' Start a Quiz');
  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    if (name === null) {
      const newName = `Anonymous_Coward${Math.floor(Math.random() * 1000 + Math.random() * 100)}`;
      setName(newName);
      socket.emit('player connected', { newName });
    }
  });

  useEffect(() => {
    socket.on('player connected', (payload) => {
      setPlayerList(payload);
    });

    socket.on('join lobby', (payload) => {
      setLobbyList(payload);
    });

    socket.on('quiz started', (payload) => {
      setQuiz(payload.question);
    });
  });

  const toggleLobby = (e) => {
    e.preventDefault();
    setInLobby(!inLobby);
    socket.emit('join lobby', { message: `${name} has joined the lobby`, name });
  };

  const startQuiz = (e) => {
    e.preventDefault();
    socket.emit('quiz started', { message: `${name} has started the quiz` });
    setQuizStarted(true);
  };

  return (
    <div className="App">
      <input type="text" />
      <div>
        { inLobby ? 'Joined Lobby' : 'Not in Lobby' }
      </div>
      <div>
        <button type="button" onClick={toggleLobby}>
          { inLobby ? 'Leave Lobby' : 'Join lobby' }
        </button>
      </div>
      <div>
        Current quiz:
        { inLobby ? quiz : 'Join the lobby to see quizzes' }
      </div>
      <div>
        <button type="button" onClick={startQuiz}>Start Quiz</button>
      </div>
      <div>
        Players connected:
        <ul>
          { playerList.map(player => <li key={player}>{player}</li>) }
        </ul>
      </div>
      <div>
        Players in lobby:
        <ul>
          { lobbyList.map(lobbyPlayer => <li key={`l${lobbyPlayer}`}>{lobbyPlayer}</li>) }
        </ul>
      </div>
    </div>
  );
}

export default App;
