import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../common/TopBar'; // Import Topbar
import styles from './DashboardLayout.module.css';

const DashboardLayout: React.FC = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar /> 
      <div className={styles.mainContentArea}>
        <Topbar /> 
        <main className={styles.content}>
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;