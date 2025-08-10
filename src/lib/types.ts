export interface ShippingRate {
  id: string;
  carrier: string;
  service: string;
  rate: string;
  delivery_days: number;
  delivery_date: string | null;
  currency: string;
}

export interface ShipmentSummary {
  from_address: {
    name: string;
    street1: string;
    street2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  to_address: {
    name: string;
    street1: string;
    street2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  parcel: {
    weight: string;
    length: string;
    width: string;
    height: string;
  };
}

export interface RateSelectionProps {
  rates: ShippingRate[];
  shipmentSummary: ShipmentSummary;
  selectedRateId: string;
  onRateSelect: (rateId: string) => Promise<void>;
  onBack: () => void;
}
