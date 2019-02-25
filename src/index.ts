import { ConversionType, IConvertedType, Unit, MappedUnit } from "./types";
import { convert as converter } from "./convert";
import { sizeUnits } from "./mappings/size";
import { throughputUnits } from "./mappings/throughput";
import { timeUnits } from "./mappings/time";

/**
 * Converts the unit to the best fitting unit.
 *
 * @param num - The number to convert
 * @param unit - The starting unit of the number
 * @param targetUnit - The optional target conversion unit
 */
export function convert(
  num: number,
  unit: string,
  targetUnit?: string
): IConvertedType {
  const parsedUnit = parseUnit(unit);

  const mappedUnit = mapUnit(parsedUnit);

  if (
    mappedUnit &&
    (mappedUnit.type === "time" || mappedUnit.type === "size")
  ) {
    if (targetUnit) {
      const parsedTargetUnit = parseUnit(targetUnit);
      const mappedTargetUnit = mapUnit(parsedTargetUnit);
      if (mappedTargetUnit && mappedTargetUnit.type === mappedUnit.type) {
        return convertToSpecificUnit(
          num,
          mappedUnit.symbol,
          mappedTargetUnit.symbol,
          mappedUnit.type
        );
      }
      throw new Error(`Invalid target unit ${targetUnit}`);
    }
    return convertToBestUnit(num, mappedUnit.symbol, mappedUnit.type);
  }

  if (mappedUnit && mappedUnit.type === "throughput") {
    const conversionUnit = mappedUnit.conversionSymbol || mappedUnit.symbol;
    const timeValue = timeUnits[mappedUnit.time];
    if (targetUnit) {
      const parsedTargetUnit = parseUnit(targetUnit);
      const mappedTargetUnit = mapUnit(parsedTargetUnit);
      if (mappedTargetUnit && mappedTargetUnit.type === "throughput") {
        const targetConversionUnit =
          mappedTargetUnit.conversionSymbol || mappedTargetUnit.symbol;
        const convertedTargetValue = convertToSpecificUnit(
          num,
          conversionUnit,
          targetConversionUnit,
          mappedUnit.type
        );

        return {
          value: convertedTargetValue.value,
          name: `${convertedTargetValue.name} per ${timeValue.name}`,
          symbol: `${convertedTargetValue.symbol}/${timeValue.symbol}`,
          preConvertedSymbol: conversionUnit,
          type: convertedTargetValue.type
        };
      }
      throw new Error(`Invalid target unit ${targetUnit}`);
    }

    const convertedValue = convertToBestUnit(
      num,
      conversionUnit,
      mappedUnit.type
    );

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
 * Maps parsed Dynatrace units to the known conversation units
 */
export function mapUnit(unit: string): MappedUnit | null {
  const t = timeUnits[unit];
  if (t) {
    return { ...t, type: "time" };
  }
  const s = sizeUnits[unit];
  if (s) {
    return { ...s, type: "size" };
  }
  const tp = throughputUnits[unit];
  if (tp) {
    return { ...tp, type: "throughput" };
  }
  return null;
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
  to: Unit,
  type: ConversionType
): IConvertedType {
  const convertedValue = converter(value)
    .from(from)
    .to(to);

  const newUnitDescription = converter(convertedValue).describe(to);

  if (!newUnitDescription) {
    throw new Error(`Unknown unit ${to}`);
  }

  const name = (convertedValue === 1
    ? newUnitDescription.singular
    : newUnitDescription.plural
  ).toLowerCase();

  return {
    value: convertedValue,
    name,
    symbol: to,
    preConvertedSymbol: from,
    type
  };
}

export * from "./types";

export { sizeUnits, throughputUnits, timeUnits };
