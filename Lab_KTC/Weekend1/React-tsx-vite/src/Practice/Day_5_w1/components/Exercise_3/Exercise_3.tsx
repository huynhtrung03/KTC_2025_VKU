import React, { useState } from 'react'; // Cần useState để lưu trạng thái BẬT/TẮT
import styles from './Exercise_3.module.css'; // File CSS để trang trí

// Đây là component (thành phần) của chúng ta
const ToggleSwitch: React.FC = () => {
  // 1. Tạo một "biến trạng thái" để lưu xem công tắc đang BẬT hay TẮT
  // `isOn` là giá trị hiện tại (true = BẬT, false = TẮT). Ban đầu là TẮT (false).
  // `setIsOn` là hàm dùng để CẬP NHẬT giá trị của `isOn`
  const [isOn, setIsOn] = useState(false); // Khởi tạo là TẮT

  // 2. Hàm này sẽ chạy mỗi khi nút được bấm
  const handleToggle = () => {
    // Cập nhật trạng thái: nếu đang BẬT thì chuyển thành TẮT, nếu đang TẮT thì chuyển thành BẬT
    // Dấu `!` trước `isOn` có nghĩa là "ngược lại của `isOn`"
    setIsOn(!isOn);
  };

  // 3. Phần giao diện mà component này sẽ hiển thị
  return (
    <div className={styles.container}>
      {/* Nút bấm */}
      <button
        className={`${styles.toggleButton} ${isOn ? styles.on : styles.off}`}
        onClick={handleToggle} // Khi nút được bấm, gọi hàm `handleToggle`
      >
        {isOn ? 'Tắt' : 'Bật'} {/* Chữ trên nút thay đổi tùy theo trạng thái */}
      </button>

      {/* Chỗ hiển thị trạng thái hiện tại */}
      <p className={styles.stateText}>
        Trạng thái: {isOn ? 'BẬT' : 'TẮT'} {/* Hiển thị chữ BẬT hoặc TẮT */}
      </p>
    </div>
  );
};

export default ToggleSwitch; // Cho phép các file khác sử dụng component này