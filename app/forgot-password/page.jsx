"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Divider,
} from "@nextui-org/react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorHandler } from "../utils";
import { fetchUserByEmail } from "../actions/user.actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { sendMail } from "../actions/mail.actions";

const page = () => {
  const [otp, setOtp] = useState();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    let generateOtp = Math.floor(Math.random() * 9000) + 1000;
    setOtp(generateOtp);
  }, []);

  const handleSendMail = async (data) => {
    try {
      const isRegistered = await fetchUserByEmail(data.email);
      if (isRegistered) {
        let templateParams = {
          to_name: "user",
          from_name: "Quiz Flow",
          message: `use this verification code to update your password ${otp}`,
          to_email: data.email,
        };

        const response = await sendMail("template_kvstclj", templateParams);

        if (response === 200) {
          setIsOtpSent(true);
          toast.success("Verification code sent successfully");
          onOpen();
        } else {
          toast.error("verification code not sent");
        }
      } else {
        toast.error("Email not registered");
      }
    } catch (error) {
      console.log(error);
      ErrorHandler(error);
    }
  };

  const validateCode = (data) => {
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
              onSubmit={handleSubmit(handleSendMail)}
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
            {isOtpSent && (
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
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Close
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            )}
          </CardBody>
        </Card>
      )}
    </main>
  );
};

export default page;
