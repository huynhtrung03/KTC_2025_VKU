import Link from "next/link";
import type { Task } from "../types";

export default function TaskTable({ tasks }: { tasks: Task[] }) {
  return (
    <table className="min-w-full border border-gray-300 rounded">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Title</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Priority</th>
          <th className="px-4 py-2">Start Date</th>
          <th className="px-4 py-2">Due Date</th>
          <th className="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((t) => (
          <tr key={t.id} className="border-t">
            <td className="px-4 py-2">{t.id}</td>
            <td className="px-4 py-2">{t.title}</td>
            <td className="px-4 py-2">{t.status}</td>
            <td className="px-4 py-2">{t.priority}</td>
            <td className="px-4 py-2">{t.start_date ? new Date(t.start_date).toLocaleDateString() : ""}</td>
            <td className="px-4 py-2">{t.due_date ? new Date(t.due_date).toLocaleDateString() : ""}</td>
            <td className="px-4 py-2">
              <Link
                href={`/task-isr/${t.id}`}
                className="text-blue-600 hover:underline"
              >
                View
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}