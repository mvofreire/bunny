import React from "react";
import { TasksContextProvider } from "contexts/tasks";

import UserDetail from "./user-detail";
import TaskList from "./task-list";

const TasksPage = ({ match }) => {
  const { user } = match.params;

  return (
    <TasksContextProvider user={user}>
      <UserDetail />
      <TaskList />
    </TasksContextProvider>
  );
};

export default TasksPage;
