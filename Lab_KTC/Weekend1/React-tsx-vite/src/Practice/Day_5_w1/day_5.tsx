import styles from "./day_5.module.css";
import Exercise_0 from './components/Exercise_1/Exercise_1'; 
import Exercise_2 from './components/Exercise_2/Exercise_2';
import Exercise_3 from './components/Exercise_3/Exercise_3';
import Exercise_4 from './components/Exercise_4/Hover_Highlight'
import Exercise_5 from './components/Exercise_5/Form_Submission'
import Exercise_6 from './components/Exercise_6/Key_Press'
import Exercise_7 from './components/Exercise_7/Double_click'
import Exercise_8 from './components/Exercise_8/Dropdown'
import Exercise_9 from './components/Exercise_9/Checkbox'
import Exercise_10 from './components/Exercise_10/SearchFilter'
import Calculator from './components/Homework_D5/Calculator/Calculator'
import RegistrationForm from'./components/Homework_D5/RegistrationForm/RegistrationForm'
import ShoppingCart from './components/Homework_D5/ShoppingCart/App'

export const Day05 = () => {
  return (
    <div className={styles.container}>
        {/* <Exercise_0 />
        <Exercise_2 />
        <Exercise_3 />
        <Exercise_4 />
        <Exercise_5 />
        <Exercise_6 />
        <Exercise_7 />
        <Exercise_8 />
        <Exercise_9 />
        <Exercise_10 /> */}
        {/* <Calculator /> */}
        {/* <RegistrationForm /> */}
        <ShoppingCart />


    </div>
  );
};


// import React, { useState } from 'react';
// import ProductGrid from './components/ProductGrid';
// import CartIcon from './components/CartIcon';
// import CartDropdown from './components/CartDropdown';
// import { CartProvider } from './components/CartContext';
// import styles from './App.module.css'; // Sử dụng CSS Module cho App

// function App() {
//   const [isCartDropdownVisible, setIsCartDropdownVisible] = useState(false);

//   const toggleCartDropdown = () => {
//     setIsCartDropdownVisible(prev => !prev);
//   };

//   return (
//     <CartProvider> {/* Bọc toàn bộ ứng dụng trong CartProvider để các component con truy cập Context */}
//       <div className={styles.app}>
//         <header className={styles.header}>
//           <div className={styles.logo}>Big MARKET</div>
//           <div className={styles.headerRight}>
//             <input type="text" placeholder="Tìm kiếm sản phẩm..." className={styles.searchInput} />
//             <CartIcon onToggleDropdown={toggleCartDropdown} />
//           </div>
//         </header>

//         <div className={styles.mainContent}>
//           <nav className={styles.navbar}>
//             {/* Đây là phần menu ngang như trong demo, có thể mở rộng sau */}
//             <div className={styles.navCategory}>☰ Danh mục sản phẩm</div>
//             <ul className={styles.navLinks}>
//               <li>Gia Vị</li>
//               <li>Gạo, bún, phở, miến</li>
//               <li>Đồ hộp, thực phẩm sơ chế đóng gói</li>
//               <li>Bột các loại</li>
//               <li>Bánh đa nem, ram</li>
//               <li>Hạt các loại</li>
//               <li>Mộc nhĩ, nấm, măng khô</li>
//             </ul>
//           </nav>

//           <h2 className={styles.sectionTitle}>Thực phẩm khô</h2>
//           <ProductGrid />
//         </div>

//         <CartDropdown isVisible={isCartDropdownVisible} onClose={() => setIsCartDropdownVisible(false)} />
//       </div>
//     </CartProvider>
//   );
// }

// export default App;