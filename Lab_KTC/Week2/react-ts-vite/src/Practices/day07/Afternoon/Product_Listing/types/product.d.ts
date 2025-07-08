
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[]; // Mảng các URL hình ảnh
  creationAt: string;
  updatedAt: string;
  category: Category; // Sản phẩm có một đối tượng category
}

export interface Category {
  id: number;
  name: string;
  image: string; // URL hình ảnh của danh mục
  creationAt: string;
  updatedAt: string;
}