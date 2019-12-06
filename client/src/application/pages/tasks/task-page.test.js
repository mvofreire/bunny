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
import TaskPage from "./TasksPage";
import {
  getAllTasks,
  createTask,
  checkTaskDone,
  removeTask
} from "services/tasks.service";
import { getUserData } from "services/user.service";

jest.mock("services/tasks.service");
jest.mock("services/user.service");

describe("Task Page", () => {
  let history;
  const renderComponent = props => {
    return render(
      <Router history={history}>
        <TaskPage {...props} />
      </Router>
    );
  };
  const props = {
    match: {
      params: { user: 1 }
    }
  };

  const mockFunctions = () => {
    history = createMemoryHistory();
    history.goBack = jest.fn();

    getUserData.mockImplementation(() =>
      Promise.resolve({
        id: 1,
        name: "User Test"
      })
    );

    const tasks = [
      {
        id: 1,
        description: "task1",
        state: false
      },
      {
        id: 2,
        description: "task2",
        state: true
      }
    ];
    getAllTasks.mockImplementation(jest.fn(() => Promise.resolve(tasks)));

    cleanup();
  };
  beforeEach(mockFunctions);

  test("should run without crash", () => {
    const { container } = renderComponent(props);
    expect(container).toBeInTheDocument();
  });

  test("should render all tasks", async () => {
    const { getAllByTestId } = renderComponent(props);

    await waitForDomChange();

    expect(getAllTasks).toHaveBeenCalled();
    expect(getAllByTestId("task-item").length).toBe(2);
  });

  test("should show modal when click add task", async () => {
    const { container, getByTestId, getByText } = renderComponent(props);

    act(() => {
      fireEvent.click(getByTestId("btn-show-modal-create-task"));
    });

    const modal = await waitForElement(() => getByText(/Create new Task/), {
      container
    });
    expect(modal).toBeVisible();

    act(() => {
      fireEvent.click(getByText(/Cancel/));
    });

    const newInstanceModal = await waitForElement(
      () => getByText(/Create new Task/),
      {
        container
      }
    );
    expect(newInstanceModal).not.toBeVisible();
  });

  test("should call createTask when click Save Task", async () => {
    const request = jest.fn(() => Promise.resolve());
    createTask.mockImplementation(request);
    const { container, getByTestId, getByText } = renderComponent(props);

    act(() => {
      fireEvent.click(getByTestId("btn-show-modal-create-task"));
    });

    const modal = await waitForElement(() => getByText(/Create new Task/), {
      container
    });
    expect(modal).toBeVisible();

    act(() => {
      fireEvent.change(getByTestId("input-task-description"), {
        target: { value: "task description" }
      });
      fireEvent.click(getByText(/Save Task/));
    });

    expect(request).toHaveBeenCalled();
  });

  test("should run callback when click go back", async () => {
    const { container } = renderComponent(props);

    act(() => {
      fireEvent.click(container.querySelector(".anticon-arrow-left"));
    });

    await waitForDomChange();

    expect(history.goBack).toHaveBeenCalled();
  });

  test("should call service checkDone when click done", async () => {
    checkTaskDone.mockImplementation(jest.fn(() => Promise.resolve()));
    const { getAllByTestId } = renderComponent(props);

    await waitForDomChange();

    act(() => {
      fireEvent.click(getAllByTestId("btn-check-done")[0]);
    });

    expect(checkTaskDone).toHaveBeenCalled();
  });

  test("should show pop confirm when click delete", async () => {
    removeTask.mockImplementation(jest.fn(_ => Promise.resolve()));
    const { getByText, getAllByTestId } = renderComponent(props);

    await waitForDomChange();

    act(() => {
      fireEvent.click(getAllByTestId("btn-delete-task")[0]);
    });

    await waitForDomChange();

    act(() => {
      fireEvent.click(getByText(/Yes/));
    });

    expect(removeTask).toHaveBeenCalled();
  });
});
