
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { getTaskById, updateTask } from "../services/taskService";
import type { UpdateTaskInput } from "../types/types";

const schema: yup.ObjectSchema<UpdateTaskInput> = yup.object({
  title: yup.string().required().min(3).max(100),
  start_date: yup
    .string()
    .required()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
  due_date: yup
    .string()
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date")
    .test("after-start", "Due date must be after start date", function (value) {
      if (!value) return true;
      const { start_date } = this.parent;
      return new Date(value) >= new Date(start_date);
    }),
  description: yup.string().optional().max(500),
  status: yup
    .mixed<"to_do" | "in_progress" | "done">()
    .required()
    .oneOf(["to_do", "in_progress", "done"]),
  priority: yup
    .mixed<"low" | "medium" | "high">()
    .required()
    .oneOf(["low", "medium", "high"]),
  assignee_id: yup.number().optional().typeError("Must be a number").min(1),
});

export const UpdateTaskPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isDone, setIsDone] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateTaskInput>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const task = await getTaskById(id ? parseInt(id) : 0);
        setIsDone(task.status === "done");
        reset({
          title: task.title,
          start_date: task.start_date?.split("T")[0],
          due_date: task.due_date?.split("T")[0],
          description: task.description,
          status: task.status,
          priority: task.priority,
          assignee_id: task.assignee_id,
        });
      } catch (error) {
        alert("Failed to load task");
      }
    };
    fetchTask();
  }, [id, reset]);

  const onSubmit: SubmitHandler<UpdateTaskInput> = async (data) => {
    try {
      await updateTask(id ? parseInt(id) : 0, data);
      navigate("/tasks");
    } catch (error) {
      alert("Failed to update task");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white mt-20">
      <div className="bg-white p-8 rounded-lg shadow-md sm:w-[60%] w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Task</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              {...register("title")}
              disabled={isDone}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-sky-500 disabled:bg-gray-100"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              {...register("description")}
              disabled={isDone}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-sky-500 disabled:bg-gray-100"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              {...register("status")}
              disabled={isDone}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-sky-500 disabled:bg-gray-100"
            >
              <option value="to_do">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              {...register("priority")}
              disabled={isDone}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-sky-500 disabled:bg-gray-100"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {errors.priority && <p className="text-red-500 text-sm">{errors.priority.message}</p>}
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              {...register("start_date")}
              disabled={isDone}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-sky-500 disabled:bg-gray-100"
            />
            {errors.start_date && <p className="text-red-500 text-sm">{errors.start_date.message}</p>}
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <input
              type="date"
              {...register("due_date")}
              disabled={isDone}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-sky-500 disabled:bg-gray-100"
            />
            {errors.due_date && <p className="text-red-500 text-sm">{errors.due_date.message}</p>}
          </div>

          {/* Assignee */}
          <div>
            <label className="block text-sm font-medium mb-1">Assignee ID</label>
            <input
              type="number"
              {...register("assignee_id")}
              disabled={isDone}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-sky-500 disabled:bg-gray-100"
              placeholder="Enter assignee ID"
            />
            {errors.assignee_id && <p className="text-red-500 text-sm">{errors.assignee_id.message}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6 space-x-4">
            <button
              type="button"
              onClick={() => navigate("/tasks")}
              className="w-1/2 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>

            {!isDone ? (
              <button
                type="submit"
                className="w-1/2 bg-sky-500 text-white py-2 rounded hover:bg-sky-600 transition"
              >
                Update Task
              </button>
            ) : (
              <div className="w-1/2 text-center text-gray-400 font-medium py-2">
                Task is completed
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
