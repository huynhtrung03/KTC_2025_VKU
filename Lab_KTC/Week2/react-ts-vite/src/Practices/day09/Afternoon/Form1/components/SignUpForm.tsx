import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

export default function SignUpStep() {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const email = localStorage.getItem('userEmail') || '';

    const onSubmit = (data: any) => {
        localStorage.setItem('userName', data.name);
        reset();
        navigate('/login');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="absolute bottom-3 left-3 right-3 bg-[rgba(179,179,179,0.2)] rounded-[10px] p-8 flex flex-col text-white">
            <h1 className="absolute -top-10 left-6 text-3xl font-medium text-white mb-6">Sign up</h1>
            <p className="text-sm text-gray-300 mb-4">
                Looks like you don't have an account yet. Please create a new account <strong>{email}</strong>.
            </p>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Name"
                    {...register("name", { required: "Tên là bắt buộc" })}
                    className="w-full px-4 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div className="relative mb-2">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", {
                        required: "Mật khẩu là bắt buộc",
                        minLength: { value: 6, message: "Ít nhất 6 ký tự" }
                    })}
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

            <p className="text-xs text-gray-300 mb-4">
                By selecting <strong>Agree and continue</strong>, you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>.
            </p>

            <button
                type="submit"
                className="w-full py-4 rounded-lg bg-[#34C759] text-white font-bold text-lg hover:bg-green-600 transition"
            >
                Agree and continue
            </button>
        </form>
    );
}
