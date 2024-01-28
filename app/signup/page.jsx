"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
const Register = () => {
  const [isShowPass, setIsShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Handle form submission logic here
    try {
      setIsLoading(true);
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const msg = await res.json();
      if (res.ok) {
        toast.success("Congrats! you have successfully registered");
        router.replace("/signin");
      } else {
        toast.error(msg.error);
      }
    } catch (error) {
      toast.promise(msg, {
        loading: "loading...",
        success: msg.error,
        error: msg.error,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowPassword = () => {
    setIsShowPass((pre) => !pre);
  };
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-semibold mb-4 underline text-center">
        Sign up
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          type="text"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
          variant="bordered"
          isInvalid={errors.name && true}
          errorMessage={errors?.name?.message}
        />

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
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          isInvalid={errors.password && true}
          errorMessage={errors?.password?.message}
        />

        <Button type="submit" color="primary" isLoading={isLoading}>
          Register
        </Button>
      </form>

      <p className="mt-4">
        Already registered?
        <Link href="/signin" className="text-blue-500 ml-1">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
