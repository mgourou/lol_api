import React from 'react';
import ReactDOM from 'react-dom/client';
import './_index.sass'
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>
  <React.StrictMode>
  <Router basename="/">
    <App />
    </Router>
  </React.StrictMode>
</Provider>
);
