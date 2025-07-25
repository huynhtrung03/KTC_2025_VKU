import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../../../App';
// Đường dẫn mới cho styles.module.css
import './renderList_04.module.css'; 

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element with ID 'root'.");
}