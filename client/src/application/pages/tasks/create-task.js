import React, { useState, useContext, useEffect } from "react";
import { TasksContext } from "contexts/tasks";
import { Button, Modal, Input } from "antd";

const CreateTask = () => {
  const {
    saveTask,
    modalVisible,
    showModal,
    hideModal,
    taskModel
  } = useContext(TasksContext);
  const [model, setModel] = useState({});

  useEffect(() => {
    setModel({
      ...model,
      ...taskModel
    });
  }, [modalVisible, taskModel]);

  const handleSave = () => {
    saveTask(model);
    setModel({});
    hideModal();
  };

  const handleCancel = () => {
    setModel({});
    hideModal();
  };

  const onModelChange = (name, value) => {
    setModel({
      ...model,
      [name]: value
    });
  };

  return (
    <>
      <Button
        data-testid="btn-show-modal-create-task"
        type="primary"
        onClick={showModal}
      >
        Create Task
      </Button>
      <Modal
        title="Create new Task"
        visible={modalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
        cancelText="Cancel"
        okText="Save Task"
      >
        <Input
          data-testid="input-task-description"
          placeholder="Task's Description"
          value={model.description}
          onChange={e => onModelChange("description", e.target.value)}
        />
      </Modal>
    </>
  );
};

export default CreateTask;
