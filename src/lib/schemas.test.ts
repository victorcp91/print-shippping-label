import { shipmentDetailsSchema, usStates } from "./schemas";

describe("shipmentDetailsSchema", () => {
  const validFormData = {
    // From Address
    fromName: "John Doe",
    fromStreet: "123 Main St",
    fromCity: "Anytown",
    fromState: "CA",
    fromZipCode: "12345",
    fromPhone: "5551234567",
    fromCountry: "US",

    // To Address
    toName: "Jane Smith",
    toStreet: "456 Oak Ave",
    toCity: "Somewhere",
    toState: "NY",
    toZipCode: "54321",
    toPhone: "5559876543",
    toCountry: "US",

    // Package Details
    weight: "5.5",
    length: "12.5",
    width: "8.5",
    height: "6.5",
  };

  describe("validation success", () => {
    it("validates complete valid form data", () => {
      const result = shipmentDetailsSchema.safeParse(validFormData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validFormData);
      }
    });

    it("validates form data with minimum values", () => {
      const minData = {
        ...validFormData,
        weight: "0.1",
        length: "0.1",
        width: "0.1",
        height: "0.1",
      };

      const result = shipmentDetailsSchema.safeParse(minData);
      expect(result.success).toBe(true);
    });

    it("validates form data with maximum values", () => {
      const maxData = {
        ...validFormData,
        weight: "69.9",
        length: "107.9",
        width: "107.9",
        height: "107.9",
      };

      const result = shipmentDetailsSchema.safeParse(maxData);
      expect(result.success).toBe(true);
    });

    it("validates form data with exact boundary values", () => {
      const boundaryData = {
        ...validFormData,
        weight: "70",
        length: "108",
        width: "108",
        height: "108",
      };

      const result = shipmentDetailsSchema.safeParse(boundaryData);
      expect(result.success).toBe(true);
    });
  });

  describe("from address validation", () => {
    it("requires fromName", () => {
      const data = { ...validFormData, fromName: "" };
      const result = shipmentDetailsSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Full name is required");
      }
    });

    it("requires fromStreet", () => {
      const data = { ...validFormData, fromStreet: "" };
      const result = shipmentDetailsSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Street address is required"
        );
      }
    });

    it("requires fromCity", () => {
      const data = { ...validFormData, fromCity: "" };
      const result = shipmentDetailsSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("City is required");
      }
    });

    it("requires fromState", () => {
      const data = { ...validFormData, fromState: "" };
      const result = shipmentDetailsSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("State is required");
      }
    });

    it("validates fromZipCode minimum length", () => {
      const data = { ...validFormData, fromZipCode: "123" };
      const result = shipmentDetailsSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "ZIP code must be at least 5 characters"
        );
      }
    });

    it("validates fromZipCode maximum length", () => {
      const data = { ...validFormData, fromZipCode: "12345678901" };
      const result = shipmentDetailsSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "ZIP code must be at most 10 characters"
        );
      }
    });

    it("validates fromPhone minimum length", () => {
      const data = { ...validFormData, fromPhone: "123" };
      const result = shipmentDetailsSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Phone number must be at least 10 characters"
        );
      }
    });
  });

  describe("to address validation", () => {
    it("requires toName", () => {
      const data = { ...validFormData, toName: "" };
      const result = shipmentDetailsSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Full name is required");
      }
    });

    it("requires toStreet", () => {
      const data = { ...validFormData, toStreet: "" };
      const result = shipmentDetailsSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Street address is required"
        );
      }
    });

    it("requires toCity", () => {
      const data = { ...validFormData, toCity: "" };
      const result = shipmentDetailsSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("City is required");
      }
    });

    it("requires toState", () => {
      const data = { ...validFormData, toState: "" };
      const result = shipmentDetailsSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("State is required");
      }
    });

    it("validates toZipCode minimum length", () => {
      const data = { ...validFormData, toZipCode: "123" };
      const result = shipmentDetailsSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "ZIP code must be at least 5 characters"
        );
      }
    });

    it("validates toZipCode maximum length", () => {
      const data = { ...validFormData, toZipCode: "12345678901" };
      const result = shipmentDetailsSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "ZIP code must be at most 10 characters"
        );
      }
    });

    it("validates toPhone minimum length", () => {
      const data = { ...validFormData, toPhone: "123" };
      const result = shipmentDetailsSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Phone number must be at least 10 characters"
        );
      }
    });
  });

  describe("package details validation", () => {
    it("validates weight minimum value", () => {
      const data = { ...validFormData, weight: "0" };
      const result = shipmentDetailsSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Weight must be between 0 and 70 lbs"
        );
      }
    });

    it("validates weight maximum value", () => {
      const data = { ...validFormData, weight: "70.1" };
      const result = shipmentDetailsSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Weight must be between 0 and 70 lbs"
        );
      }
    });

    it("validates length minimum value", () => {
      const data = { ...validFormData, length: "0" };
      const result = shipmentDetailsSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Length must be between 0 and 108 inches"
        );
      }
    });

    it("validates length maximum value", () => {
      const data = { ...validFormData, length: "108.1" };
      const result = shipmentDetailsSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Length must be between 0 and 108 inches"
        );
      }
    });

    it("validates width minimum value", () => {
      const data = { ...validFormData, width: "0" };
      const result = shipmentDetailsSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Width must be between 0 and 108 inches"
        );
      }
    });

    it("validates width maximum value", () => {
      const data = { ...validFormData, width: "108.1" };
      const result = shipmentDetailsSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Width must be between 0 and 108 inches"
        );
      }
    });

    it("validates height minimum value", () => {
      const data = { ...validFormData, height: "0" };
      const result = shipmentDetailsSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Height must be between 0 and 108 inches"
        );
      }
    });

    it("validates height maximum value", () => {
      const data = { ...validFormData, height: "108.1" };
      const result = shipmentDetailsSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Height must be between 0 and 108 inches"
        );
      }
    });
  });

  describe("multiple validation errors", () => {
    it("shows multiple validation errors at once", () => {
      const data = {
        ...validFormData,
        fromName: "",
        fromStreet: "",
        weight: "0",
      };

      const result = shipmentDetailsSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(1);
        const messages = result.error.issues.map((issue) => issue.message);
        expect(messages).toContain("Full name is required");
        expect(messages).toContain("Street address is required");
        expect(messages).toContain("Weight must be between 0 and 70 lbs");
      }
    });
  });
});

describe("usStates", () => {
  it("contains all 50 US states plus DC", () => {
    expect(usStates).toHaveLength(51);
  });

  it("has correct structure for each state", () => {
    usStates.forEach((state) => {
      expect(state).toHaveProperty("value");
      expect(state).toHaveProperty("label");
      expect(typeof state.value).toBe("string");
      expect(typeof state.label).toBe("string");
      expect(state.value.length).toBe(2);
      expect(state.label.length).toBeGreaterThan(0);
    });
  });

  it("contains common states", () => {
    const stateValues = usStates.map((state) => state.value);
    expect(stateValues).toContain("CA");
    expect(stateValues).toContain("NY");
    expect(stateValues).toContain("TX");
    expect(stateValues).toContain("FL");
    expect(stateValues).toContain("IL");
  });

  it("has unique state values", () => {
    const stateValues = usStates.map((state) => state.value);
    const uniqueValues = new Set(stateValues);
    expect(uniqueValues.size).toBe(stateValues.length);
  });

  it("has unique state labels", () => {
    const stateLabels = usStates.map((state) => state.label);
    const uniqueLabels = new Set(stateLabels);
    expect(uniqueLabels.size).toBe(stateLabels.length);
  });
});
