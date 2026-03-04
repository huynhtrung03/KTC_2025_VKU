// "use client";
// import React, { useState, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Heart, MailOpen, Cake } from 'lucide-react';
// import confetti from 'canvas-confetti';

// export default function LoveGiftBox() {
//   const [isOpen, setIsOpen] = useState(false);
//     const audioRef = useRef<HTMLAudioElement>(null);


//   const handleOpen = () => {

//     if (audioRef.current) {
//       audioRef.current.volume = 0.3; // Âm lượng nhẹ (30%)
//       audioRef.current.play().catch(e => console.log('Audio play failed:', e));
//     }
    
//     setIsOpen(true);
//     // Hiệu ứng bắn pháo hoa giấy khi mở thư
//     confetti({
//       particleCount: 150,
//       spread: 70,
//       origin: { y: 0.6 },
//       colors: ['#ff69b4', '#ff1493', '#ffffff']
//     });
//   };

//   return (
//     <main className="min-h-screen bg-[#fff5f7] flex items-center justify-center p-4">
//       <audio 
//         ref={audioRef}
//         preload="auto"
//         loop
//       >
//         <source src="/sounds/click-sound.mp3" type="audio/mpeg" />
//         <source src="/sounds/click-sound.wav" type="audio/wav" />
//       </audio>
//       <div className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden relative min-h-[550px] border-4 border-pink-100 flex flex-col items-center justify-center p-8">
        
//         <AnimatePresence>
//           {!isOpen ? (
//             /* --- GIAO DIỆN TRƯỚC KHI MỞ --- */
//             <motion.div 
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ y: -100, opacity: 0, transition: { duration: 0.5 } }}
//               className="text-center cursor-pointer"
//               onClick={handleOpen}
//             >
//               <div className="relative inline-block">
//                 <motion.div 
//                   animate={{ y: [0, -10, 0] }}
//                   transition={{ repeat: Infinity, duration: 2 }}
//                 >
//                   <MailOpen size={100} strokeWidth={1} className="text-pink-400" />
//                 </motion.div>
//                 <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-500 fill-pink-500" size={24} />
//               </div>
//               <h1 className="mt-6 text-xl font-medium text-pink-400 italic">Ai xinh mới thấy được cái này...</h1>
//               <p className="mt-2 text-gray-400 text-sm animate-pulse underline">Chần chừ gì mà không bấm vào 😡</p>
//             </motion.div>
//           ) : (
//             /* --- GIAO DIỆN SAU KHI MỞ (GIỐNG VIDEO) --- */
//             <motion.div 
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="w-full text-center"
//             >
//               <div className="flex justify-center mb-4">
//                 <Cake className="text-pink-500 mr-2" />
//                 <h2 className="text-2xl font-bold text-pink-600 uppercase tracking-widest">
//                   Happy Birthday
//                 </h2>
//               </div>
              
//               <div className="text-pink-400 font-serif italic text-lg mb-6">Thảo Đậu</div>

//               {/* Lời chúc */}
// <motion.div 
//   initial={{ opacity: 0 }}
//   animate={{ opacity: 1 }}
//   transition={{ delay: 0.5 }}
//   className="bg-pink-50 p-5 rounded-2xl text-pink-700 text-base leading-relaxed shadow-inner mb-6 text-left border-l-4 border-pink-400 font-serif italic"
// >
//   Nghe đồn ai đó nay sinh nhật, tui chẳng có quà đâu chỉ có tấm thiệp này làm màu <br/>
//   Cũng không biết chúc gì cho ấn tượng mà không giống họ chúc, đánh liều chúc bạn mau ăn chóng lớn, nhan sắc "quyết liệt" thăng hoa, tiền tài ào ào thăng tiến và tình yêu "tưng bừng" bùng nổ nháaaaaa!
// </motion.div>

//               {/* Hình ảnh kỷ niệm (Thay link ảnh thật của bạn vào đây) */}
//               <div className="grid grid-cols-2 gap-3 h-40">
//                 <motion.div 
//                   initial={{ opacity: 0, scale: 0.5 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 0.8 }}
//                   className="bg-gray-200 rounded-lg overflow-hidden border-2 border-white shadow-md"
//                 >

//                   <video 
//                     src="/videos/1.mp4" 
//                     className="w-full h-full object-cover"
//                     controls
//                     muted
//                     playsInline
//                   />
//                 </motion.div>
//                 <motion.div 
//   initial={{ opacity: 0, scale: 0.5 }}
//   animate={{ opacity: 1, scale: 1 }}
//   transition={{ delay: 1 }}
//   className="bg-gray-200 rounded-lg overflow-hidden border-2 border-white shadow-md"
// >
//   <video 
//   src="/videos/2.mp4" 
//   className="w-full h-full object-cover"
//   controls
//   muted
//   playsInline
// />
// </motion.div>
//               </div>

//               <button 
//                 onClick={() => setIsOpen(false)}
//                 className="mt-8 text-xs text-pink-300 hover:text-pink-500 transition-colors"
//               >
//                 Đóng lại
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Cánh hoa rơi rải rác */}
//         <div className="absolute top-4 right-4 text-pink-200 rotate-12">🌸</div>
//         <div className="absolute bottom-10 left-4 text-pink-200 -rotate-12">🌸</div>
//       </div>
//     </main>
//   );
// }


