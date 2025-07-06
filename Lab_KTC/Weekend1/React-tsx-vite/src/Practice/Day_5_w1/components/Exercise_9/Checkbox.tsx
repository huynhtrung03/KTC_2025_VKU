import React, { useState } from 'react'; // Cần useState để lưu trữ trạng thái của checkbox
import styles from './Checkbox.module.css'; // File CSS để trang trí

// Đây là component (thành phần) của chúng ta
const CheckboxToggle: React.FC = () => {
  // 1. Biến trạng thái để lưu trữ xem checkbox có đang được chọn hay không
  // `isChecked` là true nếu được chọn, false nếu không. Ban đầu là false (không được chọn).
  // `setIsChecked` là hàm dùng để CẬP NHẬT giá trị này
  const [isChecked, setIsChecked] = useState(false); // Khởi tạo là không được chọn

  // 2. Hàm này sẽ chạy mỗi khi trạng thái của checkbox thay đổi (khi người dùng click vào nó)
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // `event.target.checked` là giá trị boolean (true/false) của checkbox
    // Cập nhật trạng thái `isChecked`
    setIsChecked(event.target.checked);
  };

  // 3. Phần giao diện mà component này sẽ hiển thị
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Công tắc ô kiểm</h2>

      <label className={styles.checkboxLabel}>
        {/* Ô kiểm (checkbox) */}
        <input
          type="checkbox" // Kiểu là checkbox
          className={styles.checkboxInput}
          checked={isChecked} // Trạng thái của checkbox được kiểm soát bởi `isChecked`
          onChange={handleCheckboxChange} // Khi trạng thái thay đổi, gọi hàm `handleCheckboxChange`
        />
        Bật/Tắt tôi
      </label>

      {/* Chỗ hiển thị trạng thái hiện tại của checkbox */}
      <p className={styles.displayText}>
        Ô kiểm đang:{' '}
        <span className={styles.statusText}>
          {isChecked ? 'được chọn' : 'không được chọn'}
        </span>
      </p>
    </div>
  );
};

export default CheckboxToggle; // Cho phép các file khác sử dụng component này