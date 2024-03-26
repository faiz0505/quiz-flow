"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { FaRepeat } from "react-icons/fa6";
import { refresh } from "../actions/refresh.action";
import { ErrorHandler } from "../utils";
const refreshData = () => {
  return (
    <Button
      size="sm"
      color="success"
      className="text-white"
      onClick={async () => {
        await refresh();
      }}
      startContent={<FaRepeat />}
    >
      Refresh
    </Button>
  );
};

export default refreshData;
