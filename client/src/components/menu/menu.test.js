import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import {
  render,
  waitForElement,
  waitForDomChange,
  fireEvent,
  act,
  cleanup
} from "@testing-library/react";
import { Menu } from ".";

const renderComponent = props => {
  const history = createMemoryHistory();
  return render(
    <Router history={history}>
      <Menu {...props} />
    </Router>
  );
};
describe("Components > Menu", () => {
  const props = {
    menus: [
      {
        key: "users",
        path: "/users",
        label: "Users"
      },
      {
        key: "task",
        path: "/task",
        label: "Task"
      }
    ]
  };

  beforeEach(cleanup);

  test("should run without crash", () => {
    const { container } = renderComponent(props);
    expect(container).toBeInTheDocument();
  });

  test("should render 2 itens", () => {
    const { getAllByTestId } = renderComponent(props);
    expect(getAllByTestId("menu-item").length).toBe(2);
  });

  test("should call callback when click item", () => {
    const onClickMenu = jest.fn();
    const { getByText } = renderComponent({
      ...props,
      onClickMenu
    });

    act(() => {
      fireEvent.click(getByText(/Task/));
    });

    expect(onClickMenu).toHaveBeenCalled();
  });
});
