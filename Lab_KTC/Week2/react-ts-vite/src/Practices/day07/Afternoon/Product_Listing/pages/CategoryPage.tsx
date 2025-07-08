import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Filter from '../components/filter/Filter';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import Pagination from '../components/Pagination/Pagination';
import { fetchProducts } from '../api/productApi';
import type { Product } from '../types/product';
import styles from './CategoryPage.module.css';

const PRODUCTS_PER_PAGE = 4; // 4 sản phẩm mỗi trang

const CategoryPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Lấy page và id từ query string
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const idParam = searchParams.get('id') ? [parseInt(searchParams.get('id')!, 10)] : [];

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(pageParam);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>(idParam);

  // Đồng bộ state với URL khi searchParams thay đổi
  useEffect(() => {
    setCurrentPage(pageParam);
    setSelectedCategoryIds(idParam);
    // eslint-disable-next-line
  }, [searchParams]);

  // useEffect để fetch sản phẩm
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const offset = (currentPage - 1) * PRODUCTS_PER_PAGE;
        let fetchedProducts: Product[] = [];
        let totalCountEstimate = 0;

        if (selectedCategoryIds.length > 0) {
         
          const firstSelectedCategoryId = selectedCategoryIds[0];
          fetchedProducts = await fetchProducts({
            offset,
            limit: PRODUCTS_PER_PAGE,
            categoryId: firstSelectedCategoryId
          });
          
          totalCountEstimate = 10;
        } else {
          
          fetchedProducts = await fetchProducts({
            offset,
            limit: PRODUCTS_PER_PAGE
          });
          totalCountEstimate = 50;
        }

        setProducts(fetchedProducts);
        setTotalPages(Math.ceil(totalCountEstimate / PRODUCTS_PER_PAGE));
      } catch (err: any) {
        setError(err.message || 'Đã xảy ra lỗi khi lấy dữ liệu sản phẩm.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [currentPage, selectedCategoryIds]); 
  const handlePageChange = (page: number) => {
    setSearchParams({
      ...(selectedCategoryIds.length > 0 ? { id: selectedCategoryIds[0].toString() } : {}),
      page: page.toString(),
    });
  };

  const handleCategoryFilter = (ids: number[]) => {
    setSearchParams({
      ...(ids.length > 0 ? { id: ids[0].toString() } : {}),
      page: '1',
    });
  };

  return (
    <div className={styles.categoryPageContainer}>
      <div className={styles.breadcrumb}>
        <span>Home</span> &gt; <span>Category</span>
      </div>

      <h1 className={styles.pageTitle}>Danh sách sản phẩm</h1>

      <div className={styles.contentWrapper}>
        {/* Sidebar lọc sản phẩm */}
        <div className={styles.sidebarSection}>
          <Filter
            onCategoryChange={handleCategoryFilter}
            selectedCategoryIds={selectedCategoryIds}
          />
        </div>

        <div className={styles.mainContent}>
          {loading && <p className={styles.message}>Đang tải sản phẩm...</p>}
          {error && <p className={styles.errorMessage}>{error}</p>}
          {!loading && !error && (
            <>
              <ProductGrid products={products} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;