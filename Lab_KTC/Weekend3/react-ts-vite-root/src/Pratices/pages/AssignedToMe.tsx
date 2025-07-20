import React, { useEffect } from "react";
import { useAuthStore } from "../useAuthStore";
import apiClient from "../libraries/api-client-s";
import { Link, useNavigate } from "react-router";
import type { Task } from "../types/types";
import SearchTasks from "../components/Fillter";

export const MyTaskPage = () => {
  const { loggedInUser } = useAuthStore((state) => state);
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [filters, setFilters] = React.useState<{ status: string; priority: string }>({
    status: "",
    priority: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      console.error("User is not logged in, redirecting...");
      navigate("/login");
      return;
    }

    const fetchMyTasks = async () => {
      try {
        const allTasks = (await apiClient.get("/workspaces/tasks")) as Task[];
        const myTasks = allTasks.filter(
          (task) => task.created_by === loggedInUser.id
        );
        setTasks(myTasks);
        console.log("My tasks:", myTasks);
      } catch (error) {
        console.error("Error fetching my tasks:", error);
      }
    };

    fetchMyTasks();
  }, [loggedInUser, navigate]);

  const handleOnSearch = (filters: { status?: string; priority?: string }) => {
    setFilters({
      status: filters.status || "",
      priority: filters.priority || "",
    });
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      (!filters.status || task.status === filters.status) &&
      (!filters.priority || task.priority === filters.priority)
    );
  });

  return (
    <div className="container mx-auto p-4 ">
      {/* <h1 className="text-2xl font-bold mb-4 text-gray-700">My Tasks</h1> */}
      <SearchTasks onSearch={handleOnSearch} />

      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden text-sm mt-6">
        <thead className="bg-sky-100 text-gray-700">
          <tr>
            <th className="py-3 px-4 text-left border-b border-gray-200">Task ID</th>
            <th className="py-3 px-4 text-left border-b border-gray-200">Title</th>
            <th className="py-3 px-4 text-left border-b border-gray-200">Description</th>
            <th className="py-3 px-4 text-left border-b border-gray-200">Status</th>
            <th className="py-3 px-4 text-left border-b border-gray-200">Priority</th>
            <th className="py-3 px-4 text-left border-b border-gray-200">Start Date</th>
            <th className="py-3 px-4 text-left border-b border-gray-200">Due Date</th>
            <th className="py-3 px-4 text-left border-b border-gray-200">Assignee</th>
            <th className="py-3 px-4 text-left border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id} className="hover:bg-gray-200 transition duration-200 border-b border-gray-300">
              <td className="py-2 px-4">{task.id}</td>
              <td className="py-2 px-4">{task.title}</td>
              <td className="py-2 px-4">{task.description}</td>
              <td className="py-2 px-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    task.status === "to_do"
                      ? "bg-blue-100 text-blue-800"
                      : task.status === "in_progress"
                      ? "bg-yellow-100 text-yellow-800"
                      : task.status === "done"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {task.status}
                </span>
              </td>
              <td className="py-2 px-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
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
              </td>
              <td className="py-2 px-4">
                {task.start_date ? new Date(task.start_date).toLocaleDateString() : ""}
              </td>
              <td className="py-2 px-4">
                {task.due_date ? new Date(task.due_date).toLocaleDateString() : ""}
              </td>
              <td className="py-2 px-4">{task.assignee_id}</td>
              <td className="py-2 px-4">
                <Link to={`/update-task/${task.id}`}>
                  <button className="bg-sky-400 hover:bg-sky-600 text-white px-3 py-1 rounded text-sm">
                    Edit
                  </button>
                </Link>
              </td>
            </tr>
          ))}
          {filteredTasks.length === 0 && (
            <tr>
              <td colSpan={9} className="py-4 text-center text-gray-500">
                No tasks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
