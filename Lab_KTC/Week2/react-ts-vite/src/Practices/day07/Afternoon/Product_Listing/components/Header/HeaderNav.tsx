// src/components/Header/Header.tsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom'; 
import styles from './HeaderNav.module.css'; 

const HeaderNav: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.brandName}>
        <Link to="/" className={styles.brandLink}>Magazines</Link> 
      </div>
      <nav className={styles.navbarNav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink to="/" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>Home</NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/blog" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>Blog</NavLink>
          </li>
          <li className={`${styles.navItem} ${styles.dropdown}`}>
            <NavLink to="/category" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>Category</NavLink>
            
          </li>
          <li className={styles.navItem}>
            <NavLink to="/product" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>Product</NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/login" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>Login</NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/customer" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>Customer</NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.cartIcon}>
        🛒 0 
      </div>
    </header>
  );
};

export default HeaderNav;