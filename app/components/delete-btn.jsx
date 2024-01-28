"use client";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "@nextui-org/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const DeleteBtn = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/quiz", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      });
      if (res.ok) {
        toast.success("deleted successfully");
        for (let time = 0; time < 3; time++) {
          router.refresh();
        }
      } else {
        toast.error("failed to delete! Please try again");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      isIconOnly
      color="warning"
      radius="full"
      onClick={handleDelete}
      isLoading={isLoading}
    >
      <AiOutlineDelete className="text-lg" />
    </Button>
  );
};

export default DeleteBtn;
