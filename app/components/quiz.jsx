"use client";
import useSWR from "swr";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Radio,
  RadioGroup,
  Spinner,
} from "@nextui-org/react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
export default function Quiz() {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [suffledOptions, setShufflesOptions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [quizes, setQuizes] = useState([]);
  const [isQuizEnd, setIsQuizEnd] = useState(false);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);

  const searchParams = useSearchParams();
  const category = searchParams.get("cat");
  const difficulty = searchParams.get("diff");
  const { height, width } = useWindowSize();
  const { data: session } = useSession();
  const fetcher = async (params) => {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=10&category=${params[1]}&difficulty=${params[2]}`
    );
    const data = await res.json();

    return data.results;
  };
  const { data, error, isLoading } = useSWR(
    ["TriviaQuiz", category, difficulty],
    fetcher
  );
  if (error) {
    toast.error("No internet connection");
  }

  useEffect(() => {
    if (data) {
      const incorrectOptions = data[currentQuizIndex].incorrect_answers;
      const correctOption = data[currentQuizIndex].correct_answer;
      setCorrectAnswer(correctOption);
      const totalOptions = [...incorrectOptions, correctOption];
      setCurrentQuestion(data[currentQuizIndex].question);
      setShufflesOptions(totalOptions.sort(() => Math.random() - 0.5));
      const decodeHTML = (html) => {
        const tempElement = document.createElement("div");
        tempElement.innerHTML = html;
        return tempElement.innerText;
      };
      const decodedText = decodeHTML(data[currentQuizIndex].question);
      setCurrentQuestion(decodedText);
    }
  }, [currentQuizIndex, data]);

  const handleChange = (e) => {
    setSelectedOption(e);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectedOption(null);

    if (!selectedOption) {
      // If selectedOption is not set, show an error message or handle it accordingly
      toast.error("Please select an option");
      return;
    }
    if (currentQuizIndex >= 9) {
      // If currentQuizIndex is greater than or equal to 9, log the quizes
      // sendData(quizes);
      toast.success("Quizes have been completed");
      setIsQuizEnd(true);
    } else {
      // If not, increase currentQuizIndex
      setCurrentQuizIndex((prevIndex) => prevIndex + 1);
    }
    const isCorrectAnswer = correctAnswer === selectedOption;
    if (isCorrectAnswer) {
      setCorrectAnswerCount((pre) => pre + 1);
    }
    setQuizes((prevQuizes) => ({
      ...prevQuizes,
      [currentQuizIndex]: {
        question: currentQuestion,
        options: suffledOptions,
        correctAnswer: correctAnswer,
        selectedOption: selectedOption,
        result: isCorrectAnswer,
      },
    }));
  };
  const sendData = async (data) => {
    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success("your quiz has been recorded");
      } else {
        toast.error(
          "we are sorry, your quiz hasn't been recorded! Please try again"
        );
      }
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    // This useEffect watches for changes in quizes state
    if (Object.keys(quizes).length == 10) {
      const data = {
        quiz: { ...quizes },
        user: session.user.email,
        category: category,
        difficulty: difficulty,
        points: correctAnswerCount,
      };
      sendData(data);
    }
  }, [quizes]);

  return isQuizEnd ? (
    <>
      <Confetti height={height} width={width} className="mx-auto" />
      <Card className="w-full md:w-1/2 min-h-80">
        <CardHeader className="flex justify-center">
          <p className=" text-red-500 font-bold">Congratulation</p>
        </CardHeader>
        <Divider />
        <CardBody className="flex items-center mt-16">
          <h3 className="font-bold">You Got</h3>
          <h1>
            <span className="font-bold">{correctAnswerCount} </span>/ 10
          </h1>
        </CardBody>
        <CardFooter>
          <Button color="primary">
            <Link href={"/"}>Back to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  ) : (
    <Card className="w-full md:w-1/2 max-h-96">
      {error ? (
        <div className="h-40 w-full grid place-items-center">
          No internet conection
        </div>
      ) : (
        <>
          <CardHeader className="flex flex-col items-start">
            <p className=" self-end text-sm font-bold">{`${
              currentQuizIndex + 1
            } of 10`}</p>
            <p className="text-sm">{currentQuestion}</p>
          </CardHeader>
          <CardBody
            className={`flex ${isLoading ? "justify-center items-center" : ""}`}
          >
            {isLoading ? (
              <Spinner />
            ) : (
              <form onSubmit={handleSubmit}>
                <RadioGroup onValueChange={handleChange} isRequired={true}>
                  {suffledOptions.map((opt) => {
                    return (
                      <Radio key={opt} value={opt}>
                        {opt}
                      </Radio>
                    );
                  })}
                </RadioGroup>
                <Button
                  type="submit"
                  color={currentQuizIndex === 9 ? "success" : "primary"}
                  className="mt-3"
                >
                  {currentQuizIndex === 9 ? "Submit" : "Next"}
                </Button>
              </form>
            )}
          </CardBody>
        </>
      )}
    </Card>
  );
}
