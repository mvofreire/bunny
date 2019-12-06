import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "contexts/user";
import { Button, Modal, Input } from "antd";

const CreateUser = () => {
  const {
    saveUser,
    modalVisible,
    showModal,
    hideModal,
    userModel
  } = useContext(UserContext);
  const [model, setModel] = useState({});

  useEffect(() => {
    setModel({
      ...model,
      ...userModel
    });
  }, [modalVisible, userModel]);

  const handleSave = () => {
    saveUser(model);
    setModel({});
  };

  const handleCancel = () => {
    setModel({});
    hideModal();
  };

  const changeModel = (name, value) => {
    setModel({
      ...model,
      [name]: value
    });
  };

  return (
    <>
      <Button
        data-testid="btn-show-modal-create-user"
        type="primary"
        onClick={showModal}
      >
        Create User
      </Button>
      <Modal
        title="Create new User"
        visible={modalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
        okText="Save User"
        cancelText="Cancel"
      >
        <Input
          data-testid="input-user-name"
          placeholder="User Name"
          value={model.name}
          onChange={e => changeModel("name", e.target.value)}
        />
      </Modal>
    </>
  );
};

export default CreateUser;
