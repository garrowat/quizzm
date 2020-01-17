/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Link from 'react-router-dom';

const Lobby = () => {
  const randomName = `Anonymous_Coward${Math.floor(Math.random() * 1000 + Math.random() * 100 + Math.random() * 10)}`;

  const [name, setName] = useState(randomName);
  const [room, setRoom] = useState('');

  return (
    <div>
      <div>
        <input placeholder="" type="text" onChange={(e) => setName(e.target.value)} />
        <input placeholder="" type="text" onChange={(e) => setRoom(e.target.value)} />
      </div>
      <Link onClick={(e) => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
        <button type="submit">Join Room</button>
      </Link>
    </div>
  )
}

export default Lobby;