import { render, screen } from "@testing-library/react";
import Text from "./Text";

describe("Text Component", () => {
  it("renders with children text", () => {
    render(<Text>Hello World</Text>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("uses span element by default", () => {
    render(<Text>Default text</Text>);
    const textElement = screen.getByText("Default text");
    expect(textElement.tagName).toBe("SPAN");
  });

  it("renders section-heading variant", () => {
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
    expect(textElement?.textContent).toBe(multilineAddress);
  });

  it("passes through custom attributes", () => {
    render(
      <Text data-testid="custom-text" aria-label="Custom text">
        Test text
      </Text>
    );
    const textElement = screen.getByText("Test text");
    expect(textElement).toHaveAttribute("data-testid", "custom-text");
    expect(textElement).toHaveAttribute("aria-label", "Custom text");
  });

  describe("variant behaviors", () => {
    const testText = "Test Content";

    it("renders all variants", () => {
      const variants = [
        "body",
        "section-heading",
        "address-display",
        "body-small",
      ] as const;

      variants.forEach((variant) => {
        const { unmount } = render(<Text variant={variant}>{testText}</Text>);
        expect(screen.getByText(testText)).toBeInTheDocument();
        unmount();
      });
    });

    it("preserves line breaks in address-display variant", () => {
      const addressText = "Line 1\nLine 2\nLine 3";
      const { container } = render(
        <Text variant="address-display">{addressText}</Text>
      );

      const element = container.querySelector("span");
      expect(element).toBeInTheDocument();
      expect(element?.textContent).toBe(addressText);
      ["Line 1", "Line 2", "Line 3"].forEach((line) => {
        expect(element?.textContent).toContain(line);
      });
    });
  });

  it("handles empty content", () => {
    const { container } = render(<Text></Text>);
    const textElement = container.querySelector("span");
    expect(textElement).toBeInTheDocument();
    expect(textElement?.textContent).toBe("");
  });

  it("handles React node children", () => {
    render(
      <Text>
        <strong>Bold text</strong> and normal text
      </Text>
    );

    expect(screen.getByText(/Bold text/)).toBeInTheDocument();
    expect(screen.getByText(/and normal text/)).toBeInTheDocument();
  });
});
