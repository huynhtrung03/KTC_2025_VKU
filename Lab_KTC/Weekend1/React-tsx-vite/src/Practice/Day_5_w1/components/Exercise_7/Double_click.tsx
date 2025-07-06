import React, { useState } from 'react'; // Cần useState để quản lý trạng thái hiển thị thông báo
import styles from './Double_click.module.css'; // File CSS để trang trí

// Đây là component (thành phần) của chúng ta
const DoubleClickMessage: React.FC = () => {
  // 1. Biến trạng thái để kiểm soát việc hiển thị thông báo
  // `showMessage` là true nếu thông báo đang hiển thị, false nếu đang ẩn. Ban đầu là false.
  // `setShowMessage` là hàm dùng để CẬP NHẬT giá trị này
  const [showMessage, setShowMessage] = useState(false);

  // 2. Hàm này sẽ chạy mỗi khi nút được click đúp
  const handleDoubleClick = () => {
    // Đầu tiên, hiển thị thông báo
    setShowMessage(true);

    // Sau đó, đặt hẹn giờ để ẩn thông báo sau 2 giây (2000 mili giây)
    setTimeout(() => {
      setShowMessage(false); // Ẩn thông báo
    }, 2000); // 2000ms = 2 giây
  };

  // 3. Phần giao diện mà component này sẽ hiển thị
  return (
    <div className={styles.container}>
      {/* Nút bấm */}
      <button
        className={styles.button}
        onDoubleClick={handleDoubleClick} // Khi nút được click đúp, gọi hàm `handleDoubleClick`
      >
        Click đúp vào tôi!
      </button>

      {/* Chỗ hiển thị thông báo */}
      {showMessage && ( // Chỉ hiển thị khối này nếu `showMessage` là true
        <div className={styles.messageBox}>
          <p>Đã click đúp!</p>
        </div>
      )}
    </div>
  );
};

export default DoubleClickMessage; // Cho phép các file khác sử dụng component này