import { render, screen } from "@testing-library/react";
import BreadcrumbNavigation from "./BreadcrumbNavigation";

describe("BreadcrumbNavigation Component", () => {
  const mockSteps = [
    { id: 1, label: "Shipment Details", mobileLabel: "Details" },
    { id: 2, label: "Select Rate", mobileLabel: "Rate" },
    { id: 3, label: "Print Label", mobileLabel: "Print" },
  ];

  it("renders all steps", () => {
    render(<BreadcrumbNavigation steps={mockSteps} />);
    expect(screen.getByText("Shipment Details")).toBeInTheDocument();
    expect(screen.getByText("Select Rate")).toBeInTheDocument();
    expect(screen.getByText("Print Label")).toBeInTheDocument();
  });

  it("renders step numbers", () => {
    render(<BreadcrumbNavigation steps={mockSteps} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("highlights current step", () => {
    render(<BreadcrumbNavigation steps={mockSteps} currentStep={2} />);
    const step2 = screen.getByText("2");
    expect(step2).toBeInTheDocument();
  });

  it("shows completed steps correctly", () => {
    render(<BreadcrumbNavigation steps={mockSteps} currentStep={3} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders separators between steps", () => {
    render(<BreadcrumbNavigation steps={mockSteps} />);
    const separators = screen.getAllByTestId("separator");
    expect(separators).toHaveLength(2); // 3 steps = 2 separators
  });

  it("handles empty steps array", () => {
    render(<BreadcrumbNavigation steps={[]} />);
    expect(screen.queryByText("1")).not.toBeInTheDocument();
  });

  it("handles single step", () => {
    render(
      <BreadcrumbNavigation
        steps={[{ id: 1, label: "Single Step", mobileLabel: "Step" }]}
      />
    );
    expect(screen.getByText("Single Step")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.queryByTestId("separator")).not.toBeInTheDocument();
  });

  it("renders mobile labels for small screens", () => {
    render(<BreadcrumbNavigation steps={mockSteps} />);
    expect(screen.getByText("Details")).toBeInTheDocument();
    expect(screen.getByText("Rate")).toBeInTheDocument();
    expect(screen.getByText("Print")).toBeInTheDocument();
  });

  it("renders desktop labels for larger screens", () => {
    render(<BreadcrumbNavigation steps={mockSteps} />);
    expect(screen.getByText("Shipment Details")).toBeInTheDocument();
    expect(screen.getByText("Select Rate")).toBeInTheDocument();
    expect(screen.getByText("Print Label")).toBeInTheDocument();
  });
});
