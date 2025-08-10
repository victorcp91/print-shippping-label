import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormField from "./FormField";

describe("FormField Component", () => {
  const defaultProps = {
    label: "Test Label",
    name: "testField",
    id: "testField",
  };

  it("renders with label", () => {
    render(<FormField {...defaultProps} />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("renders required label when required is true", () => {
    render(<FormField {...defaultProps} required />);
    const label = screen.getByText("Test Label");
    expect(label).toBeInTheDocument();
    // The Label component should handle the required indicator
  });

  it("renders input with correct attributes", () => {
    render(<FormField {...defaultProps} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("name", "testField");
    expect(input).toHaveAttribute("id", "testField");
  });

  it("applies error styling when error is present", () => {
    render(<FormField {...defaultProps} error="This field is required" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("displays error message when error is present", () => {
    const errorMessage = "This field is required";
    render(<FormField {...defaultProps} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toHaveAttribute("role", "alert");
  });

  it("associates error message with input via aria-describedby", () => {
    render(<FormField {...defaultProps} error="Error message" />);
    const input = screen.getByRole("textbox");
    const errorElement = screen.getByText("Error message");

    expect(input).toHaveAttribute("aria-describedby", "testField-error");
    expect(errorElement).toHaveAttribute("id", "testField-error");
  });

  it("handles onChange event", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<FormField {...defaultProps} onChange={handleChange} />);
    const input = screen.getByRole("textbox");

    await user.type(input, "test");
    expect(handleChange).toHaveBeenCalled();
  });

  it("handles onBlur event", async () => {
    const user = userEvent.setup();
    const handleBlur = jest.fn();

    render(<FormField {...defaultProps} onBlur={handleBlur} />);
    const input = screen.getByRole("textbox");

    await user.click(input);
    await user.tab();
    expect(handleBlur).toHaveBeenCalled();
  });

  it("passes through additional input props", () => {
    render(
      <FormField
        {...defaultProps}
        placeholder="Enter text"
        type="email"
        disabled
      />
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("placeholder", "Enter text");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toBeDisabled();
  });

  it("uses name as id when id is not provided", () => {
    render(<FormField label="Test" name="testField" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("id", "testField");
  });

  it("handles empty error gracefully", () => {
    render(<FormField {...defaultProps} error="" />);
    const input = screen.getByRole("textbox");
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(input).not.toHaveAttribute("aria-describedby");
  });

  it("maintains proper form structure", () => {
    render(<FormField {...defaultProps} />);
    const fieldset = screen.getByRole("textbox").closest("div");
    expect(fieldset).toBeInTheDocument();
  });
});
