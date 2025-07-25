// import React from 'react';
// import NewsSection from './day4-practice/components/renderList_01/NewsSection';
// import styles from './day4-practice/components/renderList_01/renderList.module.css'; 



// interface NewsItem {
//   image: string;
//   title: string;
//   views: number;
//   id: string | number; 
// }


// function App() {
//   const latestNews: NewsItem[] = [
//     {
//       id: 'n1', 
//       image: '/images/hinh1.jpg',
//       title: 'Ấn tượng đầu tiên Samsung Galaxy A32 4G: Với hơn 6 triệu đã có màn hình Super AMOLED 90Hz',
//       views: 140
//     },
//     {
//       id: 'n1', 
//       image: '/images/hinh1.jpg',
//       title: 'Ấn tượng đầu tiên Samsung Galaxy A32 4G: Với hơn 6 triệu đã có màn hình Super AMOLED 90Hz',
//       views: 140
//     },
//     {
//       id: 'n1', 
//       image: '/images/hinh1.jpg',
//       title: 'Ấn tượng đầu tiên Samsung Galaxy A32 4G: Với hơn 6 triệu đã có màn hình Super AMOLED 90Hz',
//       views: 140
//     },
//     {
//       id: 'n1', 
//       image: '/images/hinh1.jpg',
//       title: 'Ấn tượng đầu tiên Samsung Galaxy A32 4G: Với hơn 6 triệu đã có màn hình Super AMOLED 90Hz',
//       views: 140
//     },
    
//   ];

//   return (
//     <div className="app">
//       <NewsSection title="TIN MỚI" newsItems={latestNews} />
//     </div>
//   );
  
  



// }

// export default App;


// import NewsSection from './day4-practice/components/renderList_01/NewsSection';

// bai04
// import React from 'react';
// import ProductDisplayCard from './day4-practice/components/renderList_04/ProductDisplayCard';
// import type {ProductDisplayCardProps} from './day4-practice/components/renderList_04/ProductDisplayCard';
// import styles from './day4-practice/components/renderList_04/renderList_04.module.css'; 

// function App() {
//   const products: ProductDisplayCardProps[] = [
  
//   {  
//     id: 'usb-c-sd-adapter',
//     image: '/images/Apple-USBC-To-SDCard-A.jpg', 
//     name: 'Cap chuyển đổi USB-C sang SD',
//     originalPrice: 1290000,
//     discountedPrice: 790000,
//     discountPercentage: 25,
    
//   },
//   {
//       id: 'adapter-20w',
//       image: '/images/type-c-20-w.png', 
//       name: 'Adapter sạc Apple Type C 20W',
//       originalPrice: 520000,
//     },
//     {
//       id: 'lightning-cable-2m',
//       image: '/images/cap-lightning-to-usb-cable-md818zma-1.jpg', 
//       name: 'Cáp sạc Lightning 2m',
//       originalPrice: 840000,
//     },
//     {
//       id: 'airpods-3',
//       image: '/images/airpod-3.png', 
//       name: 'AirPods 3',
//       originalPrice: 1450000,
//       discountedPrice: 890000,
//       discountPercentage: 20,
//     },
// ];

//   return (
//     <div className={styles['app-container']}>
//       <h2 className={styles['section-title']}>Phụ kiện tương thích</h2>
//       <div className={styles['products-list-container']}>
//       {products.map((product) => (
//         <ProductDisplayCard 
//         key={product.id}
//         image={product.image}
//         name={product.name}
//         originalPrice={product.originalPrice}
//         discountedPrice={product.discountedPrice}
//         discountPercentage={product.discountPercentage}
//         />
//       ))}
//     </div>
//   </div>
//   );
// }

// export default App;




            



//bài Attributes màu
// import Attributes from './day4-practice/components/Attributes';

// const attributes = [
//   { id: 1, label: 'Đen' },
//   { id: 2, label: 'Hồng' },
//   { id: 3, label: 'Xanh' },
// ];

// function App() {
//   return (
    // <main className='container'>
    //   <Attributes data={attributes} />
      
    // </main>
//   );
// }

// export default App;






import React from 'react';
import Attributes from './day4-practice/components/Attributes';
import LikeButton from './day4-practice/components/LikeButton/LikeButton';
import StarRating from './day4-practice/components/Rating/StarRating';
import ImageGallery from './day4-practice/components/ImageGallery/ImageGallery'; 
import ButtonTabs from './day4-practice/components/ButtonTabs/ButtonTabs';
import ArticlesList from './day4-practice/components/ArticlesList'
import ButtonTabs2 from './day4-practice/components/ButtonTabs2/ButtonTabs2';

import renderList_05 from './day4-practice/components/renderList_05/renderList_05'


const articles = [
  { id: 1, title: 'Ấn tượng đầu tiên Samsung Galaxy A32 4G: Với hơn 6 triệu đã có màn hình Super AMOLED 90Hz', thumbnail: 'images/hinh1.jpg', addTime: '4 năm trước' },
  { id: 2, title: 'Google Pixel 5a dự kiến sẽ được ra mắt cùng thời điểm với Android 12', thumbnail: 'images/hinh1.jpg', addTime: '4 năm trước' },
  { id: 2, title: 'Google Pixel 5a dự kiến sẽ được ra mắt cùng thời điểm với Android 12', thumbnail: 'images/hinh1.jpg', addTime: '4 năm trước' },
  { id: 4, title: 'Galaxy A82 5G chuẩn bị ra mắt với chip flagship và màn hình trượt độc đáo, Samfans gom lúa đi là vừa', thumbnail: 'images/hinh1.jpg', addTime: '4 năm trước' },
];

const attributes = [
  { id: 1, label: 'Đen' },
  { id: 2, label: 'Hồng' },
  { id: 3, label: 'Xanh' },
];

const handleRatingChange = (newRating: number) => {
    console.log('Người dùng đã chọn đánh giá:', newRating);
    // Bạn có thể gửi giá trị này lên server hoặc lưu vào state khác của App component
  };


function App() {
  return (
    
    <div className="App">
      <section className='section'>
        <div className='section_header'>
          <h2 className='section_title'>Tin tức</h2>
          <div className='section_extra'>
            <a className='all' href='#'>Xem tất cả</a>
          </div>
        </div>
        <div className='section_body'>
          <ArticlesList data={articles} />
        </div>
      </section>
      <main className='container'><Attributes data={attributes} />
      </main>
      <LikeButton />
      
      <h1>Đánh Giá Sao</h1><StarRating initialRating={3} onRatingChange={handleRatingChange} />

      <ImageGallery />
      <ButtonTabs />
      <ButtonTabs2 />

      <renderList_05 />
    </div>
  );
}

export default App;





