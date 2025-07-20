import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router";
import { useAuthStore } from "../useAuthorStore";
import { useEffect } from "react";

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
  // const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { login, error, loggedInUser } = useAuthStore((state) => state);

  useEffect(() => {
    if (loggedInUser) {
      navigate("/home");
    }
  }, [loggedInUser, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "nhan@mail.com",
      password: "123456789",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    login({
      username: data.username,
      password: data.password,
      navigate: navigate,
    });

    // const rs = await login(data.username, data.password);
    // if (rs) {
    //   const user = {
    //     id: rs.loggedInUser.id,
    //     email: rs.loggedInUser.email,
    //     access_token: rs.access_token,
    //   };

    //   setUser(user);
    //   localStorage.setItem("user", JSON.stringify(user));
    //   localStorage.setItem("access_token", user.access_token);
    //   window.location.href = "/tasks";
    // } else {
    //   alert("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    // }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#e3f2fd] to-[#f1f5ff] px-4">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full">
        {/* Image Section */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="/images/login.png"
            alt="Login illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#7f7fd5]">
            Đăng nhập
          </h2>
          {error && (
            <p className="text-red-500 text-sm mb-4">
              {error.message || "Đăng nhập không thành công"}
            </p>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("username")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7f7fd5] transition"
                placeholder="example@email.com"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="password"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7f7fd5] transition"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#7f7fd5] hover:bg-[#6c6cd1] text-white py-2 rounded-full font-semibold transition duration-200"
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};