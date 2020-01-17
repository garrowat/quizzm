/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Lobby from './components/Lobby';
import Quiz from './components/Quiz';

const App = () => (
  <Router>
    <Route path="/" exact component={Lobby} />
    <Route path="/quiz" component={Quiz} />
  </Router>
);

export default App;
