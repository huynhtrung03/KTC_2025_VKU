import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trung Vo - Next.js App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <nav className="flex gap-6 px-8 py-4 bg-gradient-to-r from-red-500 via-red-300 to-red-200 shadow-lg rounded-b-xl mb-8">
          <Link href="/" className="text-white font-semibold hover:underline hover:text-yellow-200 transition">Home</Link>
          <Link href="/task-ssr" className="text-white font-semibold hover:underline hover:text-yellow-200 transition">SSR</Link>
          <Link href="/task-ssg" className="text-white font-semibold hover:underline hover:text-yellow-200 transition">SSG</Link>
          <Link href="/task-csr" className="text-white font-semibold hover:underline hover:text-yellow-200 transition">CSR</Link>
        </nav> */}
          <main>{children}</main>
        {/* <footer className="text-center text-sm text-gray-500 mt-8">
  © {new Date().getFullYear()} My Next.js App
        </footer> */}
      </body>
    </html>
  );
}
