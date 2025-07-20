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
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-[#7f7fd5] mb-4 text-center">
        Filter Tasks
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="status"
              className="block font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              {...register("status")}
              id="status"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7f7fd5] transition"
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

          {/* Priority */}
          <div>
            <label
              htmlFor="priority"
              className="block font-medium text-gray-700 mb-1"
            >
              Priority
            </label>
            <select
              {...register("priority")}
              id="priority"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7f7fd5] transition"
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
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#7f7fd5] via-[#86a8e7] to-[#91eae4] text-white py-2 rounded-full hover:opacity-90 transition font-semibold text-sm shadow"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}