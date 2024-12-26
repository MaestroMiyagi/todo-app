import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import React from "react";

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("renders the todo input", () => {
    expect(screen.getByTestId("todo-input")).toBeDefined();
  });

  it("adds a new todo", () => {
    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-todo-button");

    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(addButton);

    expect(screen.getByText("New Todo")).toBeDefined();
  });

  it("marks a todo as completed", () => {
    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-todo-button");

    fireEvent.change(input, { target: { value: "Test Todo" } });
    fireEvent.click(addButton);

    const toggleButton = screen.getByTestId("toggle-todo");
    fireEvent.click(toggleButton);

    expect(screen.getByText("Test Todo")).toHaveStyle(
      "text-decoration: line-through"
    );
  });

  it("deletes a todo", () => {
    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-todo-button");

    fireEvent.change(input, { target: { value: "Delete Me" } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByTestId("delete-todo");
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Delete Me")).toBeNull();
  });
});
