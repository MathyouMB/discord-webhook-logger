import { LogLevelConfiguration } from "./log-level-configuration";

export const defaultFormatter = (
  level: LogLevelConfiguration,
  message: string,
): string => {
  const timestamp = new Date().toISOString().replace("T", " ").split(".")[0];
  const markdownCodeBlock = "```";
  return `${markdownCodeBlock}${timestamp} [${level.label}] ${message}${markdownCodeBlock}`;
};
