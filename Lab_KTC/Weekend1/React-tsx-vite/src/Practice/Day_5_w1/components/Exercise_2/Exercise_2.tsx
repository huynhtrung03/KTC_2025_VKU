import React, { useState } from 'react'; // Cần useState để lưu trữ giá trị nhập vào
import styles from './Exercise_2.module.css'; // File CSS để trang trí

// Đây là component (thành phần) của chúng ta
const InputFieldTracker: React.FC = () => {
  // 1. Tạo một "biến trạng thái" để lưu trữ chữ người dùng đang gõ
  // `inputValue` là giá trị hiện tại của ô nhập liệu (ban đầu là chuỗi rỗng '')
  // `setInputValue` là hàm dùng để CẬP NHẬT giá trị của `inputValue`
  const [inputValue, setInputValue] = useState('');

  // 2. Hàm này sẽ chạy mỗi khi người dùng gõ (thay đổi) nội dung trong ô input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // `event.target.value` là giá trị mới mà người dùng vừa gõ vào
    // Cập nhật giá trị của `inputValue`
    setInputValue(event.target.value);
  };

  // 3. Phần giao diện mà component này sẽ hiển thị
  return (
    <div className={styles.container}>
      {/* Ô nhập liệu */}
      <input
        type="text" // Kiểu là ô nhập chữ
        className={styles.inputField}
        placeholder="Gõ gì đó vào đây..." // Chữ gợi ý khi ô trống
        value={inputValue} // Giá trị của ô input luôn được đồng bộ với `inputValue`
        onChange={handleInputChange} // Khi nội dung ô input thay đổi, gọi hàm `handleInputChange`
      />

      {/* Chỗ hiển thị giá trị đã gõ */}
      <p className={styles.displayText}>
        Bạn đã gõ: {inputValue === '' ? 'không có gì' : inputValue}
        {/*
          Giải thích:
          - Nếu `inputValue` là chuỗi rỗng (tức là người dùng chưa gõ gì hoặc đã xóa hết), thì hiển thị "không có gì".
          - Ngược lại, hiển thị chính giá trị của `inputValue`.
        */}
      </p>
    </div>
  );
};

export default InputFieldTracker; // Cho phép các file khác sử dụng component này