import React, { useState } from 'react'; // Cần useState để lưu trạng thái số đếm
import styles from './Exercise_1.module.css'; // File CSS để trang trí

// Đây là component (thành phần) của chúng ta
const Click: React.FC = () => {
  // 1. Tạo một "biến trạng thái" để lưu số lần click
  // `count` là giá trị hiện tại của số đếm (ban đầu là 0)
  // `setCount` là hàm dùng để CẬP NHẬT giá trị của `count`
  const [count, setCount] = useState(0);

  // 2. Hàm này sẽ chạy mỗi khi nút được bấm
  const handleButtonClick = () => {
    // Cập nhật số đếm: lấy giá trị cũ (`count`) cộng thêm 1
    // Khi `setCount` được gọi, React sẽ tự động vẽ lại giao diện
    setCount(count + 1);
  };

  // 3. Phần giao diện mà component này sẽ hiển thị
  return (
    <div className={styles.container}>
      {/* Nút bấm */}
      <button
        className={styles.button}
        onClick={handleButtonClick} // Khi nút được bấm, gọi hàm `handleButtonClick`
      >
        Click Me
      </button>

      {/* Chỗ hiển thị số lần đã click */}
      <p className={styles.counterText}>
        Đã click: {count} lần {/* Hiển thị giá trị hiện tại của `count` */}
      </p>
    </div>
  );
};

export default Click; // Cho phép các file khác sử dụng component này