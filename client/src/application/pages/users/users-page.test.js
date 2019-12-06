import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  render,
  waitForElement,
  waitForDomChange,
  fireEvent,
  act,
  cleanup
} from "@testing-library/react";
import UserPage from "./Users";
import { getAllUsers, createUser } from "services/user.service";

jest.mock("services/user.service");

const renderComponent = () => {
  return render(
    <Router>
      <UserPage />
    </Router>
  );
};
describe("Users Page", () => {
  beforeEach(cleanup);
  test("should run without crash", () => {
    const { container } = render(<UserPage />);
    expect(container).toBeInTheDocument();
  });

  test("should have 3 users", async () => {
    const users = [
      {
        id: 1,
        name: "user 1"
      },
      {
        id: 2,
        name: "user 2"
      },
      {
        id: 3,
        name: "user 3"
      }
    ];
    const request = jest.fn(_ => Promise.resolve(users));
    getAllUsers.mockImplementation(request);

    const { container, getAllByTestId } = renderComponent();

    await waitForDomChange({ container });

    expect(request).toHaveBeenCalled();
    expect(getAllByTestId("user-item").length).toBe(users.length);
  });

  test("should show modal when click add user", async () => {
    const { container, getByTestId, getByText } = renderComponent();

    act(() => {
      fireEvent.click(getByTestId("btn-show-modal-create-user"));
    });

    const modal = await waitForElement(() => getByText(/Create new User/), {
      container
    });
    expect(modal).toBeVisible();
  });

  test("should create user when click 'Save User'", async () => {
    const request = jest.fn(() => Promise.resolve());
    createUser.mockImplementation(request);
    const { container, getByTestId, getByText } = renderComponent();
    const username = "username 3";

    act(() => {
      fireEvent.click(getByTestId("btn-show-modal-create-user"));
    });

    const modal = await waitForElement(() => getByText(/Create new User/), {
      container
    });
    expect(modal).toBeVisible();

    act(() => {
      fireEvent.change(getByTestId("input-user-name"), {
        target: { value: username }
      });
      fireEvent.click(getByText(/Save User/));
    });

    expect(request).toHaveBeenCalled();
  });

  test("should hide modal when click 'Cancel'", async () => {
    const { container, getByTestId, getByText } = renderComponent();

    act(() => {
      fireEvent.click(getByTestId("btn-show-modal-create-user"));
    });

    const modal = await waitForElement(() => getByText(/Create new User/), {
      container
    });
    expect(modal).toBeVisible();

    act(() => {
      fireEvent.click(getByText(/Cancel/));
    });

    const newInstanceModal = await waitForElement(
      () => getByText(/Create new User/),
      {
        container
      }
    );

    expect(newInstanceModal).not.toBeVisible();
  });
});
