import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { createTask } from "../services/taskService";
import { useNavigate } from "react-router";
import apiClient from "../Libraries/apiClient";

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
      assignee_id: undefined, // Optional field
    },
    mode: "onChange",
  });
  // const onSubmit: SubmitHandler<IFormInput> = async (data: any) => {
  //   console.log("Form submitted:", data);
  //   try {
  //     await createTask(data);
  //     console.log("Task created successfully:", data);
  //     navigate("/tasks"); // Redirect to tasks page after creation
  //   } catch (error) {
  //     console.error("Error creating task:", error);
  //     alert("Failed to create task. Please try again.");
  //   }
  // };
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
    <div className="flex justify-center pt-24 bg-white min-h-screen">
  <div className="bg-gray-50 p-8 rounded-xl shadow-lg w-full max-w-xl border border-gray-200">
    <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Create Task</h2>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-600" htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          {...register("title")}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Enter task title"
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-600" htmlFor="description">Description</label>
        <textarea
          id="description"
          {...register("description")}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Enter task description"
          rows={4}
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-600" htmlFor="status">Status</label>
          <select
            id="status"
            {...register("status")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="to_do">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-600" htmlFor="priority">Priority</label>
          <select
            id="priority"
            {...register("priority")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && <p className="text-red-500 text-xs mt-1">{errors.priority.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-600" htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            {...register("start_date")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.start_date && <p className="text-red-500 text-xs mt-1">{errors.start_date.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-600" htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            {...register("due_date")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.due_date && <p className="text-red-500 text-xs mt-1">{errors.due_date.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-600" htmlFor="assignee_id">Assigned To (ID)</label>
        <input
          type="number"
          id="assignee_id"
          {...register("assignee_id")}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Enter assignee ID"
        />
        {errors.assignee_id && <p className="text-red-500 text-xs mt-1">{errors.assignee_id.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200 tracking-wide"
      >
        Create Task
      </button>
    </form>
  </div>
</div>

  );
};