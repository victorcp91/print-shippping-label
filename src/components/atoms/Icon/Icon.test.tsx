import { render } from "@testing-library/react";
import Icon from "./Icon";

describe("Icon Component", () => {
  it("renders shipping icon", () => {
    const { container } = render(<Icon name="shipping" />);
    const svgElement = container.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("renders print icon", () => {
    const { container } = render(<Icon name="print" />);
    const svgElement = container.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("renders download icon", () => {
    const { container } = render(<Icon name="download" />);
    const svgElement = container.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("renders arrow-right icon", () => {
    const { container } = render(<Icon name="arrow-right" />);
    const svgElement = container.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
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

    it("arrow-right icon contains path element", () => {
      const { container } = render(<Icon name="arrow-right" />);
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

    const { container: arrowContainer } = render(<Icon name="arrow-right" />);
    const arrowSvg = arrowContainer.querySelector("svg")?.innerHTML;

    expect(shippingSvg).not.toBe(printSvg);
    expect(printSvg).not.toBe(downloadSvg);
    expect(shippingSvg).not.toBe(downloadSvg);
    expect(arrowSvg).not.toBe(shippingSvg);
    expect(arrowSvg).not.toBe(printSvg);
    expect(arrowSvg).not.toBe(downloadSvg);
  });

  it("all icons have required SVG attributes", () => {
    const iconNames = ["shipping", "print", "download", "arrow-right"] as const;

    iconNames.forEach((iconName) => {
      const { container } = render(<Icon name={iconName} />);
      const svgElement = container.querySelector("svg");
      expect(svgElement).toHaveAttribute("xmlns", "http://www.w3.org/2000/svg");
    });
  });

  it("returns null for invalid icon name", () => {
    const { container } = render(<Icon name="invalid" />);
    expect(container.firstChild).toBeNull();
  });
});
