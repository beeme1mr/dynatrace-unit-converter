import { IUnitMapping } from "../types";

const sizeUnits: IUnitMapping = {
  bit: {
    name: "bit",
    symbol: "bit"
  },
  B: {
    name: "byte",
    symbol: "B"
  },
  kB: {
    name: "kilobyte",
    symbol: "kB"
  },
  // custom conversion
  KiB: {
    name: "kibibyte",
    symbol: "KiB"
  },
  MB: {
    name: "megabyte",
    symbol: "MB"
  },
  MiB: {
    name: "mebibyte",
    symbol: "MiB"
  },
  GB: {
    name: "gigabyte",
    symbol: "GB"
  },
  GiB: {
    name: "gibibyte",
    symbol: "GiB"
  },
  tb: {
    name: "terabyte",
    symbol: "TB"
  }
};

export { sizeUnits };
