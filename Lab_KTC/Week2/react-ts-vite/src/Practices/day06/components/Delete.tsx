import React from 'react';

const url = 'https://server.aptech.io/online-shop/customers';

type Props = {
  customerId: number;
  onDeleted?: (id: number) => void;
};

export default function Delete({ customerId, onDeleted }: Props) {
  const [showConfirm, setShowConfirm] = React.useState(false);

  const handleOnDelete = async () => {
    try {
      const response = await fetch(`${url}/${customerId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Customer deleted successfully:', data);
      if (onDeleted && typeof onDeleted === 'function') {
        onDeleted(customerId);
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <div className="inline-block">
      <button
        className='bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition-colors'
        onClick={() => setShowConfirm(true)}
      >
        Delete
      </button>
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white border border-gray-300 rounded shadow-lg w-72 p-4">
            <p className="mb-4 text-sm text-center break-words whitespace-pre-line">
              Bạn có chắc chắn muốn xoá khách hàng này không?
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-3 py-1 rounded text-sm"
                onClick={() => setShowConfirm(false)}
              >
                Huỷ
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                onClick={handleOnDelete}
              >
                Xoá
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}