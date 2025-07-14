import "@/styles/globals.css";
import type { AppProps } from "next/app";

import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {

  
  return (
    <>
      <nav className="flex gap-6 px-8 py-4 bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200 shadow-lg rounded-b-xl mb-8">
        <Link href="/" className="text-white font-semibold hover:underline hover:text-yellow-200 transition">Home</Link>
        <Link href="/products" className="text-white font-semibold hover:underline hover:text-yellow-200 transition">Products</Link>
        <Link href="/contact" className="text-white font-semibold hover:underline hover:text-yellow-200 transition">Contact</Link>
        <Link href="/login" className="text-white font-semibold hover:underline hover:text-yellow-200 transition">Login</Link>
      </nav>
      <Component {...pageProps} />
    </>
  );
  
  
  
}


  