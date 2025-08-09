import { render, screen } from "@testing-library/react";
import Label from "./Label";

describe("Label Component", () => {
  it("renders with children text", () => {
    render(<Label>Full Name</Label>);
    expect(screen.getByText("Full Name")).toBeInTheDocument();
  });

  it("renders as label element", () => {
    render(<Label>Test Label</Label>);
    const labelElement = screen.getByText("Test Label");

    expect(labelElement.tagName).toBe("LABEL");
  });

  it("does not show required indicator by default", () => {
    render(<Label>Optional Field</Label>);

    expect(screen.getByText("Optional Field")).toBeInTheDocument();
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("shows required indicator when required prop is true", () => {
    render(<Label required>Required Field</Label>);

    expect(screen.getByText("Required Field")).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("does not show required indicator when required prop is false", () => {
    render(<Label required={false}>Not Required Field</Label>);

    expect(screen.getByText("Not Required Field")).toBeInTheDocument();
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("passes through HTML attributes", () => {
    const { container } = render(
      <Label htmlFor="input-id" data-testid="test-label">
        Label Text
      </Label>
    );

    const label = container.querySelector("label");
    expect(label).toHaveAttribute("for", "input-id");
    expect(label).toHaveAttribute("data-testid", "test-label");
  });

  it("required indicator has proper accessibility label", () => {
    render(<Label required>Required Field</Label>);

    const requiredIndicator = screen.getByLabelText("required");
    expect(requiredIndicator).toBeInTheDocument();
    expect(requiredIndicator).toHaveTextContent("*");
  });

  it("can be associated with input element", () => {
    const { container } = render(
      <div>
        <Label htmlFor="email-input">Email Address</Label>
        <input id="email-input" type="email" />
      </div>
    );

    const label = container.querySelector("label");
    const input = container.querySelector("input");

    expect(label).toHaveAttribute("for", "email-input");
    expect(input).toHaveAttribute("id", "email-input");
  });

  describe("content variations", () => {
    it("handles simple text content", () => {
      render(<Label>Simple Text</Label>);
      expect(screen.getByText("Simple Text")).toBeInTheDocument();
    });

    it("handles React node children", () => {
      render(
        <Label>
          <span>Complex</span> Label Content
        </Label>
      );

      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("Label Content")).toBeInTheDocument();
    });

    it("handles empty content", () => {
      const { container } = render(<Label></Label>);
      const label = container.querySelector("label");
      expect(label).toBeInTheDocument();
      expect(label?.tagName).toBe("LABEL");
    });
  });

  it("required indicator appears after label text", () => {
    render(<Label required>Field Name</Label>);

    const label = screen.getByText("Field Name").closest("label")!;
    const textContent = label.textContent;

    expect(textContent).toBe("Field Name*");
  });

  it("works with multiple labels", () => {
    render(
      <div>
        <Label required>Required Field</Label>
        <Label>Optional Field</Label>
        <Label required>Another Required</Label>
      </div>
    );

    expect(screen.getByText("Required Field")).toBeInTheDocument();
    expect(screen.getByText("Optional Field")).toBeInTheDocument();
    expect(screen.getByText("Another Required")).toBeInTheDocument();

    const asterisks = screen.getAllByText("*");
    expect(asterisks).toHaveLength(2);
  });

  it("maintains proper label semantics", () => {
    const { container } = render(
      <div>
        <Label htmlFor="name-input" required>
          Full Name
        </Label>
        <input id="name-input" type="text" />
      </div>
    );

    const input = container.querySelector("input");
    const label = container.querySelector("label");

    expect(input).toHaveAttribute("id", "name-input");
    expect(label).toHaveAttribute("for", "name-input");
  });
});
