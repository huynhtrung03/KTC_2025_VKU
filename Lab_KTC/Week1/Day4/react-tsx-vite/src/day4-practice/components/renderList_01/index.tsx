import React from 'react';
import ReactDOM from 'react-dom/client';
import './renderList.module.css'; 
import App from '../../../App';


const rootElement = document.getElementById('root');

// Đảm bảo rootElement không phải là null trước khi tạo root
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element with ID 'root'.");
}