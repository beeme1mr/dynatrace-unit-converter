import { ConversionType, IConvertedType, Unit } from "./types";
import { convert as converter } from "./convert";
import { sizeUnits } from "./mappings/size";
import { throughputUnits } from "./mappings/throughput";
import { timeUnits } from "./mappings/time";

/**
 * Converts the unit to the best fitting unit.
 *
 * @param num - The number to convert
 * @param unit - The starting unit of the number
 */
export function convert(num: number, unit: string): IConvertedType {
  const parsedUnit = parseUnit(unit);

  const t = timeUnits[parsedUnit];
  if (t) {
    return convertToBestUnit(num, t.symbol, "time");
  }

  const s = sizeUnits[parsedUnit];
  if (s) {
    return convertToBestUnit(num, s.symbol, "size");
  }

  const throughput = throughputUnits[parsedUnit];
  if (throughput) {
    const conversionUnit = throughput.conversionSymbol || throughput.symbol;
    const convertedValue = convertToBestUnit(num, conversionUnit, "throughput");
    const timeValue = timeUnits[throughput.time];
    return {
      value: convertedValue.value,
      name: `${convertedValue.name} per ${timeValue.name}`,
      symbol: `${convertedValue.symbol}/${timeValue.symbol}`,
      preConvertedSymbol: conversionUnit,
      type: convertedValue.type
    };
  }

  /** handle percentages */
  if (parsedUnit.toLowerCase() === "ratio") {
    return {
      value: Math.round(num * 100),
      name: "%",
      symbol: "%",
      preConvertedSymbol: "%",
      type: "percent"
    };
  } else if (parsedUnit === "%") {
    return {
      value: num,
      name: "%",
      symbol: "%",
      preConvertedSymbol: "%",
      type: "percent"
    };
  } else if (parsedUnit === "‰") {
    return {
      value: num,
      name: "promille",
      symbol: "‰",
      preConvertedSymbol: "‰",
      type: "percent"
    };
  }

  if (parsedUnit === "count") {
    return {
      value: num,
      name: "",
      symbol: "",
      preConvertedSymbol: "",
      type: "other"
    };
  }

  if (parsedUnit === "count/s") {
    return {
      value: num,
      name: "per second",
      symbol: "/s",
      preConvertedSymbol: "/s",
      type: "other"
    };
  } else if (parsedUnit === "count/min") {
    return {
      value: num,
      name: "per minute",
      symbol: "/min",
      preConvertedSymbol: "/min",
      type: "other"
    };
  }

  return {
    value: num,
    name: parsedUnit,
    symbol: parsedUnit,
    preConvertedSymbol: parsedUnit,
    type: "other"
  };
}

/**
 * Attempts to parse the units used in Dynatrace timeseries
 */
export function parseUnit(unit: string): string {
  const match = unit.match(/^(\w+)\s+\((.+)\)$/);
  return match && match[2] ? match[2] : unit;
}

/**
 * Attempts to figure out the best unit to use.
 *
 * @param value - The number to evaluate
 * @param unit - The starting unit
 * @param type - The category of conversation unit
 */
export function convertToBestUnit(
  value: number,
  unit: Unit,
  type: ConversionType
): IConvertedType {
  const convertedValue = converter(value)
    .from(unit)
    .toBestFit();

  const name = (convertedValue.val === 1
    ? convertedValue.singular
    : convertedValue.plural
  ).toLowerCase();

  return {
    value: convertedValue.val,
    name,
    symbol: convertedValue.unit,
    preConvertedSymbol: unit,
    type
  };
}

/**
 * Converts a value from a specific unit to a different unit.
 *
 * @param value - The number that needs to be converted
 * @param from - The current unit
 * @param to - The unit the value should be converted to
 */
export function convertToSpecificUnit(
  value: number,
  from: Unit,
  to: Unit
): number;
export function convertToSpecificUnit(
  value: number,
  from: string,
  to: string
): number;
export function convertToSpecificUnit(
  value: number,
  from: string,
  to: string
): number {
  return converter(value)
    .from(from as Unit)
    .to(to as Unit);
}
