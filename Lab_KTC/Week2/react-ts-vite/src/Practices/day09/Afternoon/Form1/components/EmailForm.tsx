import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Facebook, Chrome, Apple } from 'lucide-react';

export default function EmailStep() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data: any) => {
        localStorage.setItem('userEmail', data.email);
        navigate('/signup');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="absolute bottom-3 left-3 right-3 bg-[rgba(179,179,179,0.2)] rounded-[10px] p-8 flex flex-col text-white">
            <h1 className="absolute -top-10 left-6 text-3xl font-medium text-white mb-6">Hi!</h1>

            <div className="mb-4">
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                        required: "Email là bắt buộc",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Email không hợp lệ"
                        }
                    })}
                    className="w-full px-4 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <button
                type="submit"
                className="w-full py-4 mt-auto rounded-lg bg-[#34C759] text-white font-bold text-lg hover:bg-green-600 transition"
            >
                Continue
            </button>
            <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-600"></div>
                <span className="px-4 text-gray-400">or</span>
                <div className="flex-grow border-t border-gray-600"></div>
            </div>

            {/* Social login buttons */}
            <div className="space-y-3">
                <button onClick={() => alert('Continue with Facebook')} className="w-full py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition flex items-center justify-center font-semibold relative">
                    <Facebook className="w-5 h-5 absolute left-4" />
                    <span>Continue with Facebook</span>
                </button>
                <button onClick={() => alert('Continue with Google')} className="w-full py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition flex items-center justify-center font-semibold relative">
                    <Chrome className="w-5 h-5 absolute left-4" />
                    <span>Continue with Google</span>
                </button>
                <button onClick={() => alert('Continue with Apple')} className="w-full py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition flex items-center justify-center font-semibold relative">
                    <Apple className="w-5 h-5 absolute left-4" />
                    <span>Continue with Apple</span>
                </button>
            </div>
        </form>
    );
}
