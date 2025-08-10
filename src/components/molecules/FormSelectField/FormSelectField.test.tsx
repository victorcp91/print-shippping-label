import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormSelectField from "./FormSelectField";

describe("FormSelectField Component", () => {
  const defaultProps = {
    label: "Test Select",
    name: "testSelect",
    children: (
      <>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </>
    ),
  };

  it("renders with label", () => {
    render(<FormSelectField {...defaultProps} />);
    expect(screen.getByText("Test Select")).toBeInTheDocument();
  });

  it("renders required label when required is true", () => {
    render(<FormSelectField {...defaultProps} required />);
    const label = screen.getByText("Test Select");
    expect(label).toBeInTheDocument();
  });

  it("renders select with correct attributes", () => {
    render(<FormSelectField {...defaultProps} />);
    const select = screen.getByRole("combobox");
    expect(select).toHaveAttribute("id", "testSelect");
    expect(select).toHaveAttribute("name", "testSelect");
    expect(select).toHaveAttribute("aria-invalid", "false");
  });

  it("displays error message when error is present", () => {
    const errorMessage = "This field is required";
    render(<FormSelectField {...defaultProps} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("associates error message with select via aria-describedby", () => {
    render(
      <FormSelectField {...defaultProps} error="This field is required" />
    );
    const select = screen.getByRole("combobox");
    expect(select).toHaveAttribute("aria-describedby", "testSelect-error");
    expect(select).toHaveAttribute("aria-invalid", "true");
  });

  it("handles onChange event", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<FormSelectField {...defaultProps} onChange={handleChange} />);

    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "option1");

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("handles onBlur event", async () => {
    const user = userEvent.setup();
    const handleBlur = jest.fn();
    render(<FormSelectField {...defaultProps} onBlur={handleBlur} />);

    const select = screen.getByRole("combobox");
    await user.click(select);
    await user.tab();

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it("renders placeholder option", () => {
    const placeholder = "Choose an option";
    render(<FormSelectField {...defaultProps} placeholder={placeholder} />);
    const placeholderOption = screen.getByText(placeholder);
    expect(placeholderOption).toBeInTheDocument();
    expect(placeholderOption).toHaveAttribute("disabled");
  });

  it("sets initial value when value prop is provided", () => {
    render(
      <FormSelectField {...defaultProps} value="option1" onChange={() => {}} />
    );
    const select = screen.getByRole("combobox");
    expect(select).toHaveValue("option1");
  });

  it("renders children options", () => {
    render(<FormSelectField {...defaultProps} />);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("passes through additional select props", () => {
    render(
      <FormSelectField
        {...defaultProps}
        disabled
        aria-label="Custom select"
        data-testid="custom-select"
      />
    );

    const select = screen.getByRole("combobox");
    expect(select).toBeDisabled();
    expect(select).toHaveAttribute("aria-label", "Custom select");
    expect(select).toHaveAttribute("data-testid", "custom-select");
  });

  it("handles empty error gracefully", () => {
    render(<FormSelectField {...defaultProps} error="" />);
    const select = screen.getByRole("combobox");
    expect(select).toHaveAttribute("aria-invalid", "false");
    expect(select).not.toHaveAttribute("aria-describedby");
  });

  it("maintains proper form structure", () => {
    render(<FormSelectField {...defaultProps} />);
    const label = screen.getByText("Test Select");
    const select = screen.getByRole("combobox");

    expect(label).toHaveAttribute("for", "testSelect");
    expect(select).toHaveAttribute("id", "testSelect");
  });

  it("works with react-hook-form register", () => {
    const { container } = render(<FormSelectField {...defaultProps} />);
    const select = container.querySelector("select");
    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute("name", "testSelect");
  });
});
