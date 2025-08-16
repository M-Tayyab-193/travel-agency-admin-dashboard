import { Header } from "../../../components";
import React from "react";
import { cn } from "~/lib/utils";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-grids";
import { users } from "../../constants";
import { getAllUsers } from "~/appwrite/auth";
import type { Route } from "./+types/Users";
import { formatDate } from "~/lib/utils";

export const loader = async () => {
  const { users, total } = await getAllUsers(10, 0);
  return { users, total };
};

const Users = ({ loaderData }: Route.ComponentProps) => {
  const { users } = loaderData;
  return (
    <main className="all-users wrapper">
      <Header
        title="Manage Users"
        description="Filter, sort and access detailed user profiles"
      />
      <GridComponent dataSource={users} gridLines="None">
        <ColumnsDirective>
          <ColumnDirective
            field="name"
            headerText="Name"
            width="200"
            textAlign="Left"
            template={(props: UserData) => (
              <div className="flex items-center gap-1.5 px-4 ">
                <img
                  src={props.imageUrl}
                  alt="user"
                  className="rounded-full size-8 aspect-square"
                />
                <span>{props.name}</span>
              </div>
            )}
          />
          <ColumnDirective
            field="email"
            headerText="Email"
            width="200"
            textAlign="Left"
          />
          <ColumnDirective
            field="joinedAt"
            headerText="Date Joined"
            width="120"
            textAlign="Left"
            template={({ joinedAt }: { joinedAt: string }) =>
              formatDate(joinedAt)
            }
          />

          <ColumnDirective
            field="status"
            headerText="Type"
            width="120"
            textAlign="Left"
            template={({ status }: UserData) => (
              <article
                className={cn(
                  "status-column",
                  status === "user" ? "bg-success-50" : "bg-red-100/20"
                )}
              >
                <div
                  className={cn(
                    "size-1.5 rounded-full ",
                    status === "user" ? "bg-success-500" : "bg-red-500"
                  )}
                />
                <h3
                  className={cn(
                    "ml-[1px] font-inter text-sm font-medium",
                    status === "user" ? "text-success-700" : "text-red-500"
                  )}
                >
                  {status}
                </h3>
              </article>
            )}
          />
        </ColumnsDirective>
      </GridComponent>
    </main>
  );
};

export default Users;
