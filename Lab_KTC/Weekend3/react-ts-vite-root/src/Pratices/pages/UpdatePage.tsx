
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
// import { getTaskById, updateTask } from "../services/taskService";
import type { UpdateTaskInput } from "../types/types";
import apiClient from "../libraries/api-client-s";

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
        const task = (await apiClient.get(`/workspaces/tasks/${id}`)) as any;
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
        console.error("Failed to load task:", error);
        alert("Failed to load task");
      }
    };
    fetchTask();
  }, [id, reset]);

  const onSubmit: SubmitHandler<UpdateTaskInput> = async (data) => {
    console.log("Form submitted:", data);
    try {
      await apiClient.patch(`/workspaces/tasks/${id}`, data);
      // navigate("/tasks");
      navigate(-1);
    } catch (error) {
      console.error("Failed to update task:", error);
      alert("Failed to update task");
    }
  };

  return (
    <div className="flex justify-center min-h-screen pt-24 bg-white">
  <div className="w-full max-w-xl bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-200">
    <h2 className="text-3xl font-bold mb-8 text-center text-gray-700">Update Task</h2>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-gray-700">
      
      {/* Title */}
      <div>
        <label className="block text-sm font-semibold mb-1">Title</label>
        <input
          type="text"
          {...register("title")}
          disabled={isDone}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none disabled:bg-gray-100"
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold mb-1">Description</label>
        <textarea
          {...register("description")}
          disabled={isDone}
          rows={4}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none disabled:bg-gray-100"
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Status */}
        <div>
          <label className="block text-sm font-semibold mb-1">Status</label>
          <select
            {...register("status")}
            disabled={isDone}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 disabled:bg-gray-100"
          >
            <option value="to_do">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-semibold mb-1">Priority</label>
          <select
            {...register("priority")}
            disabled={isDone}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 disabled:bg-gray-100"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && <p className="text-red-500 text-xs mt-1">{errors.priority.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Start Date */}
        <div>
          <label className="block text-sm font-semibold mb-1">Start Date</label>
          <input
            type="date"
            {...register("start_date")}
            disabled={isDone}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 disabled:bg-gray-100"
          />
          {errors.start_date && <p className="text-red-500 text-xs mt-1">{errors.start_date.message}</p>}
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-semibold mb-1">Due Date</label>
          <input
            type="date"
            {...register("due_date")}
            disabled={isDone}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 disabled:bg-gray-100"
          />
          {errors.due_date && <p className="text-red-500 text-xs mt-1">{errors.due_date.message}</p>}
        </div>
      </div>

      {/* Assignee */}
      <div>
        <label className="block text-sm font-semibold mb-1">Assignee ID</label>
        <input
          type="number"
          {...register("assignee_id")}
          disabled={isDone}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 disabled:bg-gray-100"
          placeholder="Enter assignee ID"
        />
        {errors.assignee_id && <p className="text-red-500 text-xs mt-1">{errors.assignee_id.message}</p>}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-1/2 bg-gray-300 text-gray-800 font-medium py-2 rounded-lg hover:bg-gray-400 transition"
        >
          Cancel
        </button>

        {!isDone ? (
          <button
            type="submit"
            className="w-1/2 bg-sky-500 text-white font-semibold py-2 rounded-lg hover:bg-sky-600 transition"
          >
            Update
          </button>
        ) : (
          <div className="w-1/2 text-center text-gray-400 font-medium py-2 rounded-lg border border-gray-300">
            Task Done
          </div>
        )}
      </div>
    </form>
  </div>
</div>

  );
};
