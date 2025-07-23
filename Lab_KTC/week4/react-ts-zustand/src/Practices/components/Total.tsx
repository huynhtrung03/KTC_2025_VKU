import { useShoppingCart } from '../stores/useShoppingCart';


export default function Total() {
  const { items } = useShoppingCart((state) => state);
  // const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  let total = 0;
  items.forEach((item) => {
    total += item.product.price * item.quantity;
  });

  return <div>Total: {total}</div>;
}