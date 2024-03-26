"use client";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "@nextui-org/button";
import toast from "react-hot-toast";
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
        const res = await deleteQuiz(id);
        if (res) {
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
