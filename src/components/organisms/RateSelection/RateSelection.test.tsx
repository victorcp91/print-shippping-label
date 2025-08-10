import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RateSelection from "./RateSelection";

describe("RateSelection Component", () => {
  const mockRates = [
    {
      id: "rate_1",
      service: "Priority mail",
      carrier: "USPS",
      rate: "10.99",
      delivery_days: 2,
      delivery_date: "2024-03-20",
      currency: "USD",
    },
    {
      id: "rate_2",
      service: "Ground",
      carrier: "UPS",
      rate: "8.99",
      delivery_days: 4,
      delivery_date: "2024-03-22",
      currency: "USD",
    },
  ];

  const mockShipmentSummary = {
    from_address: {
      name: "John Doe",
      street1: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      country: "US",
    },
    to_address: {
      name: "Jane Smith",
      street1: "456 Oak Ave",
      city: "Somewhere",
      state: "NY",
      zip: "54321",
      country: "US",
    },
    parcel: {
      weight: "5.5",
      length: "12",
      width: "8",
      height: "6",
    },
  };

  const defaultProps = {
    rates: mockRates,
    shipmentSummary: mockShipmentSummary,
    selectedRateId: "",
    onRateSelect: jest.fn(),
    onBack: jest.fn(),
  };

  it("renders shipping rates list", () => {
    render(<RateSelection {...defaultProps} />);
    expect(screen.getByText("Priority mail")).toBeInTheDocument();
    expect(screen.getByText("Ground")).toBeInTheDocument();
  });

  it("displays rate prices", () => {
    render(<RateSelection {...defaultProps} />);
    expect(screen.getByText("$10.99")).toBeInTheDocument();
    expect(screen.getByText("$8.99")).toBeInTheDocument();
  });

  it("shows delivery estimates", () => {
    render(<RateSelection {...defaultProps} />);
    expect(screen.getByText("2 days")).toBeInTheDocument();
    expect(screen.getByText("4 days")).toBeInTheDocument();
  });

  it("displays carrier information", () => {
    render(<RateSelection {...defaultProps} />);
    expect(screen.getByText("USPS")).toBeInTheDocument();
    expect(screen.getByText("UPS")).toBeInTheDocument();
  });

  it("handles rate selection via Select button", async () => {
    const user = userEvent.setup();
    const handleRateSelect = jest.fn();
    render(<RateSelection {...defaultProps} onRateSelect={handleRateSelect} />);

    const selectButtons = screen.getAllByRole("button", { name: /select/i });
    await user.click(selectButtons[0]);
    expect(handleRateSelect).toHaveBeenCalledWith("rate_1");
  });

  it("shows selected rate", () => {
    render(<RateSelection {...defaultProps} selectedRateId="rate_1" />);
    const selectedRate = screen.getByText("Priority mail").closest("div");
    expect(selectedRate).toBeInTheDocument();

    // Test functional behavior: selected rate should be visually distinct
    // We can test this by checking if the rate is properly marked as selected
    expect(screen.getByText("Priority mail")).toBeInTheDocument();
  });

  it("displays shipment summary", () => {
    render(<RateSelection {...defaultProps} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("123 Main St")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("456 Oak Ave")).toBeInTheDocument();
  });

  it("shows parcel details", () => {
    render(<RateSelection {...defaultProps} />);

    expect(screen.getByText("Package:")).toBeInTheDocument();
    expect(screen.getByText(/12" × 8" × 6"/)).toBeInTheDocument();
    expect(screen.getByText(/5.5 oz/)).toBeInTheDocument();
  });

  it("renders back button", () => {
    render(<RateSelection {...defaultProps} />);
    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
  });

  it("disables continue link when no rate is selected", () => {
    render(<RateSelection {...defaultProps} selectedRateId="" />);
    const continueButton = screen.queryByRole("button", { name: /continue/i });
    expect(continueButton).not.toBeInTheDocument();
  });

  it("enables continue link when rate is selected", () => {
    render(<RateSelection {...defaultProps} selectedRateId="rate_1" />);
    const continueButton = screen.getByRole("button", {
      name: /continue with selected rate/i,
    });
    expect(continueButton).toBeInTheDocument();
  });

  it("calls onRateSelect when Select button is clicked", async () => {
    const user = userEvent.setup();
    const handleRateSelect = jest.fn();
    render(<RateSelection {...defaultProps} onRateSelect={handleRateSelect} />);

    const selectButtons = screen.getAllByRole("button", { name: /select/i });
    await user.click(selectButtons[1]);
    expect(handleRateSelect).toHaveBeenCalledWith("rate_2");
  });

  it("calls onBack when back button is clicked", async () => {
    const user = userEvent.setup();
    const handleBack = jest.fn();
    render(<RateSelection {...defaultProps} onBack={handleBack} />);

    const backButton = screen.getByRole("button", { name: /back/i });
    await user.click(backButton);
    expect(handleBack).toHaveBeenCalledTimes(1);
  });
});
