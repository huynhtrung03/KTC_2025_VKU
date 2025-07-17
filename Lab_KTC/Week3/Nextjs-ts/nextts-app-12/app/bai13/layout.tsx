import Image from "next/image";
import React from "react";
import { FiUser } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RiMapPin2Line } from "react-icons/ri";
import { MdOutlinePhoneIphone } from "react-icons/md";
import Products from "./components/Products";




type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-[#84E3FF] flex justify-center items-center w-full rounded shadow"><Image
          src="/images/header.jpg"
          alt="Header Banner"
          width={1100}
          height={80}
          className="object-cover rounded"
          priority
        />
      </div>
      <header className="flex sticky top-0  flex-col bg-[#FCD021] w-full z-10">
        <div className="flex bg-[#FCD021]  items-center justify-between px-50">
          <div className="flex items-center space-x-2">
            <Image
              src="/images/logo.png" 
              alt="Thegioididong Logo"
              width={290}
              height={20}
              priority
            />
          </div>
          <div className="flex-grow mx-8"> 
            <input
              type="text"
              placeholder="Bạn tìm gì..."
              className="bg-amber-50 w-full p-3 rounded-3xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-50"
            />
          </div>

          <div className="flex items-center space-x-6 text-gray-800 text-sm">
            <div className="flex items-center flex-col cursor-pointer hover:text-blue-600">
            <FiUser className="h-6 w-6" />
            <span>Đăng nhập</span>
          </div>

            <div className="flex items-center flex-col cursor-pointer hover:text-blue-600">
              <HiOutlineShoppingCart className="h-6 w-6" />
              <span>Giỏ hàng</span>
            </div>

            <div className="flex items-center bg-amber-100 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-100 min-w-[150px]">
              <RiMapPin2Line className="h-5 w-5 text-gray-500" />
              <span className="text-gray-800">Đà Nẵng</span>
            </div>
          </div>
        </div>

        
      </header>
      <nav className="flex bg-[#FCD021] justify-center items-center py-2 ">
          <ul className="flex space-x-8 text-sm font-semibold">
            <li className="flex items-center cursor-pointer hover:text-blue-600">
              <MdOutlinePhoneIphone className="mr-1 h-5 w-5" />
              Điện thoại
            </li>
            <li className="flex items-center cursor-pointer hover:text-blue-600">
              <MdOutlinePhoneIphone className="mr-1 h-5 w-5" />
              Điện thoại
            </li>
            <li className="flex items-center cursor-pointer hover:text-blue-600">
              <MdOutlinePhoneIphone className="mr-1 h-5 w-5" />
              Điện thoại
            </li>
            <li className="flex items-center cursor-pointer hover:text-blue-600">
              <MdOutlinePhoneIphone className="mr-1 h-5 w-5" />
              Điện thoại
            </li>
            <li className="flex items-center cursor-pointer hover:text-blue-600">
              <MdOutlinePhoneIphone className="mr-1 h-5 w-5" />
              Điện thoại
            </li>
            <li className="flex items-center cursor-pointer hover:text-blue-600">
              <MdOutlinePhoneIphone className="mr-1 h-5 w-5" />
              Điện thoại
            </li>
            <li className="flex items-center cursor-pointer hover:text-blue-600">
              <MdOutlinePhoneIphone className="mr-1 h-5 w-5" />
              Điện thoại
            </li>
            <li className="flex items-center cursor-pointer hover:text-blue-600">
              <MdOutlinePhoneIphone className="mr-1 h-5 w-5" />
              Điện thoại
            </li>
            <li className="flex items-center cursor-pointer hover:text-blue-600">
              <MdOutlinePhoneIphone className="mr-1 h-5 w-5" />
              Điện thoại
            </li>
            <li className="flex items-center cursor-pointer hover:text-blue-600">
              <MdOutlinePhoneIphone className="mr-1 h-5 w-5" />
              Điện thoại
            </li>
          </ul>
        </nav>
      <div className="flex justify-center items-center w-full py-2">
          <Image
            src="/images/banner.png" 
            alt="Banner"
            width={1100}
            height={120}
            className="object-cover rounded shadow"
            priority
          />
        </div>
        <Products />

      <div className="rounded-lg shadow-md pt-10 flex-1">{children}</div>
    </div>
  );
}