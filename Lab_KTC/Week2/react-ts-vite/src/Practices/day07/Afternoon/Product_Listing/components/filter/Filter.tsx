import React, { useState, useEffect } from 'react';
import styles from './Filter.module.css';
import { fetchCategories } from '../../api/productApi';
import type { Category } from '../../types/product';

interface FilterSidebarProps {
  onCategoryChange: (selectedCategoryIds: number[]) => void;
  selectedCategoryIds: number[];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onCategoryChange, selectedCategoryIds }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err: any) {
        setError(err.message || 'Không thể tải danh mục.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, []);




  // Tick "Tất cả" sẽ bỏ chọn hết
  const handleAllChange = () => {
    onCategoryChange([]);
  };

  // Tick từng mục, có thể chọn nhiều mục
  const handleCheckboxChange = (categoryId: number) => {
  let newSelectedIds: number[];
  if (selectedCategoryIds.includes(categoryId)) {
    newSelectedIds = selectedCategoryIds.filter(id => id !== categoryId);
  } else {
    newSelectedIds = [...selectedCategoryIds, categoryId];
  }
  // Không kiểm tra chọn hết nữa, chỉ cập nhật danh sách đã chọn
  onCategoryChange(newSelectedIds);
  };
// "Tất cả" được tick khi không chọn mục nào
  const isAllChecked = selectedCategoryIds.length === 0;
  



  // "Tất cả" được tick khi không chọn mục nào hoặc đã tick hết tất cả mục con
  // const isAllChecked =
  //   selectedCategoryIds.length === 0 ||
  //   selectedCategoryIds.length === categories.length;

  return (
    <div className={styles.sidebar}>
      <h3 className={styles.sidebarTitle}>Bộ lọc</h3>
      {loading && <p>Đang tải danh mục...</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
      {!loading && !error && (
        <div className={styles.categoryList}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={isAllChecked}
              onChange={handleAllChange}
              className={styles.checkboxInput}
            />
            Tất cả
          </label>
          {categories.map((category) => (
            <label key={category.id} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                value={category.id}
                checked={selectedCategoryIds.includes(category.id)}
                onChange={() => handleCheckboxChange(category.id)}
                className={styles.checkboxInput}
              />
              {category.name}
            </label>
          ))}
        </div>
      )}
      {!loading && !error && categories.length === 0 && <p>Không có danh mục nào.</p>}
    </div>
  );
};

export default FilterSidebar;