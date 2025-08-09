import { render, screen } from "@testing-library/react";
import Badge from "./Badge";

describe("Badge Component", () => {
  it("renders with children content", () => {
    render(<Badge>1</Badge>);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("renders as div container", () => {
    render(<Badge>Step 1</Badge>);
    const badge = screen.getByText("Step 1").closest("div");

    expect(badge).toBeInTheDocument();
    expect(badge?.tagName).toBe("DIV");
  });

  describe("step indicator functionality", () => {
    it("handles numeric step indicators", () => {
      const steps = ["1", "2", "3", "4", "5"];

      steps.forEach((step) => {
        const { unmount } = render(<Badge>{step}</Badge>);
        expect(screen.getByText(step)).toBeInTheDocument();
        unmount();
      });
    });

    it("handles text content", () => {
      render(<Badge>Step 1</Badge>);
      expect(screen.getByText("Step 1")).toBeInTheDocument();
    });

    it("handles single character content", () => {
      render(<Badge>A</Badge>);
      expect(screen.getByText("A")).toBeInTheDocument();
    });
  });

  describe("content variations", () => {
    it("handles empty content", () => {
      const { container } = render(<Badge></Badge>);
      const badge = container.querySelector("div");
      expect(badge).toBeInTheDocument();
    });

    it("handles React node children", () => {
      render(
        <Badge>
          <span>1</span>
        </Badge>
      );

      expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("handles multi-character content", () => {
      render(<Badge>10</Badge>);
      expect(screen.getByText("10")).toBeInTheDocument();
    });
  });

  it("maintains circular badge structure", () => {
    render(<Badge>2</Badge>);
    const badge = screen.getByText("2").closest("div");
    const textSpan = badge?.querySelector("span");

    expect(badge).toBeInTheDocument();
    expect(textSpan).toBeInTheDocument();
    expect(textSpan).toHaveTextContent("2");
  });

  it("works in step navigation context", () => {
    render(
      <div>
        <Badge>1</Badge>
        <span>Shipment Details</span>
        <Badge>2</Badge>
        <span>Select Rate</span>
        <Badge>3</Badge>
        <span>Print Label</span>
      </div>
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("Shipment Details")).toBeInTheDocument();
    expect(screen.getByText("Select Rate")).toBeInTheDocument();
    expect(screen.getByText("Print Label")).toBeInTheDocument();
  });

  it("renders consistently across different content", () => {
    const contents = ["1", "2", "A", "B", "✓"];

    contents.forEach((content) => {
      const { unmount } = render(<Badge>{content}</Badge>);
      const badge = screen.getByText(content).closest("div");
      const textSpan = badge?.querySelector("span");

      expect(badge).toBeInTheDocument();
      expect(textSpan).toBeInTheDocument();
      expect(textSpan).toHaveTextContent(content);

      unmount();
    });
  });

  it("maintains accessibility for step indicators", () => {
    render(<Badge>1</Badge>);
    const badge = screen.getByText("1");

    expect(badge).toBeVisible();
    expect(badge).toHaveTextContent("1");
  });

  it("handles both numeric and text step indicators", () => {
    const { rerender } = render(<Badge>1</Badge>);
    expect(screen.getByText("1")).toBeInTheDocument();

    rerender(<Badge>Step 1</Badge>);
    expect(screen.getByText("Step 1")).toBeInTheDocument();

    rerender(<Badge>Current</Badge>);
    expect(screen.getByText("Current")).toBeInTheDocument();
  });

  it("works with different content sizes", () => {
    const shortContent = "1";
    const mediumContent = "10";
    const longContent = "Step";

    [shortContent, mediumContent, longContent].forEach((content) => {
      const { unmount } = render(<Badge>{content}</Badge>);
      const badge = screen.getByText(content);

      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent(content);

      unmount();
    });
  });
});
