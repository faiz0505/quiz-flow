"use client";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "@nextui-org/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteQuiz } from "../actions/quiz.actions";
const DeleteBtn = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      isIconOnly
      color="warning"
      radius="full"
      onClick={async () => {
        setIsLoading(true);
        const deleteQuiz = await deleteQuiz(id);
        if (deleteQuiz) {
          setIsLoading(false);
          toast.success("Quiz deleted successfully");
        } else {
          setIsLoading(false);
          toast.error("Quiz not deleted");
        }
      }}
      isLoading={isLoading}
    >
      <AiOutlineDelete className="text-lg" />
    </Button>
  );
};

export default DeleteBtn;
