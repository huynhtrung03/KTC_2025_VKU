// "use client";
// import { useForm, type SubmitHandler } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useState } from "react";
// import Image from "next/image";


// const schema = yup.object({
//   username: yup
//     .string()
//     .email("Email không hợp lệ")
//     .required("Bắt buộc nhập email"),
//   password: yup
//     .string()
//     .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
//     .required("Bắt buộc nhập mật khẩu"),
// });

// interface IFormInput {
//   username: string;
//   password: string;
// }

// export default function LoginPage() {
//   const [errorMsg, setErrorMsg] = useState("");
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<IFormInput>({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       username: "tungnt@softech.vn",
//       password: "123456789",
//     },
//   });

//   const onSubmit: SubmitHandler<IFormInput> = async (data) => {
//     if (data.username === "tungnt@softech.vn" && data.password === "123456789") {
//       localStorage.setItem("user", JSON.stringify({ email: data.username }));
//       window.location.href = "/";
//     } else {
//       setErrorMsg("Login failed. Please check your credentials.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="flex bg-white shadow-lg rounded-lg overflow-hidden max-w-3xl w-full">
//         {/* Left Image */}
//         <div className="hidden md:block w-1/2 h-full">
//           <Image
//             src="/image/download.png"
//             alt="Login Illustration"
//             width={400}
//             height={400}
//             className="object-cover w-full h-full"
//           />
//         </div>
//         {/* Right Form */}
//         <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
//           <h2 className="text-4xl font-bold mb-6 text-center">Login</h2>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium mb-1" htmlFor="email">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 {...register("username")}
//                 className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-300"
//                 placeholder="Enter your email"
//               />
//               {errors.username && (
//                 <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
//               )}
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1" htmlFor="password">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 {...register("password")}
//                 className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-300"
//                 placeholder="Enter your password"
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//               )}
//             </div>
//             {errorMsg && (
//               <p className="text-red-500 text-sm mb-2">{errorMsg}</p>
//             )}
//             <button
//               type="submit"
//               className="w-full bg-sky-400 text-white py-2 rounded hover:bg-sky-600 transition duration-200"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }




import type { Metadata } from "next";
import { getCsrfToken } from "next-auth/react";
import LoginForm from "../components/ui/LoginForm";
import Image from "next/image";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login",
  description: "Login desc",
};

export default async function Page() {
  const csrfToken = await getCsrfToken();
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#e3f2fd] to-[#f1f5ff] px-4">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full">
        {/* Image Section */}
        <div className="hidden md:block md:w-1/2">
          <Image
            width={500}
            height={500}
            src="/image/download.png"
            alt="Login illustration"
            priority
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#0077ff]">
            Đăng nhập
          </h2>
          <Suspense fallback={<div>Loading...</div>}>
            <LoginForm csrfToken={csrfToken} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}