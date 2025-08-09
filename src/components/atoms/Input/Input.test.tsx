import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "./Input";

describe("Input Component", () => {
  it("renders as input element", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("applies required attribute when required prop is true", () => {
    render(<Input required />);
    const input = screen.getByRole("textbox");

    expect(input).toBeRequired();
    expect(input).toHaveAttribute("required");
  });

  it("does not apply required attribute when required prop is false", () => {
    render(<Input required={false} />);
    const input = screen.getByRole("textbox");

    expect(input).not.toBeRequired();
  });

  it("handles user input correctly", async () => {
    const user = userEvent.setup();
    render(<Input />);
    const input = screen.getByRole("textbox") as HTMLInputElement;

    await user.type(input, "Hello World");
    expect(input.value).toBe("Hello World");
  });

  it("works as controlled input", () => {
    const handleChange = jest.fn();
    render(<Input value="Test Value" onChange={handleChange} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;

    expect(input.value).toBe("Test Value");

    fireEvent.change(input, { target: { value: "New Value" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("displays placeholder text", () => {
    render(<Input placeholder="Enter your name" />);
    const input = screen.getByPlaceholderText("Enter your name");

    expect(input).toBeInTheDocument();
  });

  it("respects disabled prop", () => {
    render(<Input disabled />);
    const input = screen.getByRole("textbox");

    expect(input).toBeDisabled();
  });

  it("participates in form validation when required", async () => {
    render(
      <form>
        <Input required name="test-input" />
        <button type="submit">Submit</button>
      </form>
    );

    const input = screen.getByRole("textbox");
    const form = input.closest("form")!;

    expect(form.checkValidity()).toBe(false);
    expect(input.validity.valid).toBe(false);
  });

  it("passes through HTML attributes", () => {
    render(
      <Input
        type="email"
        name="email"
        data-testid="email-input"
        maxLength={50}
      />
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("name", "email");
    expect(input).toHaveAttribute("data-testid", "email-input");
    expect(input).toHaveAttribute("maxLength", "50");
  });

  it("can receive focus", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");

    input.focus();
    expect(input).toHaveFocus();
  });

  it("works with different input types", () => {
    const { container, rerender } = render(<Input type="text" />);

    let input = container.querySelector("input");
    expect(input).toHaveAttribute("type", "text");

    rerender(<Input type="email" />);
    input = container.querySelector("input");
    expect(input).toHaveAttribute("type", "email");

    rerender(<Input type="password" />);
    input = container.querySelector("input");
    expect(input).toHaveAttribute("type", "password");
  });
});
