import React from 'react'
import { useShoppingCart } from '../Practices/stores/useShoppingCart';
import { getProducts } from './services/product.service';


export default function Products() {
    const {addItem} = useShoppingCart((state) => state);
    const [products, setProducts] = React.useState<any[]>([]); 
    React.useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();

      setProducts(response.data);
    };

    fetchProducts();
  }, []);

    return (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Products</h2>
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="min-w-full bg-white border-collapse">
        <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">ID</th>
            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Name</th>
            <th className="px-6 py-4 text-right text-sm font-semibold uppercase tracking-wider">Price</th>
            <th className="px-6 py-4 text-right text-sm font-semibold uppercase tracking-wider">Discount</th>
            <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products?.map((product, index) => (
            <tr 
              key={product.id} 
              className={`${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              } hover:bg-blue-50 transition-colors duration-200`}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {product.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                {product.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-semibold">
                ${product.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                {product.discount ? `${product.discount}%` : 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <button
                  onClick={() => {
                    addItem(product, 1);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {products.length === 0 && (
      <div className="text-center py-8 text-gray-500">
        No products available
      </div>
    )}
  </div>
);
    
       
    
}