"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MailOpen, Cake } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LoveGiftBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);

  const fullText = "Nghe đồn ai đó nay sinh nhật, tui chẳng có quà đâu chỉ có tấm thiệp này làm màu\nCũng không biết chúc gì cho ấn tượng mà không giống họ chúc, đánh liều chúc bạn mau ăn chóng lớn, nhan sắc \"quyết liệt\" thăng hoa, tiền tài ào ào thăng tiến và tình yêu \"tưng bừng\" bùng nổ nháaaaaa!";

  // Hiệu ứng typewriter
  useEffect(() => {
    if (isOpen) {
      let i = 0;
      const timer = setInterval(() => {
        if (i < fullText.length) {
          setDisplayText(fullText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 50); // Tốc độ gõ chữ

      return () => clearInterval(timer);
    }
  }, [isOpen]);

  const handleOpen = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
    
    setIsOpen(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff1493', '#ffffff']
    });
  };

  // Component cánh hoa rơi
  const FallingPetals = () => {
    const petals = ['🌸', '🌺', '💖', '✨', '🎀'];
    
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300 text-lg"
            initial={{ 
              x: Math.random() * 400, 
              y: -50,
              rotate: 0,
              opacity: 0.7
            }}
            animate={{ 
              y: 700,
              rotate: 360,
              opacity: 0
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            {petals[Math.floor(Math.random() * petals.length)]}
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center p-4 relative">
      {/* Cánh hoa rơi */}
      <FallingPetals />
      
      <audio 
        ref={audioRef}
        preload="auto"
        loop
      >
        <source src="/sounds/click-sound.mp3" type="audio/mpeg" />
        <source src="/sounds/click-sound.wav" type="audio/wav" />
      </audio>
      
      <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-[2rem] shadow-2xl overflow-hidden relative min-h-[550px] border-4 border-pink-100 flex flex-col items-center justify-center p-8">
        
        <AnimatePresence>
          {!isOpen ? (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ y: -100, opacity: 0, transition: { duration: 0.5 } }}
              className="text-center cursor-pointer"
              onClick={handleOpen}
            >
              <div className="relative inline-block">
                <motion.div 
                  animate={{ 
                    y: [0, -10, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    ease: "easeInOut"
                  }}
                >
                  <MailOpen size={100} strokeWidth={1} className="text-pink-400" />
                </motion.div>
                <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-500 fill-pink-500" size={24} />
                
                {/* Hiệu ứng sparkle xung quanh */}
                {/* <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  ✨
                </motion.div>
                <motion.div
                  className="absolute -bottom-2 -left-2"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  💖
                </motion.div> */}
              </div>
              
              <motion.h1 
                className="mt-6 text-xl font-medium text-pink-400 italic"
                animate={{ 
                  textShadow: [
                    "0 0 5px rgba(236, 72, 153, 0.5)",
                    "0 0 20px rgba(236, 72, 153, 0.8)",
                    "0 0 5px rgba(236, 72, 153, 0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Ai xinh mới thấy được cái này...
              </motion.h1>
              
              <p className="mt-2 text-gray-400 text-sm animate-pulse underline">Chần chừ gì mà không bấm vào 😡</p>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full text-center"
            >
              <motion.div 
                className="flex justify-center mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
              >
                <Cake className="text-pink-500 mr-2" />
                <h2 className="text-2xl font-bold text-pink-600 uppercase tracking-widest">
                  Happy Birthday
                </h2>
              </motion.div>
              
              <motion.div 
                className="text-pink-400 font-serif italic text-lg mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Thảo Đậu
              </motion.div>

              {/* Lời chúc với hiệu ứng typewriter */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-pink-50 to-purple-50 p-5 rounded-2xl text-pink-700 text-base leading-relaxed shadow-inner mb-6 text-left border-l-4 border-pink-400 relative"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                <div className="whitespace-pre-line">
                  {displayText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="text-pink-500"
                  >
                    |
                  </motion.span>
                </div>
                
                {/* Hiệu ứng shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: [-100, 400] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
              </motion.div>

              {/* Videos với hiệu ứng hover */}
              <div className="grid grid-cols-2 gap-3 h-40">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  whileHover={{ scale: 1.05, z: 10 }}
                  className="bg-gray-200 rounded-lg overflow-hidden border-2 border-white shadow-md"
                >
                  <video 
                    src="/videos/1.mp4" 
                    className="w-full h-full object-cover"
                    controls
                    muted
                    playsInline
                  />
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ delay: 1, type: "spring" }}
                  whileHover={{ scale: 1.05, z: 10 }}
                  className="bg-gray-200 rounded-lg overflow-hidden border-2 border-white shadow-md"
                >
                  <video 
                    src="/videos/2.mp4" 
                    className="w-full h-full object-cover"
                    controls
                    muted
                    playsInline
                  />
                </motion.div>
              </div>

              <motion.button 
                onClick={() => {
                  setIsOpen(false);
                  setDisplayText('');
                  if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                  }
                }}
                className="mt-8 text-xs text-pink-300 hover:text-pink-500 transition-colors relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Đóng</span>
                <motion.div
                  className="absolute inset-0 bg-pink-100 rounded-full"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative elements */}
        <motion.div 
          className="absolute top-4 right-4 text-pink-200 rotate-12"
          animate={{ rotate: [12, 22, 12] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🌸
        </motion.div>
        <motion.div 
          className="absolute bottom-10 left-4 text-pink-200 -rotate-12"
          animate={{ rotate: [-12, -22, -12] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🌸
        </motion.div>
      </div>
    </main>
  );
}