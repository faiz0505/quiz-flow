"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { sendMail } from "../actions/mail.actions";
const page = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      if (!session) {
        toast.error("please login to continue");
      } else {
        let template = {
          from_email: data.from_email,
          from_name: data.from_name,
          message: data.message,
        };
        setIsLoading(true);
        const res = await sendMail("template_czuxojl", template);
        if (res === 200) {
          toast.success("Thank you! your message was sent");
          reset();
        } else {
          toast.error(sendMail.text);
        }
      }
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full flex justify-center pt-10 px-2">
      <Card className="w-full md:w-1/2">
        <CardHeader>
          <h1 className="text-lg font-bold">Contact us</h1>
        </CardHeader>
        <CardBody>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-2"
          >
            <Input
              type="text"
              placeholder="Your Name"
              {...register("from_name", { required: "Name is required" })}
              variant="bordered"
              isInvalid={errors.from_name && true}
              errorMessage={errors?.from_name?.message}
            />
            <Input
              type="email"
              placeholder={session ? session.user.email : "Your email"}
              variant="bordered"
              {...register("from_email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-z0-9]+@[a-z0-9]+\.[a-z]{3,}(\.com)?$/,
                  message: "Invalid email address",
                },
              })}
              isInvalid={errors.from_email && true}
              errorMessage={errors?.from_email?.message}
            />
            <Textarea
              variant="bordered"
              placeholder="Your Message"
              isInvalid={errors.message && true}
              errorMessage={errors?.message?.message}
              {...register("message", { required: "Messge is required" })}
            ></Textarea>
            <Button type="submit" color="primary" isLoading={isLoading}>
              Submit
            </Button>
          </form>
        </CardBody>
      </Card>
    </main>
  );
};

export default page;
