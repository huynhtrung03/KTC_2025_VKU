import React, { useState } from 'react'; // Cần useState để lưu trữ lựa chọn hiện tại
import styles from './Dropdown.module.css'; // File CSS để trang trí

// Dữ liệu cho các lựa chọn trong dropdown
const fruitOptions = [
  { value: 'apple', label: 'Táo' },
  { value: 'banana', label: 'Chuối' },
  { value: 'orange', label: 'Cam' },
  { value: 'grape', label: 'Nho' }, // Thêm một vài lựa chọn nữa cho phong phú
  { value: 'kiwi', label: 'Kiwi' },
];

// Đây là component (thành phần) của chúng ta
const DropdownSelection: React.FC = () => {
  // 1. Biến trạng thái để lưu trữ giá trị của lựa chọn hiện tại
  // `selectedFruit` là giá trị (ban đầu là chuỗi rỗng '' hoặc một giá trị mặc định)
  // `setSelectedFruit` là hàm dùng để CẬP NHẬT giá trị này
  const [selectedFruit, setSelectedFruit] = useState(''); // Ban đầu không chọn gì

  // 2. Hàm này sẽ chạy mỗi khi người dùng thay đổi lựa chọn trong dropdown
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // `event.target.value` là giá trị của lựa chọn mà người dùng vừa chọn
    setSelectedFruit(event.target.value); // Cập nhật trạng thái `selectedFruit`
  };

  // 3. Phần giao diện mà component này sẽ hiển thị
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Chọn trái cây</h2>

      {/* Danh sách thả xuống (dropdown) */}
      <select
        className={styles.dropdown}
        value={selectedFruit} // Giá trị của dropdown luôn được đồng bộ với `selectedFruit`
        onChange={handleSelectChange} // Khi lựa chọn thay đổi, gọi hàm `handleSelectChange`
      >
        {/* Lựa chọn mặc định khi chưa chọn gì */}
        <option value="" disabled>
          -- Chọn một loại trái cây --
        </option>

        {/* Duyệt qua mảng `fruitOptions` để tạo các lựa chọn */}
        {fruitOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Chỗ hiển thị trái cây đã chọn */}
      <p className={styles.displayText}>
        Trái cây đã chọn:{' '}
        <span className={styles.selectedText}>
          {selectedFruit === '' ? 'chưa có gì' : fruitOptions.find(f => f.value === selectedFruit)?.label || 'Không xác định'}
        </span>
        {/*
          Giải thích:
          - Nếu `selectedFruit` là chuỗi rỗng (chưa chọn gì), hiển thị "chưa có gì".
          - Ngược lại, tìm `label` tương ứng với `selectedFruit` trong `fruitOptions` để hiển thị.
            `|| 'Không xác định'` để phòng trường hợp không tìm thấy (dù ít xảy ra).
        */}
      </p>
    </div>
  );
};

export default DropdownSelection; // Cho phép các file khác sử dụng component này