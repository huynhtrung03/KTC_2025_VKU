import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const phoneRegex = /^\d{9,11}$/;
const containsLetter = /[a-zA-Z]/;
const schema = yup.object({
  username: yup
    .string()
    .test(
      "is-valid-username",
      "Phải là email hợp lệ hoặc số điện thoại",
      (value) => {
        if (!value) return false;
        const isEmail = yup.string().email().isValidSync(value);
        const isPhone = phoneRegex.test(value);
        return (isEmail || isPhone) && value.length >= 5;
      }
    )
    .required("Bắt buộc nhập username"),

  password: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .matches(/^\S*$/, "Mật khẩu không được chứa khoảng trắng")
    .matches(containsLetter, "Mật khẩu phải chứa ít nhất 1 chữ cái")
    .required("Bắt buộc nhập mật khẩu"),

  rememberMe: yup.boolean(), // optional
});
export const Form3 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: any) => {
    alert("success: " + JSON.stringify(data));
  };
  return (
    <div className="min-h-screen flex">
      <div className="relative flex-1 hidden lg:flex items-center justify-center bg-[#ECF1F4] p-8">
        <div
          className="absolute inset-0 bg-no-repeat bg-center bg-contain"
          style={{
            backgroundImage: "url('path/to/your/hexagon-background.svg')",
            opacity: 0.1,
          }}
        ></div>
        <div className="relative z-10 text-gray-800 max-w-lg text-center lg:text-left">
          <h1 className="text-4xl font-bold leading-tight mb-6">
            Set Your Partner Recruitment on Auto-Pilot
          </h1>
          <div className="relative w-full h-80 flex items-center justify-center">
            <img
              src="https://nhannn87dn.github.io/ui-form-antd-yup/statics/img/grovia.png"
              alt="Happy woman"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>
      </div>

      <div className="w-full lg:w-2/5 flex items-center justify-center p-8 bg-white shadow-lg lg:shadow-none">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            {/* <img
              src="/image/arena.png"
              alt="Grovia Logo"
              className="mx-auto w-48 h-24 lg:mx-0 mb-6"
            /> */}
            <h2 className="text-3xl font-semibold text-red-500 mb-2">Login</h2>
            <p className="text-gray-600 text-sm">Login to your account</p>
            <p className="text-gray-500 text-xs mt-2">
              Thank you for get back to Grovia, lets access our the best
              recommendation contact for you
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  {...register("username")}
                  id="username"
                  autoComplete="username"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  placeholder="Email or Phone Number"
                />
                {errors.username && (
                  <span className="text-red-500 text-xs">
                    {errors.username.message as string}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  autoComplete="current-password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  placeholder="Password"
                />
                {errors.password && (
                  <span className="text-red-500 text-xs">
                    {errors.password.message as string}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  {...register("rememberMe")}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-red-600 hover:text-red-500"
                >
                  Reset Password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                SIGN IN
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account yet?
            <a href="#" className="font-medium text-red-600 hover:text-red-500">
              Join Grovia Now!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};