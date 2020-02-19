import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const StyledContainer = styled('div')`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const StyledChatContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledTextField = styled(TextField)`
  margin-top: 5px
`;

let socket;

const Quiz = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = `${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_PORT}` || 'localhost:3001';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join room', { name, room });

    return () => {
      socket.emit('disconnect');

      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <StyledContainer>
      <StyledChatContainer>
        <p>Chat</p>
        <StyledTextField
          variant="outlined"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
        />
        <div>
          {
            messages.length > 0
            && messages.map((msg) => <Typography>{`${msg.user}: ${msg.text}`}</Typography>)
          }
        </div>
      </StyledChatContainer>
    </StyledContainer>
  );
};

export default Quiz;
