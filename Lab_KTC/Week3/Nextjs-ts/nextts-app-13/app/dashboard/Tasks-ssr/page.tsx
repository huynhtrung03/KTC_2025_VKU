import Link from "next/link";
import { Task } from "../type";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return (
      <div>
        <h1>You are not logged in</h1>
      </div>
    );
  }
  const response = await await fetch(
    "https://server.aptech.io/workspaces/tasks",
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const tasks = await response.json();
  return (
    <div className="bg-white rounded-lg shadow p-6 w-full">
      <Tasks tasks={tasks} />
    </div>
  );
}
function Tasks({ tasks }: { tasks: Task[] }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-sky-700">Tasks SSR</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden text-sm mt-5">
          <thead className="bg-gray-300 text-gray-700">
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
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="hover:bg-gray-200 transition duration-200 border-b border-gray-300"
              >
                <td className="py-2 px-4">{task.id}</td>
                <td className="py-2 px-4">{task.title}</td>
                <td className="py-2 px-4">{task.description}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${
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
                  <Link href={`/day12/afternoon/task-isr/${task.id}`}>
                    <button className="bg-[#7f7fd5] hover:bg-[#6c6cd1] text-white px-4 py-1.5 rounded-full text-sm shadow-sm transition">
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}