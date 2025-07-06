import React, { useState } from 'react';
import styles from './ButtonTabs2.module.css';

// Định nghĩa kiểu dữ liệu cho mỗi tab
interface TabData {
  id: string; // Sử dụng string cho id để dễ dàng debug và khớp với nội dung
  label: string;
  content: string;
}

// Dữ liệu giả định cho các tab
const tabsData: TabData[] = [
  {
    id: 'history',
    label: 'HISTORY',
    content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.',
  },
  {
    id: 'approach',
    label: 'APPROACH',
    content: 'Contenido de tabNeque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
  },
  {
    id: 'culture',
    label: 'CULTURE',
    content: 'Our culture is built on innovation, collaboration, and a relentless pursuit of excellence. We believe in fostering an environment where ideas flourish and creativity is celebrated. Every team member contributes to our unique and supportive atmosphere.',
  },
  {
    id: 'method',
    label: 'METHOD',
    content: 'We employ an agile methodology, focusing on iterative development and continuous feedback. Our structured process ensures high-quality deliverables, adaptability to changing requirements, and efficient project completion from conception to deployment.',
  },
];

const ButtonTabs: React.FC = () => {
  // State để theo dõi tab đang được chọn. Khởi tạo với id của tab đầu tiên.
  const [activeTabId, setActiveTabId] = useState<string>(tabsData[0].id);

  // Tìm nội dung của tab đang hoạt động
  const activeTabContent = tabsData.find(tab => tab.id === activeTabId)?.content;

  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId); // Cập nhật tab đang hoạt động khi click
  };

  return (
    <div className={styles.tabsContainer}>
      <h1 className={styles.title}>Button Tabs</h1>

      {/* Phần các nút Tabs */}
      <div className={styles.tabButtonsWrapper}>
        {tabsData.map((tab) => (
          <button
            key={tab.id} // Key là id của tab
            className={`${styles.tabButton} ${
              activeTabId === tab.id ? styles.activeTab : ''
            }`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Phần hiển thị nội dung */}
      <div className={styles.tabContent}>
        <p>{activeTabContent}</p>
      </div>
    </div>

      





  );
};

export default ButtonTabs;