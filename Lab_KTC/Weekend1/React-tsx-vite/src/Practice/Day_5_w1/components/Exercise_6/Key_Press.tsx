



import React, {useState} from 'react'
import styles from './Key_Press.module.css'

// Đây là component (thành phần) của chúng ta
const KeyPress: React.FC = () => {
  // 1. Biến trạng thái để lưu trữ tên của phím cuối cùng được bấm
  // `lastKeyPressed` là tên phím (ban đầu là 'chưa có gì')
  // `setLastKeyPressed` là hàm dùng để CẬP NHẬT giá trị này
  const [lastKeyPressed, setLastKeyPressed] = useState('chưa có gì');

  // 2. Hàm này sẽ chạy mỗi khi có một phím được bấm xuống trong ô input
  // `event` chứa thông tin về sự kiện bấm phím
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // `event.key` là tên của phím mà người dùng vừa bấm
    // Ví dụ: 'a', 'Enter', 'Shift', 'ArrowUp'
    setLastKeyPressed(event.key);
  };

  // 3. Phần giao diện mà component này sẽ hiển thị
  return (
    <div className={styles.container}>
      {/* Ô nhập liệu */}
      <input
        type="text" // Kiểu là ô nhập chữ
        className={styles.inputField}
        placeholder="Bấm phím nào đó vào đây..." // Chữ gợi ý
        // Khi có phím được bấm xuống trong ô input, gọi hàm `handleKeyDown`
        onKeyDown={handleKeyDown}
      />

      {/* Chỗ hiển thị tên phím cuối cùng */}
      <p className={styles.displayText}>
        Phím cuối cùng: <span className={styles.keyName}>{lastKeyPressed}</span>
      </p>
    </div>
  );
};

export default KeyPress; // Cho phép các file khác sử dụng component này