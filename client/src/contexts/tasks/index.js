import React, { PureComponent } from "react";
import {
  getAllTasks,
  createTask,
  updateTask,
  checkTaskDone,
  removeTask
} from "services/tasks.service";
import { getUserData } from "services/user.service";
import { message } from "antd";

const TasksContext = React.createContext();
class TasksContextProvider extends PureComponent {
  constructor(props) {
    super(props);

    this.user = props.user;
    this.state = {
      taskModel: {},
      modalVisible: false,

      tasks: [],
      userData: {}
    };
  }

  // #region Modal
  showModal = () => {
    this.setState({
      modalVisible: true
    });
  };

  hideModal = () => {
    this.setState({ modalVisible: false });
  };

  editTask = taskModel => {
    this.setState({ taskModel }, this.showModal);
  };

  //#endregion

  componentDidMount() {
    this.loadUserInformation();
    this.loadData();
  }

  loadUserInformation = async () => {
    const userData = await getUserData(this.user);
    this.setState({ userData });
  };

  loadData = async () => {
    const tasks = await getAllTasks(this.user);
    this.setState({ tasks });
  };

  createTask = async task => {
    try {
      await createTask(this.user, task);
      this.loadData();
    } catch (error) {
      message.error("Error on create new Task");
    }
  };

  updateTask = async task => {
    try {
      await updateTask(task);
      this.loadData();
    } catch (error) {
      message.error("Error on update Task");
    }
  };

  saveTask = task => {
    !!task.id ? this.updateTask(task) : this.createTask(task);
    this.hideModal();
  };

  checkDone = async id => {
    try {
      await checkTaskDone(id);
      this.loadData();
    } catch (error) {
      message.error("Error on update Task");
    }
  };

  deleteTask = async id => {
    try {
      await removeTask(id);
      this.loadData();
    } catch (error) {
      message.error("Error on remove Task");
    }
  };

  render() {
    const { children } = this.props;
    return (
      <TasksContext.Provider
        value={{
          ...this.state,

          showModal: this.showModal,
          hideModal: this.hideModal,

          saveTask: this.saveTask,
          editTask: this.editTask,
          checkDone: this.checkDone,
          deleteTask: this.deleteTask
        }}
      >
        {children}
      </TasksContext.Provider>
    );
  }
}

export { TasksContext, TasksContextProvider };
