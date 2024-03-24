import { fetchQuizzessByUser } from "@/app/actions/quiz.actions";
import { fetchUserById } from "@/app/actions/user.actions";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { User } from "@nextui-org/user";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import React from "react";
import Link from "next/link";
import { fetchCategories } from "@/app/actions/triviaApi.actons";
import RefreshBtn from "@/app/components/refresh";
const page = async ({ params }) => {
  const user = await fetchUserById(params.id);
  const quizes = await fetchQuizzessByUser(params.id);
  let isLoading = true;
  const category = await fetchCategories();
  if (quizes || quizes.length > 0) {
    isLoading = false;
  }
  return (
    <main className="w-full px-2 md:px-12 lg:px-28">
      <Card className="my-5">
        <CardHeader className="flex-col items-start gap-y-3">
          <User name={user.name} description={user.email} />
          <div>
            <p className="text-sm">
              Location : <span className="font-bold">{user.location}</span>
            </p>
            <p className="text-sm">
              Operating System :{" "}
              <span className="font-bold">{user.osInfo}</span>
            </p>
            <p className="text-sm">
              Joined : <span className="font-bold">{user.createdAt}</span>
            </p>
            <p className="text-sm">
              Last signed In :
              <span className="font-bold">{user.lastSignedIn}</span>
            </p>
            <p className="text-sm">
              Total Plays : <span className="font-bold">{quizes.length}</span>
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-extrabold text-sky-950 underline">
              History
            </h1>
            <RefreshBtn />
          </div>
          <div>
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <Spinner />
              </div>
            ) : !quizes || quizes?.length > 0 ? (
              <ScrollShadow className="w-full md:h-60 h-96" hideScrollBar>
                <ul className=" shadow py-3 flex flex-col gap-y-3">
                  {quizes.map((item) => {
                    return (
                      <li
                        key={item._id}
                        className="flex justify-between items-center border p-1 hover:bg-slate-200"
                      >
                        <Link
                          href={`/review-quiz/${item._id}`}
                          className="w-full"
                        >
                          {
                            category.trivia_categories.find(
                              (c) => c.id == item.category
                            ).name
                          }
                          <Chip color="secondary" size="sm" className="ml-3">
                            {item.difficulty}
                          </Chip>
                          <h1>
                            <span className="font-bold">{item.points}</span>/10
                          </h1>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </ScrollShadow>
            ) : (
              <div className="text-black text-xl font-extralight">No Data!</div>
            )}
          </div>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    </main>
  );
};

export default page;
