import React from 'react';
import { Outlet } from 'react-router-dom'; 
import HeaderNav from '../Header/HeaderNav'; 
import Footer from '../Footer/Footer';


const MainLayout: React.FC = () => {
  return (
    <div>
      <HeaderNav /> 
      <main style={{ padding: '20px 0' }}> 
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;