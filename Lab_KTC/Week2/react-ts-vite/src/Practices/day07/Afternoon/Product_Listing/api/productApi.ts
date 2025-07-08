import type { Product, Category } from '../types/product';

const BASE_API_URL = 'https://api.escuelajs.co/api/v1'; // API cho products và pagination
const CATEGORIES_API_URL = 'https://api.escuelajs.co/api/v1/categories'; // API cho categories (đã sửa để khớp với escuelajs.co)

interface ProductQueryParams {
  offset?: number;
  limit?: number;
  categoryId?: number; // Thêm tham số categoryId
}

// Lấy danh sách các danh mục
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(CATEGORIES_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Category[] = await response.json();
    // API Platzi có thể trả về một số category không có sản phẩm hoặc lỗi
    // API escuelajs.co/api/v1/categories trả về danh mục tốt hơn
    return data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};

// Lấy danh sách sản phẩm (có thể lọc theo category và phân trang)
export const fetchProducts = async (params: ProductQueryParams = {}): Promise<Product[]> => {
  const { offset = 0, limit = 10, categoryId } = params;
  let url = `${BASE_API_URL}/products?offset=${offset}&limit=${limit}`;

  if (categoryId) {
    url = `${BASE_API_URL}/categories/${categoryId}/products?offset=${offset}&limit=${limit}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404 && categoryId) {
          console.warn(`Category with ID ${categoryId} not found or has no products.`);
          return [];
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
};