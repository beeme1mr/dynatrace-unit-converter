import { IUnitMapping } from "../types";

const timeUnits: IUnitMapping = {
  ns: {
    name: "nanosecond",
    symbol: "ns"
  },
  µs: {
    name: "microsecond",
    symbol: "mu"
  },
  mu: {
    name: "microsecond",
    symbol: "mu"
  },
  ms: {
    name: "millisecond",
    symbol: "ms"
  },
  s: {
    name: "second",
    symbol: "s"
  },
  mins: {
    name: "minute",
    symbol: "min"
  },
  min: {
    name: "minute",
    symbol: "min"
  },
  hs: {
    name: "hour",
    symbol: "h"
  },
  h: {
    name: "hour",
    symbol: "h"
  }
};

export { timeUnits };
