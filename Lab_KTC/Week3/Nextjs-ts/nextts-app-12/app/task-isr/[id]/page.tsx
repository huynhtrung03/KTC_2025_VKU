import type { Task } from "../../types";
import { notFound } from "next/navigation";
import React from "react";

export const revalidate = 60; // Revalidate every 60 seconds
export const dynamic = "force-static";
export const dynamicParams = true;

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0dW5nbnRAc29mdGVjaC52biIsImVtYWlsIjoidHVuZ250QHNvZnRlY2gudm4iLCJzdWIiOjEsImFwcGxpY2F0aW9uIjoiT25saW5lIFNob3AgLSBBUEkiLCJyb2xlcyI6W3siaWQiOjEsIm5hbWUiOiJBZG1pbmlzdHJhdG9ycyJ9LHsiaWQiOjIsIm5hbWUiOiJNYW5hZ2VycyJ9XSwiaWF0IjoxNzUyNTYzMjg4LCJleHAiOjE3ODQxMjA4ODh9.5cFCHZ9q47I_JreSiBpg7UKQ_mbstBeMtZkt60vtlYc`,
};

export async function generateStaticParams() {
  const res = await fetch("https://server.aptech.io/workspaces/tasks", {
    headers: defaultHeaders,
  });
  const data = await res.json();
  const tasks: Task[] = Array.isArray(data) ? data : (Array.isArray(data.data) ? data.data : []);
  return tasks.slice(0, 20).map((task) => ({
    id: task.id?.toString(),
  }));
}

export default async function Index({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const response = await fetch(`https://server.aptech.io/workspaces/tasks/${id}`, {
    headers: defaultHeaders,
    next: {
      revalidate: 60,
      tags: [`task-${id}`],
    },
  });
  if (!response.ok) return notFound();
  const task: Task = await response.json();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Task Details (ISR)</h1>
      
      <p className="text-gray-600">Task ID: {id}</p>
      <hr className="my-4 border-gray-200 border-t" />
      <div className="text-gray-800">
        <h2 className="text-xl font-semibold">{task.title}</h2>
        <p className="mt-2">{task.description}</p>
        <p className="mt-2">Start Date: {task.start_date ? new Date(task.start_date).toLocaleDateString() : ""}</p>
        <p className="mt-2">Due Date: {task.due_date ? new Date(task.due_date).toLocaleDateString() : ""}</p>
      </div>
    </div>
  );
}