"use client";
import React, { useCallback, useState } from "react";
import Select from "./select";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import toast from "react-hot-toast";
import { Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
const HomePage = () => {
  const [difficulty, setDiffiulty] = useState([]);
  const [category, setCategry] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  let difficulties = ["easy", "medium", "hard"];
  const categories = [
    { id: 9, name: "General Knowledge" },
    { id: 10, name: "Entertainment: Books" },
    { id: 11, name: "Entertainment: Film" },
    { id: 12, name: "Entertainment: Music" },
    { id: 13, name: "Entertainment: Musicals & Theatres" },
    { id: 14, name: "Entertainment: Television" },
    { id: 15, name: "Entertainment: Video Games" },
    { id: 16, name: "Entertainment: Board Games" },
    { id: 17, name: "Science & Nature" },
    { id: 18, name: "Science: Computers" },
    { id: 19, name: "Science: Mathematics" },
    { id: 20, name: "Mythology" },
    { id: 21, name: "Sports" },
    { id: 22, name: "Geography" },
    { id: 23, name: "History" },
    { id: 24, name: "Politics" },
    { id: 25, name: "Art" },
    { id: 26, name: "Celebrities" },
    { id: 27, name: "Animals" },
    { id: 28, name: "Vehicles" },
    { id: 29, name: "Entertainment: Comics" },
    { id: 30, name: "Science: Gadgets" },
    { id: 31, name: "Entertainment: Japanese Anime & Manga" },
    { id: 32, name: "Entertainment: Cartoon & Animations" },
  ];
  const buildQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const slectedDifficulties = difficulty.currentKey;
  const selectedCategory = category.currentKey;
  const handleClick = () => {
    if (!selectedCategory || !slectedDifficulties) {
      toast.error("please select category or difficulty level");
    } else {
      if (session) {
        setIsLoading(true);
        router.push(
          `/quiz-start?${buildQueryString(
            "cat",
            selectedCategory
          )}&${buildQueryString("diff", slectedDifficulties)}`
        );
      } else {
        toast.error("please signin to continue");
      }
    }
  };
  return (
    <main className="w-full grid place-items-center mt-10">
      <Card className="md:w-1/2 w-full">
        <CardHeader className="flex justify-center">
          <h1 className="text-center text-lg font-bold">Welcome</h1>
        </CardHeader>
        <Divider />
        <CardBody className="grid items-center grid-cols-1 md:grid-cols-2 gap-3">
          <Select
            items={difficulties}
            value={difficulty}
            setValue={setDiffiulty}
            type={"difficulty"}
          />
          <Select
            items={categories}
            value={category}
            setValue={setCategry}
            type={"category"}
          />
          <Button
            className="md:col-span-2"
            color="secondary"
            onClick={handleClick}
            isLoading={isLoading}
          >
            Start
          </Button>
        </CardBody>
      </Card>
    </main>
  );
};

export default HomePage;
