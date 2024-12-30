"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const Login = () => {
  const [isShowPass, setIsShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleShowPassword = () => {
    setIsShowPass((pre) => !pre);
  };
  const onSubmit = async (data) => {
    // Handle form submission logic here
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res.ok) {
        router.push("/profile");
        toast.success("Login successful.");
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
        <h5 className="text-lg font-semibold">Demo Login :</h5>
        <p className="text-sm">
          Email : <span className="font-bold">login@quizflow.com</span>
        </p>
        <p className="text-sm">
          Password : <span className="font-bold">12345678</span>
        </p>
      </div>
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-4 underline text-center">
          Sign In
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <Input
            type="text"
            placeholder="Email"
            variant="bordered"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-z0-9]+@[a-z0-9]+\.[a-z]{3,}(\.com)?$/,
                message: "Invalid email address",
              },
            })}
            isInvalid={errors.email && true}
            errorMessage={errors?.email?.message}
          />

          <Input
            type={isShowPass ? "text" : "password"}
            variant="bordered"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            isInvalid={errors.password && true}
            errorMessage={errors?.password?.message}
            endContent={
              <Button
                isIconOnly
                radius="full"
                size="sm"
                variant="flat"
                onClick={handleShowPassword}
              >
                {isShowPass ? <FaEye /> : <FaEyeSlash />}
              </Button>
            }
          />

          <Button type="submit" color="primary" isLoading={isLoading}>
            Login
          </Button>
        </form>
        <div className="flex justify-between">
          <p className="mt-4">
            <Link href="/forgot-password" className="text-blue-500 ml-1">
              forgot password?
            </Link>
          </p>
          <p className="mt-4">
            New user?
            <Link href="/signup" className="text-blue-500 ml-1">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
