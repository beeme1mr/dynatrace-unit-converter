import { each, isBoolean, keys } from "lodash";
import { digital } from "./definitions/digital";
import { time } from "./definitions/time";
import {
  IBestFit,
  IUnit,
  IUnitDefinition,
  IUnitDescription,
  Measure,
  System,
  Unit
} from "./types";

class Convert {
  private origin: IUnit | null = null;
  private destination: IUnit | null = null;
  private measures = {
    digital,
    time
  } as { [M in Measure]: IUnitDefinition };

  constructor(private value: number) {}

  public from(abbr: Unit): this {
    this.origin = this.getUnit(abbr);
    if (!this.origin) {
      throw new Error(`Unsupported unit '${abbr}'.`);
    }
    return this;
  }

  public to(abbr: Unit): number {
    if (!this.origin) {
      throw new Error(".to must be called after .from");
    }

    this.destination = this.getUnit(abbr);

    let result;

    if (!this.destination) {
      return this.throwUnsupportedUnitError(abbr);
    }

    // Don't change the value if origin and destination are the same
    if (this.origin.abbr === this.destination.abbr) {
      return this.value;
    }

    // You can't go from liquid to mass, for example
    if (this.destination.measure !== this.origin.measure) {
      throw new Error(
        "Cannot convert incompatible measures of " +
          this.destination.measure +
          " and " +
          this.origin.measure
      );
    }

    /**
     * Convert from the source value to its anchor inside the system
     */
    result = this.value * this.origin.unit.to_anchor;

    /**
     * Convert from one system to another through the anchor ratio. Some conversions
     * aren't ratio based or require more than a simple shift. We can provide a custom
     * transform here to provide the direct result
     */
    if (this.origin.system !== this.destination.system) {
      result *= this.measures[this.origin.measure]._anchors[this.origin.system]!
        .ratio;
    }

    /**
     * Convert to another unit inside the destination system
     */
    return result / this.destination.unit.to_anchor;
  }

  public toBestFit(
    options: {
      exclude?: string[];
      cutOffNumber?: number;
    } = {}
  ): IBestFit {
    if (!this.origin) {
      throw new Error(".unit must be called before .toBestUnit");
    }

    const updateOptions = {
      exclude: options.exclude || [],
      cutOffNumber: options.cutOffNumber || 1
    };

    let best: IBestFit | null = null;
    each(this.possibilities(), possibility => {
      if (!this.origin) {
        throw new Error(`A unit must be defined.`);
      }
      const unit = this.describe(possibility);
      const isIncluded = updateOptions.exclude.indexOf(possibility) === -1;

      if (isIncluded && unit && unit.system === this.origin.system) {
        const result = this.to(possibility);
        if (
          !best ||
          (result >= updateOptions.cutOffNumber && result < best.val)
        ) {
          best = {
            val: result,
            unit: possibility,
            singular: unit.singular,
            plural: unit.plural
          };
        }
      }
    });
    if (!best) {
      throw new Error("Unable to find a best fit");
    }

    return best;
  }

  private describe(abbr: Unit) {
    const resp = this.getUnit(abbr);
    let desc = null;

    try {
      desc = describe(resp);
    } catch (err) {
      this.throwUnsupportedUnitError(abbr);
    }

    return desc;
  }

  private getUnit(abbr: Unit): IUnit {
    for (const measure of Object.keys(this.measures)) {
      const unitTypes = this.measures[measure as Measure];
      for (const system of Object.keys(unitTypes) as Array<
        System | "_anchors"
      >) {
        if (system === "_anchors") {
          break;
        }

        const unitDef = this.measures[measure as Measure][system];
        if (!unitDef) {
          break;
        }
        for (const testAbbr of Object.keys(unitDef)) {
          if (abbr === testAbbr) {
            const unit = unitDef[testAbbr];
            if (!unit) {
              break;
            }
            return {
              abbr,
              measure: measure as Measure,
              system: system as System,
              unit
            };
          }
        }
      }
    }

    throw new Error(`The unit '${abbr}' wasn't found.`);
  }

  private possibilities(measure?: Measure): Unit[] {
    if (!this.origin) {
      throw new Error("Origin must be defined!");
    }
    const possibilities: Unit[] = [];
    if (!this.origin && !measure) {
      each(keys(this.measures), m => {
        each(this.measures[m as Measure], (units, system) => {
          if (system === "_anchors") {
            return false;
          }
          possibilities.push(...(keys(units) as Unit[]));
          return true;
        });
      });
    } else {
      if (isBoolean(this.origin)) {
        throw new Error("Invalid origin value");
      }
      measure = measure || this.origin.measure;
      each(this.measures[measure], (units, system) => {
        if (system === "_anchors") {
          return false;
        }
        possibilities.push(...(keys(units) as Unit[]));
        return true;
      });
    }

    return possibilities;
  }

  private throwUnsupportedUnitError(invalidAbbr: string): never {
    const validUnits: string[] = [];

    each(this.measures, systems => {
      each(systems, (units, system) => {
        if (system === "_anchors") {
          return false;
        }
        validUnits.push(...keys(units));
        return true;
      });
    });

    throw new Error(
      "Unsupported unit " +
        invalidAbbr +
        ", use one of: " +
        validUnits.join(", ")
    );
  }
}

const describe = (resp: IUnit): IUnitDescription => {
  return {
    abbr: resp.abbr,
    measure: resp.measure,
    plural: resp.unit.name.plural,
    singular: resp.unit.name.singular,
    system: resp.system
  };
};

export function convert(value: number) {
  return new Convert(value);
}
