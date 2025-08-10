import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShipmentDetailsForm from "./ShipmentDetailsForm";
import type { ShipmentDetailsFormData } from "@/lib/schemas";

function getEmptyDefaults(): Partial<ShipmentDetailsFormData> {
  return {
    fromName: "",
    fromStreet: "",
    fromStreet2: "",
    fromCity: "",
    fromState: "",
    fromZipCode: "",
    fromPhone: "",
    fromEmail: "",
    toName: "",
    toStreet: "",
    toStreet2: "",
    toCity: "",
    toState: "",
    toZipCode: "",
    toPhone: "",
    toEmail: "",
    weight: "",
    length: "",
    width: "",
    height: "",
  };
}

describe("ShipmentDetailsForm", () => {
  test("shows validation errors when submitting with empty required fields", async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();

    render(
      <ShipmentDetailsForm
        onSubmit={onSubmit}
        defaultValues={getEmptyDefaults()}
      />
    );

    await user.click(
      screen.getByRole("button", { name: /continue to rate selection/i })
    );

    expect(await screen.findAllByText(/full name is required/i)).toHaveLength(
      2
    );
    expect(
      screen.getAllByText(/street address is required/i).length
    ).toBeGreaterThanOrEqual(2);
    expect(
      screen.getAllByText(/city is required/i).length
    ).toBeGreaterThanOrEqual(2);
    expect(
      screen.getAllByText(/state is required/i).length
    ).toBeGreaterThanOrEqual(2);
    expect(
      screen.getAllByText(/zip code must be at least 5 characters/i).length
    ).toBeGreaterThanOrEqual(2);
    expect(
      screen.getAllByText(/phone number must be at least 10 characters/i).length
    ).toBeGreaterThanOrEqual(2);

    expect(screen.getByText(/weight is required/i)).toBeInTheDocument();
    expect(screen.getByText(/length is required/i)).toBeInTheDocument();
    expect(screen.getByText(/width is required/i)).toBeInTheDocument();
    expect(screen.getByText(/height is required/i)).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  test("submits valid data and calls onSubmit with typed values; emails optional when empty", async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();

    render(
      <ShipmentDetailsForm
        onSubmit={onSubmit}
        defaultValues={getEmptyDefaults()}
      />
    );

    await user.type(screen.getByTestId("fromName"), "Alice Sender");
    await user.type(screen.getByTestId("fromStreet"), "1 First St");
    await user.type(screen.getByTestId("fromCity"), "San Francisco");
    await user.selectOptions(screen.getByTestId("fromState"), "CA");
    await user.type(screen.getByTestId("fromZipCode"), "94105");
    await user.type(screen.getByTestId("fromPhone"), "4155555555");

    await user.type(screen.getByTestId("toName"), "Bob Receiver");
    await user.type(screen.getByTestId("toStreet"), "9 Market St");
    await user.type(screen.getByTestId("toCity"), "Los Angeles");
    await user.selectOptions(screen.getByTestId("toState"), "CA");
    await user.type(screen.getByTestId("toZipCode"), "90001");
    await user.type(screen.getByTestId("toPhone"), "2135555555");

    await user.type(screen.getByTestId("weight"), "10");
    await user.type(screen.getByTestId("length"), "10");
    await user.type(screen.getByTestId("width"), "10");
    await user.type(screen.getByTestId("height"), "10");

    await user.click(
      screen.getByRole("button", { name: /continue to rate selection/i })
    );

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));

    const submitted = onSubmit.mock.calls[0][0] as ShipmentDetailsFormData;

    expect(submitted).toEqual(
      expect.objectContaining({
        fromName: "Alice Sender",
        fromStreet: "1 First St",
        fromCity: "San Francisco",
        fromState: "CA",
        fromZipCode: "94105",
        fromPhone: "4155555555",
        fromEmail: undefined,

        toName: "Bob Receiver",
        toStreet: "9 Market St",
        toCity: "Los Angeles",
        toState: "CA",
        toZipCode: "90001",
        toPhone: "2135555555",
        toEmail: undefined,

        weight: "10",
        length: "10",
        width: "10",
        height: "10",
      })
    );
  });

  test("shows numeric range error for weight over limit and prevents submit", async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();

    render(
      <ShipmentDetailsForm
        onSubmit={onSubmit}
        defaultValues={getEmptyDefaults()}
      />
    );

    await user.type(screen.getByTestId("fromName"), "A");
    await user.type(screen.getByTestId("fromStreet"), "S");
    await user.type(screen.getByTestId("fromCity"), "C");
    await user.selectOptions(screen.getByTestId("fromState"), "CA");
    await user.type(screen.getByTestId("fromZipCode"), "12345");
    await user.type(screen.getByTestId("fromPhone"), "1234567890");

    await user.type(screen.getByTestId("toName"), "B");
    await user.type(screen.getByTestId("toStreet"), "T");
    await user.type(screen.getByTestId("toCity"), "D");
    await user.selectOptions(screen.getByTestId("toState"), "CA");
    await user.type(screen.getByTestId("toZipCode"), "67890");
    await user.type(screen.getByTestId("toPhone"), "0987654321");

    await user.type(screen.getByTestId("weight"), "71");
    await user.type(screen.getByTestId("length"), "1");
    await user.type(screen.getByTestId("width"), "1");
    await user.type(screen.getByTestId("height"), "1");

    await user.click(
      screen.getByRole("button", { name: /continue to rate selection/i })
    );

    expect(
      await screen.findByText(/weight must be between 0 and 70 lbs/i)
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test("shows loading state while submitting and resets after", async () => {
    let resolveSubmit: () => void;
    const onSubmit = jest.fn().mockImplementation(
      () =>
        new Promise<void>((res) => {
          resolveSubmit = res;
        })
    );
    const user = userEvent.setup();

    render(
      <ShipmentDetailsForm
        onSubmit={onSubmit}
        defaultValues={getEmptyDefaults()}
      />
    );

    await user.type(screen.getByTestId("fromName"), "Alice Sender");
    await user.type(screen.getByTestId("fromStreet"), "1 First St");
    await user.type(screen.getByTestId("fromCity"), "San Francisco");
    await user.selectOptions(screen.getByTestId("fromState"), "CA");
    await user.type(screen.getByTestId("fromZipCode"), "94105");
    await user.type(screen.getByTestId("fromPhone"), "4155555555");

    await user.type(screen.getByTestId("toName"), "Bob Receiver");
    await user.type(screen.getByTestId("toStreet"), "9 Market St");
    await user.type(screen.getByTestId("toCity"), "Los Angeles");
    await user.selectOptions(screen.getByTestId("toState"), "CA");
    await user.type(screen.getByTestId("toZipCode"), "90001");
    await user.type(screen.getByTestId("toPhone"), "2135555555");

    await user.type(screen.getByTestId("weight"), "10");
    await user.type(screen.getByTestId("length"), "10");
    await user.type(screen.getByTestId("width"), "10");
    await user.type(screen.getByTestId("height"), "10");

    const continueButton = screen.getByRole("button", {
      name: /continue to rate selection/i,
    });
    await user.click(continueButton);

    expect(
      await screen.findByRole("button", { name: /processing.../i })
    ).toBeDisabled();

    resolveSubmit!();

    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /continue to rate selection/i })
      ).toBeEnabled()
    );
  });
});
