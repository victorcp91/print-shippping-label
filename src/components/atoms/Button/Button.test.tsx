import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("Button Component", () => {
  it("renders with children text", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders primary variant by default", () => {
    render(<Button>Primary Button</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("Primary Button");
    expect(button.querySelector("svg")).not.toBeInTheDocument();
  });

  it("automatically includes download icon for download variant", () => {
    render(<Button variant="download">Download Label</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("Download Label");
    expect(button.querySelector("svg")).toBeInTheDocument();
  });

  it("automatically includes print icon for print variant", () => {
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
      <Button type="submit" data-testid="submit-btn">
        Submit
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveAttribute("data-testid", "submit-btn");
  });

  describe("variant behaviors", () => {
    it("primary variant shows only text content", () => {
      render(<Button variant="primary">Select</Button>);
      const button = screen.getByRole("button");

      expect(button).toHaveTextContent("Select");
      expect(button.children).toHaveLength(0);
    });

    it("download variant shows icon + text", () => {
      render(<Button variant="download">Download</Button>);
      const button = screen.getByRole("button");

      expect(button).toHaveTextContent("Download");
      expect(button.querySelector("svg")).toBeInTheDocument();
    });

    it("print variant shows icon + text", () => {
      render(<Button variant="print">Print</Button>);
      const button = screen.getByRole("button");

      expect(button).toHaveTextContent("Print");
      expect(button.querySelector("svg")).toBeInTheDocument();
    });
  });
});
