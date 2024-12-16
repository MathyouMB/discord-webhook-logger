export interface LogLevelConfiguration {
  level: number;
  color: string;
}

export const defaultLevelsConfiguration: Record<string, LogLevelConfiguration> =
  {
    error: {
      level: 0,
      color: "red",
    },
    warn: {
      level: 1,
      color: "yellow",
    },
    info: {
      level: 2,
      color: "blue",
    },
    http: {
      level: 3,
      color: "green",
    },
    verbose: {
      level: 4,
      color: "magenta",
    },
    debug: {
      level: 5,
      color: "cyan",
    },
    silly: {
      level: 6,
      color: "gray",
    },
  };
