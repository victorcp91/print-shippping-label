import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from "./Select";

describe("Select Component", () => {
  const renderSelectWithOptions = () => {
    return render(
      <Select>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
    );
  };

  it("renders as select element", () => {
    renderSelectWithOptions();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("shows default placeholder", () => {
    renderSelectWithOptions();

    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });

  it("shows custom placeholder", () => {
    render(
      <Select placeholder="Choose a state">
        <option value="ca">California</option>
        <option value="ny">New York</option>
      </Select>
    );

    expect(screen.getByText("Choose a state")).toBeInTheDocument();
  });

  it("applies required attribute when required prop is true", () => {
    render(
      <Select required>
        <option value="test">Test</option>
      </Select>
    );
    const select = screen.getByRole("combobox");

    expect(select).toBeRequired();
    expect(select).toHaveAttribute("required");
  });

  it("does not apply required attribute when required prop is false", () => {
    render(
      <Select required={false}>
        <option value="test">Test</option>
      </Select>
    );
    const select = screen.getByRole("combobox");

    expect(select).not.toBeRequired();
  });

  it("handles user selection correctly", async () => {
    const user = userEvent.setup();
    renderSelectWithOptions();
    const select = screen.getByRole("combobox") as HTMLSelectElement;

    await user.selectOptions(select, "option2");
    expect(select.value).toBe("option2");
  });

  it("works as controlled select", () => {
    const handleChange = jest.fn();
    render(
      <Select value="option1" onChange={handleChange}>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </Select>
    );

    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("option1");

    fireEvent.change(select, { target: { value: "option2" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("respects disabled prop", () => {
    render(
      <Select disabled>
        <option value="test">Test</option>
      </Select>
    );

    const select = screen.getByRole("combobox");
    expect(select).toBeDisabled();
  });

  it("renders children options correctly", () => {
    renderSelectWithOptions();

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  it("respects required attribute", () => {
    render(
      <form>
        <Select required name="test-select">
          <option value="option1">Option 1</option>
        </Select>
        <button type="submit">Submit</button>
      </form>
    );

    const select = screen.getByRole("combobox");

    expect(select).toBeRequired();
  });

  it("passes through HTML attributes", () => {
    render(
      <Select name="state" data-testid="state-select">
        <option value="ca">California</option>
      </Select>
    );

    const select = screen.getByRole("combobox");
    expect(select).toHaveAttribute("name", "state");
    expect(select).toHaveAttribute("data-testid", "state-select");
  });

  it("placeholder option is disabled by default", () => {
    renderSelectWithOptions();
    const select = screen.getByRole("combobox");

    const placeholderOption = select.querySelector('option[value=""]');
    expect(placeholderOption).toHaveAttribute("disabled");
  });

  it("can receive focus", () => {
    renderSelectWithOptions();
    const select = screen.getByRole("combobox");

    select.focus();
    expect(select).toHaveFocus();
  });

  it("works with multiple options", async () => {
    const user = userEvent.setup();
    render(
      <Select>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="mx">Mexico</option>
        <option value="br">Brazil</option>
      </Select>
    );

    const select = screen.getByRole("combobox") as HTMLSelectElement;

    await user.selectOptions(select, "br");
    expect(select.value).toBe("br");

    await user.selectOptions(select, "ca");
    expect(select.value).toBe("ca");
  });
});
