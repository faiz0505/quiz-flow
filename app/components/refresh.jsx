"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { FaRepeat } from "react-icons/fa6";
import { revalidatePath } from "next/cache";
const refresh = () => {
  const router = useRouter();
  return (
    <Button
      size="sm"
      color="success"
      className="text-white"
      onClick={() => {
        for (let time = 0; time < 6; time++) {
          router.refresh();
        }
      }}
      startContent={<FaRepeat />}
    >
      Refresh
    </Button>
  );
};

export default refresh;
