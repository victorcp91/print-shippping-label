import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RateItem from "./RateItem";

const mockRate = {
  id: "rate_1",
  service: "Priority mail",
  carrier: "USPS",
  rate: "10.99",
  delivery_days: 2,
  delivery_date: "2024-03-20",
  currency: "USD",
};

describe("RateItem Component", () => {
  it("renders service and carrier", () => {
    render(<RateItem rate={mockRate} selected={false} onSelect={jest.fn()} />);
    expect(screen.getByText("Priority mail")).toBeInTheDocument();
    expect(screen.getByText("USPS")).toBeInTheDocument();
  });

  it("renders price and delivery days", () => {
    render(<RateItem rate={mockRate} selected={false} onSelect={jest.fn()} />);
    expect(screen.getByText("$10.99")).toBeInTheDocument();
    expect(screen.getByText("2 days")).toBeInTheDocument();
  });

  it("marks item as selected via aria-selected when selected is true", () => {
    render(<RateItem rate={mockRate} selected={true} onSelect={jest.fn()} />);
    const row = screen.getByTestId("rate-item-rate_1");
    expect(row).toHaveAttribute("aria-selected", "true");
  });

  it("does not call onSelect when row is clicked (only Select button)", async () => {
    const user = userEvent.setup();
    const handleSelect = jest.fn();
    render(
      <RateItem rate={mockRate} selected={false} onSelect={handleSelect} />
    );

    const row = screen.getByTestId("rate-item-rate_1");
    await user.click(row);
    expect(handleSelect).not.toHaveBeenCalled();
  });

  it("calls onSelect when button is clicked", async () => {
    const user = userEvent.setup();
    const handleSelect = jest.fn();
    render(
      <RateItem rate={mockRate} selected={false} onSelect={handleSelect} />
    );

    const button = screen.getByRole("button", { name: /select/i });
    await user.click(button);
    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith("rate_1");
  });
});
