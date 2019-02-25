// Time
type uTime =
  | "ns"
  | "mu"
  | "ms"
  | "s"
  | "min"
  | "h"
  | "d"
  | "week"
  | "month"
  | "year";

// Digital
type uDigital =
  | "bit"
  | "kb"
  | "Kibit"
  | "mb"
  | "Mebibit"
  | "Gb"
  | "Gibibit"
  | "Tb"
  | "B"
  | "kB"
  | "KiB"
  | "MB"
  | "MiB"
  | "GB"
  | "GiB"
  | "TB";

export type Unit = uTime | uDigital;

export type Measure = "time" | "digital";
export type System =
  | "metric"
  | "imperial"
  | "bits"
  | "bytes"
  | "binaryBits"
  | "binaryBytes";

export type ConversionType =
  | "time"
  | "size"
  | "throughput"
  | "percent"
  | "other";

export interface IBestFit {
  val: number;
  unit: string;
  singular: string;
  plural: string;
}

export type MappedUnit = IMappedUnitTime | IMappedUnitSize | IMappedUnitThroughput;

export interface IMappedUnitTime {
  type: "time";
  name: string;
  symbol: Unit;
}

export interface IMappedUnitSize {
  type: "size";
  name: string;
  symbol: Unit;
}

export interface IMappedUnitThroughput {
  type: "throughput";
  name: string;
  time: string;
  symbol: string;
  conversionSymbol: Unit;
}

export interface IUnit {
  abbr: Unit;
  measure: Measure;
  system: System;
  unit: IUnitDetails;
}

export interface IUnitDetails {
  name: {
    singular: string;
    plural: string;
  };
  to_anchor: number;
}

export interface IUnitMapping {
  [name: string]: { name: string; symbol: Unit };
}
export interface IUnitMappingThroughput {
  [name: string]: {
    name: string;
    time: string;
    symbol: string;
    conversionSymbol: Unit;
  };
}

export interface IConvertedType {
  /** The converted value */
  value: number;
  /** The name of the symbol */
  name: string;
  /** The symbol after the conversion */
  symbol: string;
  /** The symbol before the conversion */
  preConvertedSymbol: string;
  /** The type of type of coversion that was done */
  type: ConversionType;
}
export interface IUnitDescription {
  abbr: Unit;
  measure: Measure;
  system: System;
  singular: string;
  plural: string;
}

export interface IUnitDefinition extends UnitDefinition {
  _anchors: Partial<TestAnchor>;
}

type UnitMetric = { [K in Unit]: IUnitDetails };

type UnitDefinition = Partial<{ [Metric in System]: Partial<UnitMetric> }>;

type TestAnchor = {
  [Metric in System]: {
    unit: Unit;
    ratio: number;
  }
};
