/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';
import 'typeface-roboto';

import Lobby from './components/Lobby';
import Quiz from './components/Quiz';

const App = () => (
  <StylesProvider injectFirst>
    <Router>
      <Route path="/" exact component={Lobby} />
      <Route path="/quiz" component={Quiz} />
    </Router>
  </StylesProvider>
);

export default App;
