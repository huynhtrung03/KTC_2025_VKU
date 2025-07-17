"use client";
import { signOut } from "next-auth/react";

export default function BtnLogout() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
    // localStorage.removeItem("user");
    // console.log("Token sau khi logout:", session?.user?.accessToken);
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}


