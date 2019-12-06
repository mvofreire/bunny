import React, { PureComponent } from "react";
import {
  getAllUsers,
  updateUser,
  createUser,
  removeUser
} from "services/user.service";
import { message } from "antd";

const UserContext = React.createContext();
class UserContextProvider extends PureComponent {
  state = {
    userModel: {},
    modalVisible: false,
    data: []
  };

  componentDidMount() {
    this.loadData();
  }

  // #region Modal
  showModal = () => {
    this.setState({
      modalVisible: true
    });
  };

  hideModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  editUser = user => {
    this.setState({ userModel: user }, this.showModal);
  };
  //#endregion

  loadData = async () => {
    const data = await getAllUsers();
    this.setState({ data });
  };

  createUser = async user => {
    try {
      await createUser(user);
      this.loadData();
    } catch (error) {
      message.error("Error on create new User");
    }
  };

  updateUser = async user => {
    try {
      await updateUser(user);
      this.loadData();
    } catch (error) {
      message.error("Error on edit User");
    }
  };

  saveUser = async model => {
    !!model.id ? this.updateUser(model) : this.createUser(model);
    this.hideModal();
  };

  deleteUser = async id => {
    try {
      await removeUser(id);
      this.loadData();
    } catch (error) {
      message.error("Error on delte User");
    }
  };

  render() {
    const { children } = this.props;
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          showModal: this.showModal,
          hideModal: this.hideModal,

          saveUser: this.saveUser,
          editUser: this.editUser,
          deleteUser: this.deleteUser
        }}
      >
        {children}
      </UserContext.Provider>
    );
  }
}

export { UserContext, UserContextProvider };
