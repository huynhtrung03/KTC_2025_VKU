
import { useShoppingCart } from '../stores/useShoppingCart';


export default function ShoppingCart() {
    const { items, addItem, decreaseItemQuantity, removeItem } = useShoppingCart((state) => state);
    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">🛒 Shopping Cart</h2>

            {items.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🛒</div>
                    <p className="text-xl text-gray-500 mb-2">Your cart is empty</p>
                    <p className="text-gray-400">Add some products to get started!</p>
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto shadow-lg rounded-lg">
                        <table className="min-w-full bg-white border-collapse">
                            <thead className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Product Name</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Quantity</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {items.map((item, index) => (
                                    <tr
                                        key={item.product.id}
                                        className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                            } hover:bg-green-50 transition-colors duration-200`}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {item.product.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                            {item.product.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-semibold">
                                            ${item.product.price.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex items-center justify-center gap-3">
                                                <button
                                                    onClick={() => {
                                                        if (item.quantity === 1) {
                                                            const confirmRemoval = window.confirm(`Bạn có muốn xóa sản phẩm "${item.product.title}" khỏi giỏ hàng không?`);
                                                            if (confirmRemoval) {
                                                                removeItem(item.product.id);
                                                            }
                                                        } else {
                                                            decreaseItemQuantity(item.product.id);
                                                        }
                                                    }}
                                                    className="w-8 h-8 rounded-full bg-red-500 text-white font-bold hover:bg-red-600 transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
                                                >
                                                    -
                                                </button>
                                                <div className="min-w-[50px] text-center font-semibold text-lg bg-gray-100 py-1 px-3 rounded-md">
                                                    {item.quantity}
                                                </div>
                                                <button
                                                    onClick={() => addItem(item.product, 1)}
                                                    className="w-8 h-8 rounded-full bg-green-500 text-white font-bold hover:bg-green-600 transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-bold text-lg">
                                            ${(item.product.price * item.quantity).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <button
                                                onClick={() => {
                                                    const confirmRemoval = window.confirm(`Are you sure you want to remove ${item.product.title} from the cart?`);
                                                    if (confirmRemoval) {
                                                        removeItem(item.product.id);
                                                    }
                                                }}
                                                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                                            >
                                                🗑️ Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Total Section */}
                    <div className="mt-6 bg-gray-50 rounded-lg p-6 border-l-4 border-green-500">
                        <div className="flex justify-between items-center">
                            <span className="text-xl font-semibold text-gray-700">Total Items:</span>
                            <span className="text-xl font-bold text-green-600">
                                {items.reduce((total, item) => total + item.quantity, 0)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-2xl font-semibold text-gray-700">Grand Total:</span>
                            <span className="text-3xl font-bold text-green-600">
                                ${items.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2)}
                            </span>
                        </div>

                    </div>
                </>
            )}
        </div>
    );
}



