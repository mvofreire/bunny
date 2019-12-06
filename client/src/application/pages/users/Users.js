import React from "react";
import { UserContextProvider } from "contexts/user";
import { PageHeader } from "antd";

import CreateUser from "./create-user";
import UserList from "./user-list";

const UsersPage = () => (
  <UserContextProvider>
    <PageHeader
      style={{
        border: "1px solid rgb(235, 237, 240)"
      }}
      title="Users"
      extra={[<CreateUser key="create-new-user" />]}
    />
    <UserList />
  </UserContextProvider>
);

export default UsersPage;
