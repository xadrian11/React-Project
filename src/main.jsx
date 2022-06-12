import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './components/UserProvider';
import App from './components/App';
import { basename } from '../config.json';

ReactDOM.render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root'),
);
