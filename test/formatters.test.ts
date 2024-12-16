import { defaultFormatter } from "../lib/formatters";
const markdownCodeBlock = "```";

describe("defaultFormatter", () => {
  it("will format the message with the given level and message", () => {
    const level = {
      level: 0,
      color: "white",
      label: "INFO",
    };
    const message = "This is a test message";
    const formattedMessage = defaultFormatter(level, message);
    const timestamp = new Date().toISOString().replace("T", " ").split(".")[0];
    expect(formattedMessage).toBe(
      `${markdownCodeBlock}${timestamp} [INFO] This is a test message${markdownCodeBlock}`,
    );
  });

  it("will handle empty message", () => {
    const level = {
      level: 0,
      color: "white",
      label: "ERROR",
    };
    const message = "";
    const formattedMessage = defaultFormatter(level, message);
    const timestamp = new Date().toISOString().replace("T", " ").split(".")[0];
    expect(formattedMessage).toBe(
      `${markdownCodeBlock}${timestamp} [ERROR] ${markdownCodeBlock}`,
    );
  });
});
