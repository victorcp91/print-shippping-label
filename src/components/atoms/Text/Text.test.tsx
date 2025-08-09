import { render, screen } from "@testing-library/react";
import Text from "../Text";

describe("Text Component", () => {
  it("renders with children text", () => {
    render(<Text>Hello World</Text>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("uses body variant by default", () => {
    render(<Text>Default text</Text>);
    const textElement = screen.getByText("Default text");

    expect(textElement.tagName).toBe("SPAN");
  });

  it("renders section-heading variant correctly", () => {
    render(<Text variant="section-heading">From Address</Text>);
    const textElement = screen.getByText("From Address");

    expect(textElement).toBeInTheDocument();
    expect(textElement.tagName).toBe("SPAN");
  });

  it("handles multiline text for address-display variant", () => {
    const multilineAddress = "John Doe\n123 Main St\nCity, State 12345";

    const { container } = render(
      <Text variant="address-display">{multilineAddress}</Text>
    );
    const textElement = container.querySelector("span");

    expect(textElement).toBeInTheDocument();
    expect(textElement?.textContent).toContain("John Doe");
  });

  describe("variant behaviors", () => {
    const testText = "Test Content";

    it("all variants render the same text content", () => {
      const variants = ["body", "section-heading", "address-display"] as const;

      variants.forEach((variant) => {
        const { unmount } = render(<Text variant={variant}>{testText}</Text>);
        expect(screen.getByText(testText)).toBeInTheDocument();
        unmount();
      });
    });

    it("body variant handles regular text", () => {
      render(<Text variant="body">Regular body text content</Text>);
      expect(screen.getByText("Regular body text content")).toBeInTheDocument();
    });

    it("section-heading variant handles heading text", () => {
      render(<Text variant="section-heading">Section Title</Text>);
      expect(screen.getByText("Section Title")).toBeInTheDocument();
    });

    it("address-display variant preserves line breaks", () => {
      const addressText = "Line 1\nLine 2\nLine 3";
      const { container } = render(
        <Text variant="address-display">{addressText}</Text>
      );

      const element = container.querySelector("span");
      expect(element?.textContent).toContain("Line 1");
    });
  });

  it("handles empty content", () => {
    const { container } = render(<Text></Text>);
    const textElement = container.querySelector("span");
    expect(textElement).toBeInTheDocument();
  });

  it("handles React node children", () => {
    render(
      <Text>
        <strong>Bold text</strong> and normal text
      </Text>
    );

    expect(screen.getByText("Bold text")).toBeInTheDocument();
    expect(screen.getByText("and normal text")).toBeInTheDocument();
  });
});
