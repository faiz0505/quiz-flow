import { fetchALlQuiz } from "@/app/actions/quiz.actions";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Radio, RadioGroup } from "@nextui-org/radio";
import { Spinner } from "@nextui-org/spinner";
import React from "react";

const page = async ({ params }) => {
  const result = await fetchALlQuiz();
  const filterdQuiz = result.find((quiz) => quiz._id === params.id);
  const quizes = Object.values(filterdQuiz.quiz);

  return !quizes ? (
    <Spinner />
  ) : (
    <main className="h-screen w-full overflow-scroll pt-12 md:pb-28 pb-44 grid grid-cols-1 md:grid-cols-2 gap-3 px-2 md:px-10 lg:px-20">
      {quizes.map((quiz, i) => {
        return (
          <Card key={i} className="w-full md:h-64 h-72 overflow-hidden">
            <CardHeader>
              <p>{quiz.question}</p>
            </CardHeader>
            <CardBody className="overflow-hidden">
              <RadioGroup defaultValue={quiz.selectedOption} isDisabled>
                {quiz.options.map((option) => {
                  return (
                    <Radio
                      key={option}
                      value={option}
                      color={
                        quiz.correctAnswer === quiz.selectedOption
                          ? "primary"
                          : "danger"
                      }
                    >
                      {option}
                    </Radio>
                  );
                })}
              </RadioGroup>
            </CardBody>
            <CardFooter>
              <p className="font-bold text-sm text-green-800">{`Correct Answer : ${quiz.correctAnswer}`}</p>
            </CardFooter>
          </Card>
        );
      })}
    </main>
  );
};

export default page;
