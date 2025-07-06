import React, { useState, useMemo } from 'react'; // Cần useState để quản lý input, useMemo để tối ưu hiệu suất lọc
import styles from './SearchFilter.module.css'; // File CSS để trang trí

// Dữ liệu gốc của chúng ta (danh sách các mục để tìm kiếm)
const initialItems: string[] = [
  "Apple", "Banana", "Orange", "Grapes", "Pineapple",
  "Mango", "Strawberry", "Blueberry", "Cherry", "Lemon",
  "Lime", "Watermelon", "Melon", "Peach", "Pear"
];

// Đây là component (thành phần) của chúng ta
const SearchFilter: React.FC = () => {
  // 1. Biến trạng thái để lưu trữ từ khóa tìm kiếm mà người dùng đang gõ
  // `searchTerm` là từ khóa hiện tại, `setSearchTerm` là hàm cập nhật
  const [searchTerm, setSearchTerm] = useState('');

  // 2. Hàm này sẽ chạy mỗi khi người dùng gõ vào ô tìm kiếm
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Cập nhật `searchTerm` với giá trị mới nhất
    setSearchTerm(event.target.value);
  };

  // 3. Logic lọc danh sách (quan trọng nhất)
  // `useMemo` giúp tối ưu hóa: Hàm này chỉ chạy lại khi `initialItems` HOẶC `searchTerm` thay đổi.
  // Nếu không dùng useMemo, nó sẽ lọc lại mỗi khi component render, dù `initialItems` và `searchTerm` không đổi.
  const filteredItems = useMemo(() => {
    // Nếu không có từ khóa tìm kiếm, hiển thị toàn bộ danh sách
    if (!searchTerm.trim()) { // .trim() loại bỏ khoảng trắng ở đầu/cuối
      return initialItems;
    }

    // Chuyển từ khóa tìm kiếm về chữ thường để không phân biệt hoa/thường khi so sánh
    const lowercasedSearchTerm = searchTerm.toLowerCase();

    // Lọc mảng `initialItems`
    return initialItems.filter(item =>
      // Chuyển từng mục về chữ thường rồi kiểm tra xem có chứa từ khóa tìm kiếm không
      item.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [initialItems, searchTerm]); // Phụ thuộc vào `initialItems` và `searchTerm`

  // 4. Phần giao diện mà component này sẽ hiển thị
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Lọc tìm kiếm trái cây</h2>

      {/* Ô nhập liệu tìm kiếm */}
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Tìm kiếm trái cây..."
        value={searchTerm} // Giá trị của input được kiểm soát bởi `searchTerm`
        onChange={handleSearchChange} // Xử lý sự kiện gõ phím
      />

      {/* Danh sách các mục đã được lọc */}
      <ul className={styles.itemList}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <li key={index} className={styles.listItem}>
              {item}
            </li>
          ))
        ) : (
          <li className={styles.noResults}>Không tìm thấy kết quả phù hợp.</li>
        )}
      </ul>
    </div>
  );
};

export default SearchFilter; // Cho phép các file khác sử dụng component này