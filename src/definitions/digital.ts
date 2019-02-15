const bits = {
  bit: {
    name: {
      singular: "bit",
      plural: "bits"
    },
    to_anchor: 1
  },
  kb: {
    name: {
      singular: "kilobit",
      plural: "kilobits"
    },
    to_anchor: 1000
  },
  Mb: {
    name: {
      singular: "megabit",
      plural: "megabits"
    },
    to_anchor: 1000000
  },
  Gb: {
    name: {
      singular: "gigabit",
      plural: "gigabits"
    },
    to_anchor: 1000000000
  },
  Tb: {
    name: {
      singular: "terabit",
      plural: "terabits"
    },
    to_anchor: 1000000000000
  }
};

const binaryBits = {
  Kibit: {
    name: {
      singular: "kibibit",
      plural: "kibibits"
    },
    to_anchor: 1024
  },
  Mebibit: {
    name: {
      singular: "mebibit",
      plural: "mebibits"
    },
    to_anchor: 1048576
  },
  Gibibit: {
    name: {
      singular: "gibibit",
      plural: "gibibits"
    },
    to_anchor: 1073741824
  }
};

const bytes = {
  B: {
    name: {
      singular: "byte",
      plural: "bytes"
    },
    to_anchor: 1
  },
  kB: {
    name: {
      singular: "kilobyte",
      plural: "kilobytes"
    },
    to_anchor: 1000
  },
  MB: {
    name: {
      singular: "megabyte",
      plural: "megabytes"
    },
    to_anchor: 1000000
  },
  GB: {
    name: {
      singular: "gigabyte",
      plural: "gigabytes"
    },
    to_anchor: 1000000000
  },
  TB: {
    name: {
      singular: "terabyte",
      plural: "terabytes"
    },
    to_anchor: 1000000000000
  }
};

const binaryBytes = {
  KiB: {
    name: {
      singular: "kibibyte",
      plural: "kibibytes"
    },
    to_anchor: 1024
  },
  MiB: {
    name: {
      singular: "mebibyte",
      plural: "mebibytes"
    },
    to_anchor: 1048576
  },
  GiB: {
    name: {
      singular: "gibibyte",
      plural: "gibibytes"
    },
    to_anchor: 1073741824
  }
};

export const digital = {
  bits,
  bytes,
  binaryBits,
  binaryBytes,
  _anchors: {
    bits: {
      unit: "b",
      ratio: 1 / 8
    },
    bytes: {
      unit: "B",
      ratio: 8
    },
    binaryBits: {
      unit: "b",
      ratio: 1 / 8
    },
    binaryBytes: {
      unit: "B",
      ratio: 8
    }
  }
};
