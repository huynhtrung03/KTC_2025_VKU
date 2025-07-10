import { useForm, type SubmitHandler } from "react-hook-form";
import AuthContext from "../context";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import { login } from "../services/taskService";
const schema = yup.object({
  username: yup
    .string()
    .email("Email không hợp lệ")
    .required("Bắt buộc nhập email"),
  password: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .required("Bắt buộc nhập mật khẩu"),
});
interface IFormInput {
  username: string;
  password: string;
}
export const LogInPage = () => {
  const { setUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log("Form submitted:", data);

    const rs = await login(data.username, data.password);
    console.log("User logged in:", rs);
    if (rs) {
      const user = {
        id: rs.loggedInUser.id,
        email: rs.loggedInUser.email,
        access_token: rs.access_token,
      };

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("access_token", user.access_token);
      // Redirect to tasks page or any other page
      window.location.href = "/tasks"; // Adjust the path as needed
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center h-[90vh] bg-white">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("username")}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Enter your email"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-pink-400 text-white py-2 rounded hover:bg-pink-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};