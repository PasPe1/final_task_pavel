import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './components/app/App';

import { Provider } from 'react-redux'
import store from './store/index.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
