import { Card, CardBody, CardHeader } from "@nextui-org/card";

import React from "react";
import UsersTable from "../components/UsersTable";
import { getAllUser } from "../actions/user.actions";

const page = async () => {
  const users = await getAllUser();
  const admin = process.env.MY_EMAIL;
  return (
    <main className="w-full px-2 md:px-12 lg:px-28">
      <Card className="mt-5">
        <CardHeader className="justify-center">
          <h1>Admin Dashboard</h1>
        </CardHeader>
        <CardBody className="h-[70vh] scrollbar-hide">
          <UsersTable users={users} admin={admin} />
        </CardBody>
      </Card>
    </main>
  );
};

export default page;
