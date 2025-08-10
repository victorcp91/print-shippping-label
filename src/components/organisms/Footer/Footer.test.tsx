import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer Component", () => {
  it("renders footer content", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders with default styling", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("passes through additional props", () => {
    render(<Footer data-testid="footer" aria-label="Page Footer" />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveAttribute("data-testid", "footer");
    expect(footer).toHaveAttribute("aria-label", "Page Footer");
  });

  it("maintains semantic footer structure", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer.tagName).toBe("FOOTER");
  });
});
