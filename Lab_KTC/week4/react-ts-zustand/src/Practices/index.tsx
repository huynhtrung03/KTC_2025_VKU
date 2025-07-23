import ShoppingCart from "./components/ShoppingCart";
import Total from "./components/Total";
import Products from "./Products";




export default function zustandex() { 
  return (
    <>
    <div>
      {/* <div>
        <Total />
      </div> */}
      <ShoppingCart />
      <hr style={{ margin: '20px 0', border: '1px solid #eee' }} />
      <Products />
    </div>

    </>
  );
}