/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import type { Task } from "../types";
import { Link, useNavigate } from "react-router";
import SearchTasks from "../components/Fillter";
import { useAuthStore } from "../useAuthorStore";
import apiClient from "../lib/api-client-sp";
import { FixedSizeList as List } from "react-window";
import { forwardRef } from "react";

export const OurTasksPage = () => {
  const { loggedInUser } = useAuthStore((state) => state);
  const [tasks, setTasks] = React.useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      console.error("User is not logged in, redirecting to login page...");
      navigate("/login");
    }
  }, [loggedInUser, navigate]);

  useEffect(() => {
    const tasks = async () => {
      try {
        const tasks = (await apiClient.get("/workspaces/tasks")) as any[];
        setTasks(tasks);
        console.log("Tasks fetched successfully:", tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    tasks();
  }, []);

  const [filters, setFilters] = React.useState<any>({
    status: "",
    priority: "",
  });
  const handleOnSearch = (filters: { status?: string; priority?: string }) => {
    setFilters(filters);
  };

  const filteredTasks = tasks.filter((task: Task) => {
    let matches = true;
    if (filters.status && task.status !== filters.status) matches = false;
    if (filters.priority && task.priority !== filters.priority) matches = false;
    return matches;
  });

  // Virtual row renderer (dùng div thay vì tr)
  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const task = filteredTasks[index];
    return (
      <div
        key={task.id}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #e5e7eb",
          background: index % 2 === 0 ? "#fff" : "#f9fafb",
        }}
        className="hover:bg-gray-200 transition duration-200"
      >
        <div className="w-24 px-4">{task.id}</div>
        <div className="w-40 px-4">{task.title}</div>
        <div className="flex-1 px-4">{task.description}</div>
        <div className="w-24 px-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              task.status === "to_do"
                ? "bg-blue-100 text-blue-800 "
                : task.status === "in_progress"
                ? "bg-yellow-100 text-yellow-800"
                : task.status === "done"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {task.status}
          </span>
        </div>
        <div className="w-24 px-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              task.priority === "high"
                ? "bg-red-100 text-red-800"
                : task.priority === "medium"
                ? "bg-yellow-100 text-yellow-800"
                : task.priority === "low"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {task.priority}
          </span>
        </div>
        <div className="w-32 px-4">
          {task.start_date
            ? new Date(task.start_date).toLocaleDateString()
            : ""}
        </div>
        <div className="w-32 px-4">
          {task.due_date ? new Date(task.due_date).toLocaleDateString() : ""}
        </div>
        <div className="w-32 px-4">{task.assignee_id}</div>
        <div className="w-32 px-4">
          <Link to={`/update-task/${task.id}`}>
            <button className="bg-[#7f7fd5] hover:bg-[#6c6cd1] text-white px-4 py-1.5 rounded-full text-sm shadow-sm transition">
              Edit
            </button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <SearchTasks onSearch={handleOnSearch} />
      <div
        className="overflow-x-auto rounded-lg bg-white border border-gray-200 mt-5 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Header */}
        <div
          className="flex bg-gray-300 text-gray-700 font-semibold"
          style={{ minWidth: 1200 }}
        >
          <div className="w-24 px-4 py-3 border-b border-gray-200">Task ID</div>
          <div className="w-40 px-4 py-3 border-b border-gray-200">Title</div>
          <div className="flex-1 px-4 py-3 border-b border-gray-200">
            Description
          </div>
          <div className="w-24 px-4 py-3 border-b border-gray-200">Status</div>
          <div className="w-24 px-4 py-3 border-b border-gray-200">
            Priority
          </div>
          <div className="w-32 px-4 py-3 border-b border-gray-200">
            Start Date
          </div>
          <div className="w-32 px-4 py-3 border-b border-gray-200">
            Due Date
          </div>
          <div className="w-32 px-4 py-3 border-b border-gray-200">
            Assigned To
          </div>
          <div className="w-32 px-4 py-3 border-b border-gray-200">Actions</div>
        </div>
        {/* Virtualized rows */}
        {/* Ẩn scrollbar bằng outerElementType */}
        <List
          height={500}
          itemCount={filteredTasks.length}
          itemSize={56}
          width={1200}
          outerElementType={forwardRef<HTMLDivElement>((props, ref) => (
            <div {...props} ref={ref} className="scrollbar-hide" />
          ))}
        >
          {Row}
        </List>
        <style>{`
          .scrollbar-hide::-webkit-scrollbar { display: none !important; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </div>
  );
};