"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  User,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Divider,
} from "@nextui-org/react";
import { AiOutlineMore } from "react-icons/ai";
import Link from "next/link";
import { deleteUser } from "../actions/user.actions";
import toast from "react-hot-toast";
const UsersTable = ({ users }) => {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>User</TableColumn>
        <TableColumn>Joined</TableColumn>
        <TableColumn>Last Signed In</TableColumn>
        <TableColumn>OS</TableColumn>
        <TableColumn></TableColumn>
      </TableHeader>
      <TableBody emptyContent="No users to display">
        {users.map((user, i) => {
          return (
            <TableRow key={i}>
              <TableCell>
                <User name={user.name} description={user.email} />
              </TableCell>
              <TableCell>{user.createdAt}</TableCell>
              <TableCell>{user.lastSignedIn || "Not signedIn"}</TableCell>
              <TableCell>{user.osInfo}</TableCell>
              <TableCell>
                <Popover placement="left-start">
                  <PopoverTrigger>
                    <Button isIconOnly variant="none" radius="full" size="lg">
                      <AiOutlineMore className=" font-extrabold text-xl" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="px-2 py-3 flex flex-col gap-y-2">
                    <Link href={`/user-profile/${user._id}`}>profile</Link>
                    <Divider />
                    <Button
                      color="danger"
                      onPress={async () => {
                        const deletedUser = await deleteUser(user._id);
                        if (!deletedUser) {
                          toast.error("user not deleted");
                        } else {
                          toast.success("user deleted successfully");
                        }
                      }}
                    >
                      Delete User
                    </Button>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
