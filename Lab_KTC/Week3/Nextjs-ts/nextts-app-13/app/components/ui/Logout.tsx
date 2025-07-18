"use client";
import { signOut } from "next-auth/react";

export default function BtnLogout() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
    
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition"
    >
      Logout
    </button>
  );
}


