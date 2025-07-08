import React from 'react';
import { Outlet } from 'react-router-dom'; 
import HeaderNav from '../Header/HeaderNav'; 
import Footer from '../Footer/Footer';
// Nếu bạn muốn CSS riêng cho layout, tạo MainLayout.module.css
// import styles from './MainLayout.module.css';

const MainLayout: React.FC = () => {
  return (
    <div>
      <HeaderNav /> 
      <main style={{ padding: '20px 0' }}> 
        <Outlet /> 
      </main>
      {/* Bạn có thể thêm Footer ở đây nếu muốn */}
      <Footer />
    </div>
  );
};

export default MainLayout;