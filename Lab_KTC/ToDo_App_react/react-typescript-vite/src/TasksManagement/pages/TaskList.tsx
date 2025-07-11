import React, { useEffect } from "react";
import type { Task } from "../types/types";
import { fetchTasks } from "../services/taskService";
import { Link } from "react-router";
import SearchTasks from "../components/Fillter";

export const OurTasksPage = () => {
  const [tasks, setTasks] = React.useState([]);
  useEffect(() => {
    const tasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
        console.log("Tasks fetched successfully:", data);
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
    // Logic to filter tasks based on status and priority
    console.log("Filters applied:", filters);
    // You can implement the filtering logic here or pass it to a service function
    setFilters(filters);
  };

  const filteredTasks = tasks.filter((task: Task) => {
    let matches = true;

    if (filters.status && task.status !== filters.status) {
      matches = false;
    }

    if (filters.priority && task.priority !== filters.priority) {
      matches = false;
    }

    return matches;
  });
  return (
    <div className="container mx-auto p-4">
      <SearchTasks onSearch={handleOnSearch} />
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden text-sm">
        <thead className="bg-sky-100 text-gray-700">
          <tr>
            <th className="py-3 px-4 text-left border-b border-gray-200">
              Task ID
            </th>
            <th className="py-3 px-4 text-left border-b border-gray-200">
              Title
            </th>
            <th className="py-3 px-4 text-left border-b border-gray-200">
              Description
            </th>
            <th className="py-3 px-4 text-left border-b border-gray-200">
              Status
            </th>
            <th className="py-3 px-4 text-left border-b border-gray-200">
              Priority
            </th>
            <th className="py-3 px-4 text-left border-b border-gray-200">
              Start Date
            </th>
            <th className="py-3 px-4 text-left border-b border-gray-200">
              Due Date
            </th>
            <th className="py-3 px-4 text-left border-b border-gray-200">
              Assigned To
            </th>
            <th className="py-3 px-4 text-left border-b border-gray-200">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task: Task) => (
            <tr
              key={task.id}
              className="hover:bg-gray-200 transition duration-200 border-b border-gray-300"
            >
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
                {" "}
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
                {task.start_date
                  ? new Date(task.start_date).toLocaleDateString()
                  : ""}
              </td>
              <td className="py-2 px-4">
                {task.due_date
                  ? new Date(task.due_date).toLocaleDateString()
                  : ""}
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
        </tbody>
      </table>
    </div>
  );
};