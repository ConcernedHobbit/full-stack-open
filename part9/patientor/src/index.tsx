import { CssBaseline } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { reducer, StateProvider } from "./state";

ReactDOM.render(
  <>
    <CssBaseline />
    <StateProvider reducer={reducer}>
      <App />
    </StateProvider>
  </>,
  document.getElementById('root')
);
