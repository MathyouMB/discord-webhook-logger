export interface LogLevelConfiguration {
  level: number;
  color: string;
  label: string;
}

export const defaultLevelsConfiguration: Record<string, LogLevelConfiguration> =
  {
    error: {
      level: 0,
      color: "red",
      label: "ERROR",
    },
    warn: {
      level: 1,
      color: "yellow",
      label: "WARN",
    },
    info: {
      level: 2,
      color: "blue",
      label: "INFO",
    },
    http: {
      level: 3,
      color: "green",
      label: "HTTP",
    },
    verbose: {
      level: 4,
      color: "magenta",
      label: "VERBOSE",
    },
    debug: {
      level: 5,
      color: "cyan",
      label: "DEBUG",
    },
    silly: {
      level: 6,
      color: "gray",
      label: "SILLY",
    },
  };
