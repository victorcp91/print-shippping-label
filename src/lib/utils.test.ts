import { cn } from "./utils";

describe("cn utility function", () => {
  it("combines multiple class names", () => {
    const result = cn("class1", "class2", "class3");
    expect(result).toBe("class1 class2 class3");
  });

  it("handles conditional classes", () => {
    const isActive = true;
    const isDisabled = false;

    const result = cn(
      "base-class",
      isActive && "active-class",
      isDisabled && "disabled-class"
    );

    expect(result).toBe("base-class active-class");
  });

  it("handles arrays of classes", () => {
    const classes = ["class1", "class2", "class3"];
    const result = cn("base", ...classes);
    expect(result).toBe("base class1 class2 class3");
  });

  it("handles objects with boolean values", () => {
    const result = cn({
      "base-class": true,
      "active-class": true,
      "disabled-class": false,
    });

    expect(result).toBe("base-class active-class");
  });

  it("handles mixed input types", () => {
    const result = cn(
      "base-class",
      ["array-class1", "array-class2"],
      { "object-class": true, "hidden-class": false },
      "string-class"
    );

    expect(result).toBe(
      "base-class array-class1 array-class2 object-class string-class"
    );
  });

  it("handles empty and falsy values", () => {
    const result = cn(
      "base-class",
      "",
      null,
      undefined,
      false,
      0,
      "valid-class"
    );

    expect(result).toBe("base-class valid-class");
  });

  it("handles single class", () => {
    const result = cn("single-class");
    expect(result).toBe("single-class");
  });

  it("handles no arguments", () => {
    const result = cn();
    expect(result).toBe("");
  });

  it("handles whitespace in class names", () => {
    const result = cn("  class1  ", "  class2  ", "  class3  ");
    expect(result).toBe("class1 class2 class3");
  });

  it("handles duplicate classes", () => {
    const result = cn("class1", "class2", "class1", "class3");
    expect(result).toBe("class1 class2 class1 class3");
  });
});
