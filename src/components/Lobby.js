import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
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

const LobbyTextField = styled(TextField)`
  margin-bottom: 10px
`;

const JoinButton = styled(Button)`
  background-color: #665D8B;
  margin-top: 10px;
`;

const Lobby = () => {
  const randomName = `Anonymous_Coward${Math.floor(Math.random() * 1000 + Math.random() * 100 + Math.random() * 10)}`;

  const [name, setName] = useState(randomName);
  const [room, setRoom] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = () => {
    setRedirect(true);
  };

  return (
    redirect
      ? <Redirect to={`/quiz?name=${name}&room=${room}`} />
      : (
        <LobbyContainer>
          <form>
            <LobbyBox>
              <img alt="Innovative Purple Quizzm Logo" src={logo} />
              <div>
                <LobbyTextField
                  placeholder={name}
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <LobbyTextField
                  placeholder="Room Name"
                  type="text"
                  onChange={(e) => setRoom(e.target.value)}
                />
              </div>
              <Link style={{ textDecoration: 'none' }} onClick={(e) => ((!name || !room) ? e.preventDefault() : null)} to={`/quiz?name=${name}&room=${room}`}>
                <JoinButton variant="contained" color="primary" type="submit" onSubmit={handleSubmit} >
                  <Typography variant="button" display="block">Join Room</Typography>
                </JoinButton>
              </Link>
            </LobbyBox>
          </form>
        </LobbyContainer>
      )
  );
};

export default Lobby;
