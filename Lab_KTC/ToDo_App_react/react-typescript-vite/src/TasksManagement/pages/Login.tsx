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
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "tungnt@softech.vn",
      password: "123456789",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const rs = await login(data.username, data.password);
    if (rs) {
      const user = {
        id: rs.loggedInUser.id,
        email: rs.loggedInUser.email,
        access_token: rs.access_token,
      };
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("access_token", user.access_token);
      window.location.href = "/tasks";
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex w-full h-[100vh] bg-white shadow-lg overflow-hidden">
        {/* Left Image */}
        <div className="hidden md:block w-1/2 h-full">
          <img
            src="/images/download.png"
            alt="Login Illustration"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6 text-center">Login</h2>
        

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("username")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-300"
                placeholder="Enter your email"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-300"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-sky-400 text-white py-2 rounded hover:bg-sky-600 transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
