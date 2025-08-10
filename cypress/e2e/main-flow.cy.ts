const mockRatesResponse = {
  rates: [
    {
      id: "rate_1",
      service: "Priority Mail",
      carrier: "USPS",
      delivery_days: 2,
      rate: "8.50",
    },
    {
      id: "rate_2",
      service: "First-Class",
      carrier: "USPS",
      delivery_days: 4,
      rate: "5.20",
    },
  ],
  shipment_id: "shp_123",
};

const mockShipmentWithLabel = {
  id: "shp_123",
  tracking_code: "9400 1000 0000 0000 0000 00",
  postage_label: {
    label_url:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
  },
};

describe("Main shipping label purchase flow", () => {
  it("fills the form, sees rates, selects a rate, and sees the label page", () => {
    cy.intercept("POST", "/api/shipping/rates", (req) => {
      req.reply({ statusCode: 200, body: mockRatesResponse });
    }).as("getRates");

    cy.visit("/");

    const touch = (selector: string, value?: string) => {
      const v = value ?? " ";
      cy.get(`[data-testid="${selector}"]`).focus().clear().type(v);
    };

    touch("fromName", "Sender Name");
    touch("fromStreet", "123 Main St");
    touch("fromCity", "Austin");
    cy.get('[data-testid="fromState"]').select("TX");
    touch("fromZipCode", "73301");
    touch("fromPhone", "5125551234");
    touch("fromEmail", "sender@example.com");

    touch("toName", "Receiver Name");
    touch("toStreet", "456 Market St");
    touch("toCity", "San Francisco");
    cy.get('[data-testid="toState"]').select("CA");
    touch("toZipCode", "94105");
    touch("toPhone", "4155559876");
    touch("toEmail", "receiver@example.com");

    touch("weight", "16");
    touch("length", "10");
    touch("width", "8");
    touch("height", "4");

    cy.contains("button", "Continue to Rate Selection").click();
    cy.wait("@getRates");

    cy.get('[data-testid="rate-item-rate_1"]').within(() => {
      cy.contains("button", "Select").click();
    });

    cy.location("pathname", { timeout: 20000 }).should(
      "include",
      "/label/shp_123"
    );
    cy.request("POST", "/api/shipping/buy", {
      shipmentId: "shp_123",
      rateId: "rate_1",
    });
    cy.visit("/label/shp_123");
    cy.get('img[alt="USPS Shipping Label"]', { timeout: 20000 })
      .should("be.visible")
      .and("have.attr", "src")
      .and("match", /^data:image\/png/);
    cy.contains("Print Label").should("be.visible");
  });
});
