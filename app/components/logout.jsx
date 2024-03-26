"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const logout = () => {
  const router = useRouter();
  const handelLogout = async () => {
    try {
      const res = await signOut({ redirect: false });
      router.push("/");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <Button color="danger" className="w-full" onClick={handelLogout}>
      Log out
    </Button>
  );
};

export default logout;
