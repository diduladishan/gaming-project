"use client";
import Image from "next/image";
import Logo from "../../public/images/sign-in/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Define the validation schema using Yup
const schema = yup.object().shape({
  newPassword: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
      "Password format incorrect: must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@, $, !, %, *, ?, &,#)."
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), undefined], "Passwords must match") // Reference `newPassword`
    .required("Please confirm your password"),
});

const PasswordReset = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit = async (data: any) => {
    try {
      const url = "http://localhost:3000/auth/reset-password";
      await axios.post(url, {
        email: "migaraten@gmail.com", // Dynamically replace this with the user's email
        newPassword: data.newPassword,
      });
      toast.success("Password reset successfully!");
      router.push("/sign-in");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "An error occurred while resetting password"
      );
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#0B0E13] h-full">
      <div className="flex flex-col border border-white w-[500px] h-max px-[70px] py-[50px]">
        <div className="flex items-center justify-center">
          <Image src={Logo} alt="logo" />
        </div>
        <p className="font-primaryFont text-[1.6em] font-medium text-white text-center mb-8">
          Forgot Password
        </p>
        <p className="text-white text-[15px] text-center mb-2">
          Your new password must be different from previously used passwords
        </p>

        <div className="h-[1px] bg-white mb-8"></div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* New Password */}
          <p className="text-white text-[15px] mb-1 uppercase">New Password</p>
          <Input
            type="password"
            placeholder="Enter your password"
            className="mb-3 text-white"
            {...register("newPassword")}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-[13px] mb-4">
              {errors.newPassword.message}
            </p>
          )}

          {/* Confirm Password */}
          <p className="text-white text-[15px] mb-1 uppercase">
            Confirm Password
          </p>
          <Input
            type="password"
            placeholder="Confirm your password"
            className="mb-3 text-white"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-[13px] mb-4">
              {errors.confirmPassword.message}
            </p>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="gaming"
            className="w-full h-fit font-primaryFont text-[1.1em] px-[1em] py-[0.5em] mb-3"
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
