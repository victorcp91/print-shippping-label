import { render, screen } from "@testing-library/react";
import Logo from "./Logo";

describe("Logo Component", () => {
  it("renders logo content", () => {
    render(<Logo />);
    expect(screen.getByText("P")).toBeInTheDocument();
    expect(screen.getByText("PrintLabel")).toBeInTheDocument();
  });

  it("renders with proper structure", () => {
    render(<Logo />);
    const logoContainer = screen.getByText("PrintLabel").closest("div");
    expect(logoContainer).toBeInTheDocument();

    // Verifica se o ícone está presente
    const iconContainer = logoContainer?.querySelector("div");
    expect(iconContainer).toBeInTheDocument();
    expect(iconContainer?.querySelector("span")).toHaveTextContent("P");
  });

  it("passes through additional props", () => {
    render(<Logo data-testid="logo" aria-label="Company Logo" />);
    const logoContainer = screen.getByTestId("logo");
    expect(logoContainer).toHaveAttribute("data-testid", "logo");
    expect(logoContainer).toHaveAttribute("aria-label", "Company Logo");
  });

  it("maintains logo structure", () => {
    render(<Logo />);
    const logoContainer = screen.getByText("PrintLabel").closest("div");
    expect(logoContainer).toBeInTheDocument();

    // Verifica se o ícone e o texto estão presentes
    const iconContainer = logoContainer?.querySelector("div");
    const textSpan = screen.getByText("PrintLabel");

    expect(iconContainer).toBeInTheDocument();
    expect(textSpan).toHaveTextContent("PrintLabel");
  });
});
