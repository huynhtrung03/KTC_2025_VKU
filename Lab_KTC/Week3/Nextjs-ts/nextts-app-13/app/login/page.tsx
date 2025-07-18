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