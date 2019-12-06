import React from "react";
import { createMemoryHistory } from "history";
import { render, fireEvent, act, cleanup } from "@testing-library/react";
import { TasksContext, TasksContextProvider } from ".";

const renderComponent = children => {
  return render(
    <TasksContextProvider>
      <TasksContext.Consumer>{props => children(props)}</TasksContext.Consumer>
    </TasksContextProvider>
  );
};
describe("Components > Menu", () => {
  beforeEach(cleanup);

  test("should run without crash", () => {
    const { getByText, getByTestId } = renderComponent(
      ({ editTask, modalVisible, taskModel }) => (
        <div>
          <span>{modalVisible ? "modal visible" : "modal invisible"}</span>
          {taskModel.description && <span>{taskModel.description}</span>}
          <button
            data-testid="edit-task"
            onClick={editTask.bind(null, { description: "abc" })}
          >
            editTask
          </button>
        </div>
      )
    );

    expect(getByText(/modal invisible/)).toBeInTheDocument();

    act(() => {
      fireEvent.click(getByTestId("edit-task"));
    });

    expect(getByText(/abc/)).toBeInTheDocument();
    expect(getByText(/modal visible/)).toBeInTheDocument();
  });
});
