"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Divider,
  useDisclosure,
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useRouter } from "next/navigation";
const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);
  const [otp, setOtp] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const sendVerificationCode = async (email) => {
    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
      });

      if (res.ok) {
        const result = await res.json();
        toast.success("Verification code sent to email");
        setOtp(result.message);
        onOpen();
      } else {
        const result = await res.json();
        toast.error(result.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred! Please try again or refresh the page");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    await sendVerificationCode(data.email);
  };

  const validateCode = async (data) => {
    const { code } = data;
    if (code == otp) {
      setIsAuthenticated(true);
      toast.success("Success");
    } else {
      toast.error("Invalid code: " + code);
    }
  };

  const updatePassword = async (data) => {
    const updatedUser = { email: data.email, password: data.password };
    try {
      setIsLoading(true);
      const response = await fetch("/api/update-password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        toast.success("Successfully updated");
        router.push("/signin");
      } else {
        const result = await response.json();
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="w-full flex justify-center pt-10">
      {isAuthenticated ? (
        <Card className="md:w-1/2 w-full">
          <CardHeader className="flex justify-center">
            <h1 className="text-xl font-bold">Create New Password</h1>
          </CardHeader>
          <CardBody>
            <form
              className="flex flex-col gap-3"
              onSubmit={handleSubmit(updatePassword)}
            >
              <Input
                type={isShowPass ? "text" : "password"}
                variant="bordered"
                placeholder="create new password"
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
                    onClick={() => setIsShowPass((pre) => !pre)}
                  >
                    {isShowPass ? <FaEye /> : <FaEyeSlash />}
                  </Button>
                }
              />
              <Button type="submit" color="primary" isLoading={isLoading}>
                Submit
              </Button>
            </form>
          </CardBody>
        </Card>
      ) : (
        <Card className="md:w-1/2 w-full">
          <CardHeader className="flex justify-center">
            <h1 className="text-xl font-bold">Forgot Password</h1>
          </CardHeader>
          <Divider />
          <CardBody>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <Input
                type="text"
                label="Email"
                placeholder="example@gmail.com"
                name="email"
                variant="bordered"
                {...register("email", {
                  required: "please enter your email address",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "invalid email",
                  },
                })}
                isInvalid={errors.email && true}
                errorMessage={errors.email && errors.email.message}
              />
              <Button type="submit" color="primary" isLoading={isLoading}>
                Submit
              </Button>
            </form>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex justify-center">
                      <h1 className="text-xl font-bold">Reset Password</h1>
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
                        <Button color="primary" type="submit">
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
          </CardBody>
        </Card>
      )}
    </main>
  );
};

export default page;
