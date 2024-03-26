"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { useSession } from "next-auth/react";
import { FaUser } from "react-icons/fa6";
import Image from "next/image";
const navigation = () => {
  const { data: session } = useSession();
  const navItems = [
    { title: "Home", link: "/" },
    { title: "About", link: "/about" },
    { title: "Contact us", link: "/contact" },
    { title: "FAQ", link: "/faq" },
  ];
  return (
    <header className="md:w-[80vw] w-full mx-auto rounded-full h-12 bg-transparent backdrop-blur-sm z-50 border flex  justify-between items-center px-5 overflow-hidden">
      {/* logo */}
      <div>
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            height={50}
            width={80}
            alt="QuizFlow's Logo"
            className=""
            priority
            quality={100}
          />
        </Link>
      </div>
      {/* nav items */}
      <div className="text-white">
        <ul className="md:flex items-center gap-x-8 hidden">
          {navItems.map((item, i) => {
            return (
              <li key={item.link}>
                <Link href={item.link}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      {/* profile || login/register button */}
      <div>
        {session ? (
          <div className="flex gap-x-2 justify-center items-center">
            {session?.user.role === "admin" && (
              <Link
                href={"admin-dashboard"}
                className="text-blue-500 hover:text-white"
              >
                Dashboard
              </Link>
            )}
            <Button
              radius="full"
              color="primary"
              size="sm"
              startContent={<FaUser />}
            >
              <Link href={"/profile"} className="text-white font-bold">
                Profile
              </Link>
            </Button>
            <div className="md:hidden">
              <Popover placement="bottom-end" size="lg" radius="sm">
                <PopoverTrigger>
                  <Button isIconOnly size="sm" radius="full" color="secondary">
                    <AiOutlineMenu className="text-lg" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <ul className="py-5 px-2 flex flex-col gap-y-5 items-center w-full opacity-70">
                    {navItems.map((item) => {
                      return (
                        <li
                          key={item.link}
                          className=" border-b py-1 hover:scale-110"
                        >
                          <Link href={item.link}>{item.title}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        ) : (
          <div className="flex gap-x-2 justify-center">
            <Button color="primary" size="sm" radius="full">
              <Link href={"/signin"} className="text-white">
                SignIn
              </Link>
            </Button>
            <Button color="primary" variant="bordered" size="sm" radius="full">
              <Link href={"/signup"} className="text-white">
                register
              </Link>
            </Button>
            <div className="md:hidden">
              <Popover placement="bottom-end" size="lg" radius="none">
                <PopoverTrigger>
                  <Button isIconOnly size="sm" radius="full" color="secondary">
                    <AiOutlineMenu className="text-lg" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <ul className="py-5 px-2 flex flex-col gap-y-5 items-center w-full opacity-70">
                    {navItems.map((item) => {
                      return (
                        <li
                          key={item.link}
                          className=" border-b py-1 hover:scale-110"
                        >
                          <Link href={item.link}>{item.title}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default navigation;
