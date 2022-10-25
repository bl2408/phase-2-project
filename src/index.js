import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router } from 'react-router-dom'

import './index.css';

import {App} from './components/App';
import { UserContextProvider } from './components/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
        <UserContextProvider>
          <App />
        </UserContextProvider>
    </Router>
  </React.StrictMode>
);
