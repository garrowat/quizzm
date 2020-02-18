import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import logo from './images/logo.png';

const LobbyContainer = styled('div')`
  height: 100vh;
  display: flex;
  flex-basis: 100%;
  justify-content: center;
`;

const LobbyBox = styled('div')`
  display: flex;
  flex-direction: column;
  flex-basis: 500px;
  align-items: center;
`;

const JoinButton = styled(Button)`
  margin-top: 10px;
`;

const Lobby = () => {
  const randomName = `Anonymous_Coward${Math.floor(Math.random() * 1000 + Math.random() * 100 + Math.random() * 10)}`;

  const [name, setName] = useState(randomName);
  const [room, setRoom] = useState('');

  return (
    <LobbyContainer>
      <LobbyBox>
        <img alt="Innovative Purple Quizzm Logo" src={logo} />
        <div>
          <TextField placeholder={name} type="text" onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <TextField placeholder="Room Name" type="text" onChange={(e) => setRoom(e.target.value)} />
        </div>
        <Link style={{ textDecoration: 'none' }} onClick={(e) => ((!name || !room) ? e.preventDefault() : null)} to={`/quiz?name=${name}&room=${room}`}>
          <JoinButton variant="contained" color="primary" type="submit">
            <Typography variant="button" display="block">Join Room</Typography>
          </JoinButton>
        </Link>
      </LobbyBox>
    </LobbyContainer>
  );
};

export default Lobby;
