import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { TasksContext } from "contexts/tasks";
import { PageHeader } from "antd";

import CreateTask from "./create-task";

const UserDetail = ({ history }) => {
  const { userData } = useContext(TasksContext);

  return (
    <PageHeader
      style={{
        border: "1px solid rgb(235, 237, 240)"
      }}
      onBack={history.goBack}
      title={`Tasks of ${userData.name}`}
      extra={[<CreateTask key="create-new-task" />]}
    />
  );
};

export default withRouter(UserDetail);
