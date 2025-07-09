import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginStep() {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const email = localStorage.getItem('userEmail') || '';
    const name = localStorage.getItem('userName') || '';

    const onSubmit = (data: any) => {
        console.log("Đăng nhập với:", { email, password: data.password });
        alert("Đăng nhập thành công!");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="absolute bottom-3 left-3 right-3 bg-[rgba(179,179,179,0.2)] rounded-[10px] p-8 flex flex-col text-white">
            <h1 className="absolute -top-10 left-6 text-3xl font-medium text-white mb-6">Welcome back</h1>

            <div className="flex items-center gap-4 mb-6">
                <img
                    src="/image/man.png"
                    alt="avatar"
                    className="w-14 h-14 rounded-full border-2 border-white object-cover"
                />
                <div>
                    <p className="font-semibold text-lg">{name}</p>
                    <p className="text-sm text-gray-300">{email}</p>
                </div>
            </div>

            <div className="w-full mb-2 relative">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", { required: "Mật khẩu là bắt buộc" })}
                    className="w-full px-4 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-700"
                >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div className="mt-2 text-right text-sm">
                <a href="#" className="text-[#34C759] hover:underline">Forgot your password?</a>
            </div>

            <button
                type="submit"
                className="w-full mt-4 py-4 rounded-lg bg-[#34C759] text-white font-bold text-lg hover:bg-green-600 transition"
            >
                Continue
            </button>
        </form>
    );
}
