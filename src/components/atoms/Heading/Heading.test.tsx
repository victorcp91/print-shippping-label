import { render, screen } from "@testing-library/react";
import Heading from "./Heading";

describe("Heading Component", () => {
  it("renders with children text", () => {
    render(<Heading>ShipLabel</Heading>);
    expect(screen.getByText("ShipLabel")).toBeInTheDocument();
  });

  it("renders as h1 element by default", () => {
    render(<Heading>Test Heading</Heading>);
    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H1");
  });

  it("has proper heading semantics", () => {
    render(<Heading>Main Title</Heading>);
    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toHaveTextContent("Main Title");
  });

  describe("variant variations", () => {
    it("renders default variant as h1", () => {
      render(<Heading variant="default">Default Heading</Heading>);
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading.tagName).toBe("H1");
    });

    it("renders section variant as h2", () => {
      render(<Heading variant="section">Section Heading</Heading>);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading.tagName).toBe("H2");
    });

    it("renders subsection variant as h3", () => {
      render(<Heading variant="subsection">Subsection Heading</Heading>);
      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading.tagName).toBe("H3");
    });

    it("renders small variant as h4", () => {
      render(<Heading variant="small">Small Heading</Heading>);
      const heading = screen.getByRole("heading", { level: 4 });
      expect(heading.tagName).toBe("H4");
    });
  });

  describe("content variations", () => {
    it("handles simple text content", () => {
      render(<Heading>Simple Heading</Heading>);
      expect(screen.getByText("Simple Heading")).toBeInTheDocument();
    });

    it("handles React node children", () => {
      render(
        <Heading>
          <span>Brand</span> Name
        </Heading>
      );

      expect(screen.getByText("Brand")).toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
    });

    it("handles brand logo text", () => {
      render(<Heading>ShipLabel</Heading>);
      const heading = screen.getByRole("heading", { level: 1 });

      expect(heading).toHaveTextContent("ShipLabel");
    });

    it("handles empty content", () => {
      render(<Heading></Heading>);
      const heading = screen.getByRole("heading", { level: 1 });

      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("");
    });
  });

  it("maintains proper heading hierarchy", () => {
    render(
      <div>
        <Heading>Main Title</Heading>
        <p>Some content</p>
      </div>
    );

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();

    const allHeadings = screen.getAllByRole("heading");
    const h1Headings = allHeadings.filter((h) => h.tagName === "H1");
    expect(h1Headings).toHaveLength(1);
  });

  it("always renders the same structure", () => {
    const { rerender } = render(<Heading>First Title</Heading>);
    let heading = screen.getByRole("heading", { level: 1 });
    expect(heading.tagName).toBe("H1");

    rerender(<Heading>Second Title</Heading>);
    heading = screen.getByRole("heading", { level: 1 });
    expect(heading.tagName).toBe("H1");
    expect(heading).toHaveTextContent("Second Title");
  });

  it("works with brand-specific content", () => {
    const brandTexts = ["ShipLabel", "USPS Label Generator", "Shipping"];

    brandTexts.forEach((text) => {
      const { unmount } = render(<Heading>{text}</Heading>);
      const heading = screen.getByRole("heading", { level: 1 });

      expect(heading).toHaveTextContent(text);
      unmount();
    });
  });

  it("is accessible to screen readers", () => {
    render(<Heading>Application Title</Heading>);
    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeVisible();
    expect(heading).toHaveAccessibleName("Application Title");
  });

  it("works as page title", () => {
    render(
      <div>
        <header>
          <Heading>ShipLabel</Heading>
        </header>
        <main>
          <p>Page content</p>
        </main>
      </div>
    );

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.closest("header")).toBeInTheDocument();
    expect(heading).toHaveTextContent("ShipLabel");
  });

  it("applies custom className", () => {
    render(<Heading className="custom-class">Custom Heading</Heading>);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveClass("custom-class");
  });

  it("spreads additional props", () => {
    render(<Heading data-testid="test-heading">Test Heading</Heading>);
    const heading = screen.getByTestId("test-heading");
    expect(heading).toBeInTheDocument();
  });
});
