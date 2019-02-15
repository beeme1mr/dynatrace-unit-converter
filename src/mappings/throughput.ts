import { IUnitMappingThroughput } from "../types";

const throughputUnits: IUnitMappingThroughput = {
  "B/s": {
    name: "byte",
    time: "s",
    symbol: "B/s",
    conversionSymbol: "B"
  },
  "B/min": {
    name: "byte",
    time: "mins",
    symbol: "B/min",
    conversionSymbol: "B"
  },
  "bit/s": {
    name: "bit",
    time: "s",
    symbol: "bit/s",
    conversionSymbol: "bit"
  },
  "bit/min": {
    name: "bit",
    time: "mins",
    symbol: "bit/min",
    conversionSymbol: "bit"
  },
  "kB/s": {
    name: "kilobyte",
    time: "s",
    symbol: "kB/s",
    conversionSymbol: "kB"
  },
  "kB/min": {
    name: "kilobyte",
    time: "mins",
    symbol: "kB/min",
    conversionSymbol: "kB"
  },
  "KiB/s": {
    name: "kibibyte",
    time: "s",
    symbol: "KiB/s",
    conversionSymbol: "KiB"
  },
  "MB/s": {
    name: "megabyte",
    time: "s",
    symbol: "MB/s",
    conversionSymbol: "MB"
  },
  "MB/min": {
    name: "megabyte",
    time: "mins",
    symbol: "MB/min",
    conversionSymbol: "MB"
  },
  "MiB/s": {
    name: "mebibyte",
    time: "s",
    symbol: "MiB/s",
    conversionSymbol: "MiB"
  },
  "MiB/min": {
    name: "mebibyte",
    time: "mins",
    symbol: "MiB/min",
    conversionSymbol: "MiB"
  }
};

export { throughputUnits };
