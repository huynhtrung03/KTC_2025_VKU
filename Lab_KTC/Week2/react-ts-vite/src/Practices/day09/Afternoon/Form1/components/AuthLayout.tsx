// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { ArrowLeft, Apple, Chrome, Facebook, Eye, EyeOff } from 'lucide-react';

// export default function App() {
//     const [step, setStep] = useState<'email' | 'signup' | 'login'>('email');
//     const [savedEmail, setSavedEmail] = useState('');
//     const [savedName, setSavedName] = useState('');
//     const [showPassword, setShowPassword] = useState(false);

//     const { register, handleSubmit, formState: { errors }, reset } = useForm();
//     const onSubmit = (data) => {
//         if (step === 'email') {
//             setSavedEmail(data.email);
//             setStep('signup');
//         } else if (step === 'signup') {
//             setSavedName(data.name);
//             setStep('login');
//             reset({ password: '' });
//         } else if (step === 'login') {
//             console.log("Login with:", { email: savedEmail, password: data.password });
//             alert("Đăng nhập thành công!");
//         }
//     };

//     const handleBack = () => {
//         if (step === 'login') setStep('signup');
//         else if (step === 'signup') setStep('email');
//         else window.history.back();
//     };

//     return (
//         <div className="bg-white-100 flex justify-center items-center min-h-screen font-sans">
//             <div className="relative w-full max-w-sm h-[700px] bg-black rounded-[40px] shadow-2xl overflow-hidden border-2 border-black">
//                 <div className="absolute top-0 left-0 w-full h-full">
//                     <img
//                         src="/image/man.png"
//                         alt=""
//                         className="w-full h-full object-cover"
//                     />
//                     <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
//                 </div>

//                 <div className="absolute top-6 left-6 z-10">
//                     <button
//                         onClick={handleBack}
//                         className="p-2 rounded-full bg-black bg-opacity-20 hover:bg-opacity-40 transition"
//                     >
//                         <ArrowLeft className="w-6 h-6 text-white" />
//                     </button>
//                 </div>

//                 <h1 className="absolute top-32 left-8 text-3xl font-medium text-white">
//                     {step === 'signup' ? 'Sign up' : step === 'login' ? 'Welcome back' : 'Hi!'}
//                 </h1>

//                 <div className="absolute bottom-3 left-3 right-3 bg-[rgba(179,179,179,0.2)] rounded-[10px] p-8 flex flex-col text-white">
//                     <form onSubmit={handleSubmit(onSubmit)} className="w-full flex-grow flex flex-col">

//                         {/* Email Input */}
//                         {step === 'email' && (
//                             <div className="w-full mb-4">
//                                 <input
//                                     type="email"
//                                     placeholder="Email"
//                                     {...register("email", {
//                                         required: "Email là bắt buộc",
//                                         pattern: {
//                                             value: /^\S+@\S+$/i,
//                                             message: "Email không hợp lệ"
//                                         }
//                                     })}
//                                     className="w-full px-4 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
//                                 />
//                                 {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//                             </div>
//                         )}

//                         {/* Sign Up Form */}
//                         {step === 'signup' && (
//                             <>
//                                 <p className="text-sm text-gray-300 mb-4">
//                                     Looks like you don't have an account yet. Please create a new account <strong>{savedEmail}</strong>.
//                                 </p>

//                                 <div className="w-full mb-4">
//                                     <input
//                                         type="text"
//                                         placeholder="Name"
//                                         {...register("name", { required: "Tên là bắt buộc" })}
//                                         className="w-full px-4 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
//                                     />
//                                     {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
//                                 </div>

//                                 <div className="w-full mb-2 relative">
//                                     <input
//                                         type={showPassword ? "text" : "password"}
//                                         placeholder="Password"
//                                         {...register("password", {
//                                             required: "Mật khẩu là bắt buộc",
//                                             minLength: {
//                                                 value: 6,
//                                                 message: "Mật khẩu ít nhất 6 ký tự"
//                                             }
//                                         })}
//                                         className="w-full px-4 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={() => setShowPassword(!showPassword)}
//                                         className="absolute right-3 top-3 text-gray-700"
//                                     >
//                                         {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                                     </button>
//                                     {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//                                 </div>

//                                 <p className="text-xs text-gray-300 mb-4">
//                                     By selecting <strong>Agree and continue</strong>, you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>.
//                                 </p>
//                             </>
//                         )}

//                         {/* Login Form */}
//                         {step === 'login' && (
//                             <>
//                                 <div className="flex items-center gap-4 mb-6">
//                                     <img
//                                         src="/image/man.png"
//                                         alt="avatar"
//                                         className="w-14 h-14 rounded-full border-2 border-white object-cover"
//                                     />
//                                     <div>
//                                         <p className="font-semibold text-lg">{savedName}</p>
//                                         <p className="text-sm text-gray-300">{savedEmail}</p>
//                                     </div>
//                                 </div>

//                                 <div className="w-full mb-2 relative">
//                                     <input
//                                         type={showPassword ? "text" : "password"}
//                                         placeholder="Password"
//                                         {...register("password", {
//                                             required: "Mật khẩu là bắt buộc"
//                                         })}
//                                         className="w-full px-4 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={() => setShowPassword(!showPassword)}
//                                         className="absolute right-3 top-3 text-gray-700"
//                                     >
//                                         {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                                     </button>
//                                     {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//                                 </div>

//                                 <div className="mt-2 text-right text-sm">
//                                     <a href="#" className="text-[#34C759] hover:underline">Forgot your password?</a>
//                                 </div>
//                             </>
//                         )}

//                         <button
//                             type="submit"
//                             className="w-full py-4 mt-auto rounded-lg bg-[#34C759] text-white font-bold text-lg hover:bg-green-600 transition"
//                         >
//                             {step === 'signup' ? 'Agree and continue' : 'Continue'}
//                         </button>
//                     </form>

//                     {/* Social Login */}
//                     {step === 'email' && (
//                         <>
//                             <div className="flex items-center my-4">
//                                 <div className="flex-grow border-t border-gray-600"></div>
//                                 <span className="px-4 text-gray-400">or</span>
//                                 <div className="flex-grow border-t border-gray-600"></div>
//                             </div>

//                             <div className="space-y-3">
//                                 <button onClick={() => alert('Continue with Facebook')} className="w-full py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition flex items-center justify-center font-semibold relative">
//                                     <Facebook className="w-5 h-5 absolute left-4" />
//                                     <span>Continue with Facebook</span>
//                                 </button>
//                                 <button onClick={() => alert('Continue with Google')} className="w-full py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition flex items-center justify-center font-semibold relative">
//                                     <Chrome className="w-5 h-5 absolute left-4" />
//                                     <span>Continue with Google</span>
//                                 </button>
//                                 <button onClick={() => alert('Continue with Apple')} className="w-full py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition flex items-center justify-center font-semibold relative">
//                                     <Apple className="w-5 h-5 absolute left-4" />
//                                     <span>Continue with Apple</span>
//                                 </button>
//                             </div>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }



