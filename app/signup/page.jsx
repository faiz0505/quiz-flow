"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { sendMail } from "../actions/mail.actions";
import { ErrorHandler } from "../utils";
import { TbEdit } from "react-icons/tb";
const Register = () => {
  const [isShowPass, setIsShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    const generateOtp = Math.floor(Math.random() * 9000) + 1000;
    setOtp(generateOtp);
  }, []);
  const onSubmit = async (data) => {
    setFormData({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    try {
      setOtp(otp);
      let templateParams = {
        from_name: "Quiz Flow",
        to_name: data.name,
        message: `verification code : ${otp}`,
        to_email: data.email,
      };
      setIsLoading(true);
      const sendVarificationCodeRes = await sendMail(
        "template_kvstclj",
        templateParams
      );
      if (sendVarificationCodeRes === 200) {
        toast.success("Verification Code sent to your email");
        onOpen();
        setIsOtpSent(true);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "An error occurred!please try again later or refresh the page"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowPassword = () => {
    setIsShowPass((pre) => !pre);
  };

  const validateCode = async (data) => {
    try {
      if (data.code == otp) {
        setIsLoading(true);
        const res = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          toast.success("Congrats! you have successfully registered");
          router.replace("/signin");
        } else {
          const msg = await res?.json();
          toast.error(msg.error || msg.message);
        }
      } else {
        toast.error("Invalid verification code");
      }
    } catch (error) {
      console.log(error);
      ErrorHandler(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-semibold mb-4 underline text-center">
        Sign up
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col gap-y-4`}
      >
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
      {isOtpSent && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex justify-center">
                  <div className="flex items-center mb-2">
                    <p>Edit Email : </p>
                    <span className="pl-2 font-bold">{formData.email}</span>
                    <Button
                      onClick={() => setIsOtpSent(false)}
                      size="sm"
                      variant="none"
                      isIconOnly
                      radius="full"
                    >
                      <TbEdit className="text-lg" />
                    </Button>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <form
                    onSubmit={handleSubmit(validateCode)}
                    className="flex flex-col gap-y-3"
                  >
                    <Input
                      type="number"
                      variant="bordered"
                      label="code"
                      name="code"
                      {...register("code", {
                        maxLength: {
                          value: 4,
                          message: "Please enter 4 digit code",
                        },
                        minLength: {
                          value: 4,
                          message: "Please enter 4 digit code",
                        },

                        required: "please enter code",
                      })}
                      isInvalid={errors.code && true}
                      errorMessage={errors.code && errors.code.message}
                    />
                    <Button color="primary" type="submit" isLoading={isLoading}>
                      Submit
                    </Button>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default Register;
