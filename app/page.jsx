import React from "react";
import HomePage from "./components/home";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { TbApi, TbCategoryPlus, TbAdjustmentsHorizontal } from "react-icons/tb";
import Image from "next/image";
const page = () => {
  return (
    <main className="flex flex-col items-center gap-y-5">
      <HomePage />
      <Card className="md:w-1/2 w-full">
        <CardHeader>
          <p className="text-center font-semibold text-sm">
            Explore diverse quizzes, track your scores and review your test with
            QuizFlow's dynamic features
          </p>
        </CardHeader>
        <Divider />
        <CardBody className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
          <div className="flex flex-col items-center">
            <TbCategoryPlus className="text-6xl mb-2" />
            <p className="text-xs font-thin text-center">
              wide range of categories
            </p>
          </div>
          <div className="flex flex-col items-center">
            <TbAdjustmentsHorizontal className="text-6xl mb-2" />
            <p className="text-xs font-thin">Varied Difficulty Levels</p>
          </div>
          <div className="flex flex-col items-center col-span-2 md:col-span-1">
            <TbApi className="text-6xl mb-2" />
            <p className="text-xs font-thin">Powered by Trivia API</p>
          </div>
        </CardBody>
      </Card>
    </main>
  );
};

export default page;
