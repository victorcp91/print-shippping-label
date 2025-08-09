import { render } from "@testing-library/react";
import Icon from "./Icon";

describe("Icon Component", () => {
  it("renders shipping icon", () => {
    const { container } = render(<Icon name="shipping" />);

    const svgElement = container.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement?.tagName).toBe("svg");
  });

  it("renders print icon", () => {
    const { container } = render(<Icon name="print" />);

    const svgElement = container.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement?.tagName).toBe("svg");
  });

  it("renders download icon", () => {
    const { container } = render(<Icon name="download" />);

    const svgElement = container.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement?.tagName).toBe("svg");
  });

  describe("icon variants have correct properties", () => {
    it("shipping icon has correct dimensions", () => {
      const { container } = render(<Icon name="shipping" />);
      const svgElement = container.querySelector("svg");

      expect(svgElement).toHaveAttribute("width", "30");
      expect(svgElement).toHaveAttribute("height", "24");
      expect(svgElement).toHaveAttribute("viewBox", "0 0 30 24");
    });

    it("print icon has correct dimensions", () => {
      const { container } = render(<Icon name="print" />);
      const svgElement = container.querySelector("svg");

      expect(svgElement).toHaveAttribute("width", "16");
      expect(svgElement).toHaveAttribute("height", "16");
      expect(svgElement).toHaveAttribute("viewBox", "0 0 16 16");
    });

    it("download icon has correct dimensions", () => {
      const { container } = render(<Icon name="download" />);
      const svgElement = container.querySelector("svg");

      expect(svgElement).toHaveAttribute("width", "16");
      expect(svgElement).toHaveAttribute("height", "16");
      expect(svgElement).toHaveAttribute("viewBox", "0 0 16 16");
    });
  });

  describe("icon content validation", () => {
    it("shipping icon contains path element", () => {
      const { container } = render(<Icon name="shipping" />);
      const pathElement = container.querySelector("path");

      expect(pathElement).toBeInTheDocument();
    });

    it("print icon contains path element", () => {
      const { container } = render(<Icon name="print" />);
      const pathElement = container.querySelector("path");

      expect(pathElement).toBeInTheDocument();
    });

    it("download icon contains path element", () => {
      const { container } = render(<Icon name="download" />);
      const pathElement = container.querySelector("path");

      expect(pathElement).toBeInTheDocument();
    });
  });

  it("different icon names generate different SVG content", () => {
    const { container: shippingContainer } = render(<Icon name="shipping" />);
    const shippingSvg = shippingContainer.querySelector("svg")?.innerHTML;

    const { container: printContainer } = render(<Icon name="print" />);
    const printSvg = printContainer.querySelector("svg")?.innerHTML;

    const { container: downloadContainer } = render(<Icon name="download" />);
    const downloadSvg = downloadContainer.querySelector("svg")?.innerHTML;

    expect(shippingSvg).not.toBe(printSvg);
    expect(printSvg).not.toBe(downloadSvg);
    expect(shippingSvg).not.toBe(downloadSvg);
  });

  it("all icons have required SVG attributes", () => {
    const iconNames = ["shipping", "print", "download"] as const;

    iconNames.forEach((iconName) => {
      const { container } = render(<Icon name={iconName} />);
      const svgElement = container.querySelector("svg");

      expect(svgElement).toHaveAttribute("fill", "none");
      expect(svgElement).toHaveAttribute("xmlns", "http://www.w3.org/2000/svg");
    });
  });
});
