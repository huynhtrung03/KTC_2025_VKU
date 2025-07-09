// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import AuthPage from './Pages/AuthPage';



// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<AuthPage />} />
//         <Route path="/auth/:type?" element={<AuthPage />} />
//         <Route path="*" element={<div>404 Not Found</div>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import EmailForm from './Form1/components/EmailForm';
import SignUpForm from './Form1/components/SignUpForm';
import LoginForm from './Form1/components/LoginForm';

export default function App() {
    return (
        <Router>
            <div className="bg-white-100 flex justify-center items-center min-h-screen font-sans">
                <div className="relative w-full max-w-sm h-[700px] bg-black rounded-[40px] shadow-2xl overflow-hidden border-2 border-black">
                    <div className="absolute top-0 left-0 w-full h-full">
                        <img
                            src="/image/man.png"
                            alt=""
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
                    </div>

                    <div className="absolute top-6 left-6 z-10">
                        <BackButton />
                    </div>

                    <Routes>
                        <Route path="/" element={<EmailForm />} />
                        <Route path="/signup" element={<SignUpForm />} />
                        <Route path="/login" element={<LoginForm />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

function BackButton() {
    const navigate = useNavigate();
    const handleBack = () => navigate(-1);
    return (
        <button
            onClick={handleBack}
            className="p-2 rounded-full bg-black bg-opacity-20 hover:bg-opacity-40 transition"
        >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
        </button>
    );
}

