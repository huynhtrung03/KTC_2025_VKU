import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const schema = yup
  .object({
    firstName: yup
      .string()
      .min(2, "First Name phải có ít nhất 2 ký tự")
      .required("Bắt buộc nhập First Name"),

    lastName: yup
      .string()
      .min(2, "Last Name phải có ít nhất 2 ký tự")
      .required("Bắt buộc nhập Last Name"),

    phone: yup
      .string()
      .matches(/^\d{10,15}$/, "Số điện thoại không hợp lệ (10–15 số)")
      .required("Bắt buộc nhập số điện thoại"),

    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Bắt buộc nhập email"),

    password: yup
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .matches(/[A-Z]/, "Phải có ít nhất 1 chữ in hoa")
      .matches(/[a-z]/, "Phải có ít nhất 1 chữ thường")
      .matches(/[0-9]/, "Phải có ít nhất 1 số")
      .matches(/^\S*$/, "Không được có khoảng trắng")
      .required("Bắt buộc nhập mật khẩu"),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Mật khẩu nhập lại không khớp")
      .required("Bắt buộc xác nhận mật khẩu"),

    terms: yup.boolean().oneOf([true], "Bạn phải đồng ý điều khoản"),
  })
  .required();
export const FormTwo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = () => alert("succes");
  return (
    <div className="flex text-white w-full min-h-screen justify-center">
      <div className="bg-blue-300 w-1/4 p-5 flex-col hidden md:block">
        <div className="p-5 flex gap-2">
          <img className="w-8 h-8 rounded-full" src="/image/ticket.png"></img>
          <span className="">Lottery Display</span>
        </div>
        <span className="text-2xl p-5 mt-10">
          A few clicks away from creating your Lottery Display
        </span>
        <img src="https://nhannn87dn.github.io/ui-form-antd-yup/statics/img/lottery-display.svg"></img>
      </div>
      <div className="flex min-h-screen w-full sm:w-3/4 bg-white text-sky-600 p-5 flex-col justify-start sm:justify-center">
        <h1 className="text-3xl font-semibold">Register</h1>
        <div className="flex flex-col gap-4 my-5 sm:w-[60%] w-full">
          <h3 className="text-2xl font-semibold mt-15">
            Manage all your lottery efficiently
          </h3>
          <span className="text-gray-600 ">
            Let's get you all set up so can verify your personal account and
            begin setting up your Lottery Display
          </span>
        </div>

        <hr className="text-gray-200"></hr>

        <form
          className="flex flex-col mt-5 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-2 sm:flex-nowrap flex-wrap">
            <div className="flex flex-col w-full">
              <label className="text-gray-600">First Name</label>
              <input
                type="text"
                {...register("firstName")}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.firstName && (
                <span className="text-red-500 text-sm">
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label className="text-gray-600">Last Name</label>
              <input
                type="tex"
                {...register("lastName")}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.lastName && (
                <span className="text-red-500 text-sm">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2 sm:flex-nowrap flex-wrap">
            <div className="flex flex-col w-full">
              <label className="text-gray-600">Phone Number</label>
              <input
                type="tel"
                {...register("phone")}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">
                  {errors.phone.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label className="text-gray-600">Email</label>
              <input
                type="email"
                {...register("email")}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2 sm:flex-nowrap flex-wrap">
            <div className="flex flex-col w-full">
              <label className="text-gray-600">Password</label>
              <input
                type="password"
                {...register("password")}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label className="text-gray-600">Confirm Password</label>
              <input
                type="password"
                {...register("confirmPassword")}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2 justify-start items-center">
            <input type="checkbox" />
            <span className="text-gray-600">
              Yes, I would like to receive marketing emails from
            </span>
          </div>
          <div className="flex gap-2 justify-start items-center">
            <input type="checkbox" {...register("terms")} />
            <span className="text-gray-600">
              I agree to the Terms of Service and Privacy Policy
            </span>
          </div>
          {errors.terms && (
            <span className="text-red-500 text-sm">{errors.terms.message}</span>
          )}
          <input
            type="submit"
            className="w-full sm:w-[20%] bg-blue-500 text-white p-3 rounded-lg mt-5 cursor-pointer hover:bg-blue-600 transition-colors duration-300"
            value="Create Account"
          />
          <span className="text-gray-600 mt-3">
            I haven't account? <strong className="text-sky-600">Log in</strong>
          </span>
        </form>
      </div>
    </div>
  );
};