import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router";
import apiClient from "../lib/api-client-sp";

interface IFormInput {
  title: string;
  start_date: string;
  due_date?: string;
  description?: string;
  status: "to_do" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  assignee_id?: number;
}
const schema: yup.ObjectSchema<IFormInput> = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  start_date: yup
    .string()
    .required("Start date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date"),
  due_date: yup
    .string()
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date")
    .test(
      "due_date-after-start_date",
      "Due date must be after start date",
      function (value) {
        if (!value) return true;
        const { start_date } = this.parent;
        return new Date(value) >= new Date(start_date);
      }
    ),
  description: yup
    .string()
    .optional()
    .max(500, "Description must be less than 500 characters"),
  status: yup
    .mixed<"to_do" | "in_progress" | "done">()
    .required("Status is required")
    .oneOf(["to_do", "in_progress", "done"], "Please select a valid status"),
  priority: yup
    .mixed<"low" | "medium" | "high">()
    .required("Priority is required")
    .oneOf(["low", "medium", "high"], "Please select a valid priority"),
  assignee_id: yup
    .number()
    .min(1, "Assignee ID must be a positive number")
    .typeError("Assignee ID must be a number"),
});

export const CreateTaskPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      start_date: "",
      due_date: "",
      description: "",
      status: "to_do",
      priority: "medium",
      assignee_id: undefined,
    },
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data: any) => {
    console.log("Form submitted:", data);
    try {
      await apiClient.post("/workspaces/tasks", data);
      console.log("Task created successfully:", data);
      navigate("/tasks");
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#e3f2fd] to-[#f1f5ff] px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl p-8">
        <h2 className="text-2xl font-bold text-center text-[#7f7fd5] mb-6">
          Create Task
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              {...register("title")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7f7fd5] outline-none"
              placeholder="Enter task title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7f7fd5] outline-none"
              placeholder="Enter task description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Grid: Status + Priority + Dates + Assignee */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                {...register("status")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7f7fd5]"
              >
                <option value="to_do">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm">{errors.status.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <select
                {...register("priority")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7f7fd5]"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              {errors.priority && (
                <p className="text-red-500 text-sm">
                  {errors.priority.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Start Date
              </label>
              <input
                type="date"
                {...register("start_date")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7f7fd5]"
              />
              {errors.start_date && (
                <p className="text-red-500 text-sm">
                  {errors.start_date.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <input
                type="date"
                {...register("due_date")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7f7fd5]"
              />
              {errors.due_date && (
                <p className="text-red-500 text-sm">
                  {errors.due_date.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Assignee ID
              </label>
              <input
                type="number"
                {...register("assignee_id")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7f7fd5]"
                placeholder="Enter assignee ID"
              />
              {errors.assignee_id && (
                <p className="text-red-500 text-sm">
                  {errors.assignee_id.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#7f7fd5] hover:bg-[#6c6cd1] text-white py-2 rounded-full font-semibold transition duration-200"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};