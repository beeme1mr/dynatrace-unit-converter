import { convert as convertClass } from "../convert";
import { convert } from "../index";

describe("Convert", () => {
  test("Bytes to Gigabytes", () => {
    const output = convertClass(1073741824)
      .from("B")
      .toBestFit();

    expect(output).toEqual({
      plural: "gigabytes",
      singular: "gigabyte",
      unit: "GB",
      val: 1.07
    });
  });
  test("Gigabytes to Terabytes", () => {
    const output = convertClass(1000)
      .from("GB")
      .toBestFit();

    expect(output).toEqual({
      plural: "terabytes",
      singular: "terabyte",
      unit: "TB",
      val: 1
    });
  });
  test("Kibibits to Mebibits", () => {
    const output = convertClass(1024)
      .from("Kibit")
      .toBestFit();

    expect(output).toEqual({
      plural: "mebibits",
      singular: "mebibit",
      unit: "Mebibit",
      val: 1
    });
  });
  test("kibibytes to Mebibytes", () => {
    const output = convertClass(1024)
      .from("KiB")
      .toBestFit();

    expect(output).toEqual({
      plural: "mebibytes",
      singular: "mebibyte",
      unit: "MiB",
      val: 1
    });
  });

  test("converting to a specific unit", () => {
    const baseUnit = convert(10020, "µs");

    expect(convert(100000, "µs", baseUnit.symbol)).toEqual({
      name: "milliseconds",
      preConvertedSymbol: "mu",
      symbol: "ms",
      type: "time",
      value: 100
    });
  });
});
