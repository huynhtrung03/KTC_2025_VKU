"use client";
import { useEffect, useState } from "react";
import TaskTable from "../components/TaskTable";
import type { Task } from "../types";

const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0dW5nbnRAc29mdGVjaC52biIsImVtYWlsIjoidHVuZ250QHNvZnRlY2gudm4iLCJzdWIiOjEsImFwcGxpY2F0aW9uIjoiT25saW5lIFNob3AgLSBBUEkiLCJyb2xlcyI6W3siaWQiOjEsIm5hbWUiOiJBZG1pbmlzdHJhdG9ycyJ9LHsiaWQiOjIsIm5hbWUiOiJNYW5hZ2VycyJ9XSwiaWF0IjoxNzUyNTYzMjg4LCJleHAiOjE3ODQxMjA4ODh9.5cFCHZ9q47I_JreSiBpg7UKQ_mbstBeMtZkt60vtlYc`,
};

export default function TaskCSR() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://server.aptech.io/workspaces/tasks", {
      headers: defaultHeaders,
    })
      .then(res => res.json())
      .then(data => {
        setTasks(Array.isArray(data) ? data : (Array.isArray(data.data) ? data.data : []));
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading tasks...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">CSR Tasks</h1>
      <TaskTable tasks={tasks} />
    </div>
  );
}