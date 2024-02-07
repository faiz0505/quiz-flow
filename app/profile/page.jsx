import { User } from "@nextui-org/user";
import React from "react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import Link from "next/link";
import { Chip } from "@nextui-org/chip";
import { Divider } from "@nextui-org/divider";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import RefreshBtn from "../components/refresh";
import DeleteBtn from "../components/delete-btn";
import LogoutBtn from "../components/logout";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Spinner } from "@nextui-org/spinner";
const fetchQuizes = async (url, user) => {
  try {
    const res = await fetch(`${url}/api/quiz`, {
      method: "GET",
      next: { revalidate: 10 },
    });

    const data = await res.json();

    const filteredData = data.filter((quiz) => quiz.user === user);

    return filteredData;
  } catch (error) {
    return null;
  }
};
const fetchCategories = async () => {
  try {
    const fetchCategories = await fetch(
      "https://opentdb.com/api_category.php",
      {
        next: { revalidate: 200 },
      }
    );
    const category = await fetchCategories.json();
    return category;
  } catch (error) {
    return null;
  }
};
const page = async () => {
  const url = process.env.URL;
  const session = await getServerSession(authOptions);
  let isLoading = true;
  const filteredData = await fetchQuizes(url, session.user.email);
  if (filteredData || filteredData.length > 0) {
    isLoading = false;
  }
  const category = await fetchCategories();
  return (
    <main className="px-2 flex justify-center">
      <Card className="w-full md:w-1/2 mt-5">
        <CardHeader>
          <User
            name={session.user.name}
            description={session.user.email}
            avatarProps={{
              showFallback: true,
            }}
            classNames={{ name: "font-bold" }}
          />
        </CardHeader>
        <Divider />
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
            ) : !filteredData || filteredData?.length > 0 ? (
              <ScrollShadow className="w-full md:h-60 h-96" hideScrollBar>
                <ul className=" shadow py-3 flex flex-col gap-y-3">
                  {filteredData.map((item) => {
                    return (
                      <li
                        key={item._id}
                        className="flex justify-between items-center border p-1 hover:bg-slate-200"
                      >
                        <Link
                          href={`review-quiz/${item._id}`}
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

                        <DeleteBtn id={item._id} />
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
        <CardFooter>
          <LogoutBtn />
        </CardFooter>
      </Card>
    </main>
  );
};

export default page;
