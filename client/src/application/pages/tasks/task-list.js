import React, { useContext } from "react";
import { TasksContext } from "contexts/tasks";
import { List, Button, Popconfirm } from "antd";

const TaskList = () => {
  const { tasks, deleteTask, checkDone, editTask } = useContext(TasksContext);

  return (
    <List
      itemLayout="horizontal"
      dataSource={tasks}
      renderItem={item => (
        <List.Item
          data-testid="task-item"
          actions={[
            <Button
              key="task-edit"
              type="link"
              size="small"
              data-testid="btn-edit-task"
              disabled={item.state}
              onClick={editTask.bind(null, item)}
            >
              edit
            </Button>,
            <Button
              key="task-complete"
              type="link"
              size="small"
              data-testid="btn-check-done"
              disabled={item.state}
              onClick={checkDone.bind(null, item.id)}
            >
              done
            </Button>,
            <Popconfirm
              key="delete-user"
              title="Are you sure delete this user?"
              onConfirm={deleteTask.bind(null, item.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button data-testid="btn-delete-task" type="link" size="small">
                delete
              </Button>
            </Popconfirm>
          ]}
        >
          <List.Item.Meta
            title={
              <span
                style={{
                  textDecoration: item.state ? "line-through" : ""
                }}
              >
                {item.description}
              </span>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default TaskList;
