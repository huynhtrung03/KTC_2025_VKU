import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Plus,
  Users, 
  LayoutDashboard, 
  Map, 
  Building, 
  HeartPulse, 
  History, 
  Settings, 
} from 'lucide-react';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.logoRow}>
          <div className={styles.logo}>
            <Plus size={20} />
          </div>
          <span className={styles.logoText}>H-care</span>
        </div>
      </div>
      <nav className={styles.navbarNav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink
              to="/patients"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              <Users size={20} className={styles.navIcon} />
              Patients
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/overview"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              <LayoutDashboard size={20} className={styles.navIcon} />
              Overview
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/map"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              <Map size={20} className={styles.navIcon} />
              Map
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/departments"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              <Building size={20} className={styles.navIcon} />
              Departments
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/doctors"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              <HeartPulse size={20} className={styles.navIcon} />
              Doctors
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              <History size={20} className={styles.navIcon} />
              History
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              <Settings size={20} className={styles.navIcon} />
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;