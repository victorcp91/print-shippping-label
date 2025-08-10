import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header Component", () => {
  it("renders header content", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders with default styling", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  it("passes through additional props", () => {
    render(<Header data-testid="header" aria-label="Page Header" />);
    const header = screen.getByRole("banner");
    expect(header).toHaveAttribute("data-testid", "header");
    expect(header).toHaveAttribute("aria-label", "Page Header");
  });

  it("maintains semantic header structure", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header.tagName).toBe("HEADER");
  });
});
