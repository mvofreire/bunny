import React from "react";
import { render } from "@testing-library/react";
import App from ".";

describe("Application", () => {
  test("should run without crash", () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  test("should have 'Create User'", () => {
    const { getByText } = render(<App />);
    expect(getByText(/Create User/)).toBeInTheDocument();
  });

  test("should have powered '©Bunny Studio Test 2019'", () => {
    const { getByText } = render(<App />);
    expect(getByText(/©Bunny Studio Test 2019/)).toBeInTheDocument();
  });
});
