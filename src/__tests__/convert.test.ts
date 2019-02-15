import { convert } from "../convert";

describe("Convert", () => {
  test("Bytes to Gigabytes", () => {
    const output = convert(1073741824)
      .from("B")
      .toBestFit();

    expect(output).toEqual({
      plural: "gigabytes",
      singular: "gigabyte",
      unit: "GB",
      val: 1.073741824
    });
  });
  test("Gigabytes to Terabytes", () => {
    const output = convert(1000)
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
    const output = convert(1024)
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
    const output = convert(1024)
      .from("KiB")
      .toBestFit();

    expect(output).toEqual({
      plural: "mebibytes",
      singular: "mebibyte",
      unit: "MiB",
      val: 1
    });
  });
});
