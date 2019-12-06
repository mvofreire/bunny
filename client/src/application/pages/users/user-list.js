import React, { useContext } from "react";
import { UserContext } from "contexts/user";
import { Link } from "react-router-dom";
import { List, Avatar, Popconfirm, Button } from "antd";

const UserList = () => {
  const { data, deleteUser, editUser } = useContext(UserContext);

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={item => (
        <List.Item
          data-testid="user-item"
          actions={[
            <Link to={`/user-tasks/${item.id}`} key="view-tasks">
              tasks
            </Link>,
            <Button
              type="link"
              size="small"
              key="view-edit"
              onClick={editUser.bind(null, item)}
            >
              edit
            </Button>,
            <Popconfirm
              key="delete-user"
              title="Are you sure delete this user?"
              onConfirm={deleteUser.bind(null, item.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" size="small">
                delete
              </Button>
            </Popconfirm>
          ]}
        >
          <List.Item.Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={item.name}
          />
        </List.Item>
      )}
    />
  );
};
export default UserList;
