import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import styles from './TopBar.module.css';

const Topbar: React.FC = () => {
  return (
    <div className={styles.topbar}>
      <div className={styles.searchBar}>
        <Search size={20} className={styles.searchIcon} />
        <input type="text" placeholder="Search..." className={styles.searchInput} />
      </div>
      <div className={styles.userSection}>
        <Bell size={20} className={styles.icon} />
        <div className={styles.userInfo}>
          <User size={20} className={styles.userAvatar} /> 
          <span>Trungg</span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;