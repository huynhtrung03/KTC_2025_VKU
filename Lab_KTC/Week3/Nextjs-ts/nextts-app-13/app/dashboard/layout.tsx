import Link from "next/link";
import React from "react";
import BtnLogout from "../components/ui/Logout";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";


type Props = {
  children: React.ReactNode;
};

export default async function  Layout({ children }: Props) {

 const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col min-h-screen ">
      <header className="flex justify-between items-center bg-sky-500 text-white p-4 text-center h-16 z-10 fixed top-0 left-0 w-full">
        <h1 className="text-2xl font-bold">Day 12</h1>
        <nav className="flex justify-center gap-4">
          {/* <a
            href="/day12/homework"
            className="px-4 py-2 rounded hover:bg-sky-700 transition"
          >
            Homework
          </a>
          <Link
            href="/day12/afternoon"
            className="px-4 py-2 rounded hover:bg-sky-700 transition"
          >
            Afternoon
          </Link> */}
          <BtnLogout />
        </nav>
      </header>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <header className="w-60 bg-gray-100 p-6 flex flex-col min-h-screen">
          <h2 className="text-xl font-bold mb-4">Tasks</h2>
          <Link
            href="/dashboard/tasks-ssr"
            className="px-4 py-2 rounded hover:bg-sky-400 transition"
          >
            Task-SSR
          </Link>
          {/* <Link
            href="/day12/afternoon/task-ssg"
            className="px-4 py-2 rounded hover:bg-sky-400 transition"
          >
            Task-SSG
          </Link> */}
          <Link
            href="/dashboard/tasks-csr"
            className="px-4 py-2 rounded hover:bg-sky-400 transition"
          >
            Task-CSR
          </Link>
        </header>
        {/* Main content */}
        <main className="flex w-full justify-center">{children}</main>
      </div>
    </div>
  );
}
//texxt