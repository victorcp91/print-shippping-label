import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  it("renders with children text", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
  });

  it("handles click events when enabled", () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} isDirty={true} isValid={true}>
        Click me
      </Button>
    );

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders primary variant by default", () => {
    render(<Button>Primary Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Primary Button");
  });

  it("includes icon for print variant", () => {
    render(<Button variant="print">Print Label</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Print Label");
    expect(button.querySelector("svg")).toBeInTheDocument();
  });

  it("respects disabled prop", () => {
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled Button
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("passes through HTML attributes", () => {
    render(
      <Button type="submit" data-testid="submit-btn" aria-label="Submit form">
        Submit
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveAttribute("data-testid", "submit-btn");
    expect(button).toHaveAttribute("aria-label", "Submit form");
  });

  describe("icon placement", () => {
    it("places icon after text in primary variant", () => {
      render(<Button variant="primary">Continue</Button>);
      const button = screen.getByRole("button");
      const children = Array.from(button.childNodes);

      expect(children[0].textContent).toBe("Continue");
      expect(children[1].nodeName).toBe("svg");
    });

    it("places icon before text in print variant", () => {
      render(<Button variant="print">Print</Button>);
      const button = screen.getByRole("button");
      const children = Array.from(button.childNodes);

      expect(children[0].nodeName).toBe("svg");
      expect(children[1].textContent).toBe("Print");
    });
  });
});
