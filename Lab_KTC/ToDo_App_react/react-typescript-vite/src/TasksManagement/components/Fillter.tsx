import { useForm } from "react-hook-form";

interface IFormInput {
  status: string;
  priority: string;
}

type Props = {
  onSearch?: (filters: IFormInput) => void;
};

export default function SearchTasks({ onSearch }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      status: "",
      priority: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: IFormInput) => {
    if (onSearch && typeof onSearch === "function") {
      onSearch(data);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-4 rounded-md shadow-sm flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-end gap-4 flex-wrap text-sm"
      >
        {/* Status Field */}
        <div className="w-[150px]">
          <label
            htmlFor="status"
            className="block font-medium text-gray-700 mb-1"
          >
            Status
          </label>
          <select
            {...register("status")}
            id="status"
            name="status"
            className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
          >
            <option value="">All</option>
            <option value="to_do">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-xs mt-1">
              {errors.status.message}
            </p>
          )}
        </div>

        {/* Priority Field */}
        <div className="w-[150px]">
          <label
            htmlFor="priority"
            className="block font-medium text-gray-700 mb-1"
          >
            Priority
          </label>
          <select
            {...register("priority")}
            id="priority"
            name="priority"
            className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
          >
            <option value="">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && (
            <p className="text-red-500 text-xs mt-1">
              {errors.priority.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-sky-400 text-white py-2 px-4 rounded hover:bg-sky-600 transition font-medium"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
