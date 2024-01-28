"use client";
import React from "react";
import {
  Accordion,
  AccordionItem,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from "@nextui-org/react";
const page = () => {
  return (
    <main className="w-full flex justify-center pt-10 px-2 ">
      <Card className="w-full md:w-1/2">
        <CardHeader className="flex justify-center">
          <h1 className="font-bold text-xl">Frequently Asked Questions</h1>
        </CardHeader>
        <Divider />
        <CardBody>
          <Accordion>
            <AccordionItem
              key="1"
              aria-label="Accordion 1"
              title="Q: Is QuizFlow free to use?"
            >
              Yes, QuizFlow is entirely free to use. We believe in providing an
              accessible and enjoyable quiz experience for everyone. Dive into
              knowledge without any cost!
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="Accordion 2"
              title="Q: Can I view my quiz history and past scores?"
            >
              Absolutely! Your personalized dashboard on QuizFlow allows you to
              view your quiz history, including past quizzes and their scores.
              Track your progress and celebrate your achievements.
            </AccordionItem>
            <AccordionItem
              key="3"
              aria-label="Accordion 3"
              title="Q: Do I need to sign in or register to participate in quizzes on QuizFlow?"
            >
              Yes, to provide you with a personalized quiz experience, you are
              required to sign in or register on QuizFlow. Creating an account
              allows you to track your quiz history, view scores, and compete on
              the public leaderboard. Sign up to make the most of your quiz
              journey!
            </AccordionItem>
          </Accordion>
        </CardBody>
      </Card>
    </main>
  );
};

export default page;
