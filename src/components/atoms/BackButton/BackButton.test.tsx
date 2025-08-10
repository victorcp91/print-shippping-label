import { render, screen, fireEvent } from "@testing-library/react";
import BackButton from "./BackButton";

describe("BackButton Component", () => {
  it("renders with default text", () => {
    render(<BackButton />);
    expect(screen.getByText("Back")).toBeInTheDocument();
  });

  it("renders with custom children", () => {
    render(<BackButton>Go Back</BackButton>);
    expect(screen.getByText("Go Back")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<BackButton onClick={handleClick} />);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders the back arrow icon", () => {
    render(<BackButton />);
    const svg = screen.getByRole("button").querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("renders as a button element", () => {
    render(<BackButton />);
    const button = screen.getByRole("button");
    expect(button.tagName).toBe("BUTTON");
  });

  it("can be disabled", () => {
    render(<BackButton disabled />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("passes through additional props", () => {
    render(<BackButton data-testid="back-btn" aria-label="Go back" />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-testid", "back-btn");
    expect(button).toHaveAttribute("aria-label", "Go back");
  });
});
