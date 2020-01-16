import React, { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';

function App() {
  const socket = io('http://localhost:3001');
  const [challenge, setChallenge] = useState('No challenge');

  useEffect(() => {
    socket.emit('my other event', { my: 'message received' });
  });

  return (
    <div className="App">
      Current challenge:
      { challenge }
    </div>
  );
}

export default App;
