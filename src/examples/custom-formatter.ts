import { FormatterInput } from "../lib/formatters";

export const customFormatter = ({
  level,
  message,
  discordTargetId,
  additionalData,
}: FormatterInput): string => {
  const LEVEL_TO_EMOJI: { [key: string]: string } = {
    info: "ℹ️",
    warn: "⚠️",
    error: "🚨",
  };

  const timestamp = new Date().toISOString().replace("T", " ").split(".")[0];
  additionalData.timestamp = timestamp;

  const jsonFormatted = JSON.stringify(additionalData, null, 2);
  const emoji = LEVEL_TO_EMOJI[level];
  const isMessageError = level === "error";
  const target = `<@${discordTargetId}>`;
  const discordFormatted = "```json\n" + jsonFormatted + "\n```";
  return `${emoji} **${message}: ${!isMessageError ? target : ""}** ${discordFormatted}`;
};
