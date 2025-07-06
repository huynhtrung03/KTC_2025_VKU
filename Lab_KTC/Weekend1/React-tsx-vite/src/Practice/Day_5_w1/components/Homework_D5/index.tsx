import React from 'react';
import ReactDOM from 'react-dom/client';
import Cal from './Calculator/Calculator';
import Form from './RegistrationForm/RegistrationForm';
import App from './ShoppingCart/App'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Cal />
    <Form />
    <App />
  </React.StrictMode>,
);



