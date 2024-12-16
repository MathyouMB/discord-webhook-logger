export interface FormatterInput {
  level: string;
  message: string;
  discordTargetId?: string;
  additionalData?: any;
}

export const defaultFormatter = ({
  level,
  message,
}: FormatterInput): string => {
  const timestamp = new Date().toISOString().replace("T", " ").split(".")[0];
  const markdownCodeBlock = "```";
  return `${markdownCodeBlock}${timestamp} [${level.toUpperCase()}] ${message}${markdownCodeBlock}`;
};
