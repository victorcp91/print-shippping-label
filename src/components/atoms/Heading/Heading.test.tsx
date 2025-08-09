import { render, screen } from "@testing-library/react";
import Heading from "./Heading";

describe("Heading Component", () => {
  it("renders with children text", () => {
    render(<Heading>ShipLabel</Heading>);
    expect(screen.getByText("ShipLabel")).toBeInTheDocument();
  });

  it("renders as h1 element", () => {
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
});
