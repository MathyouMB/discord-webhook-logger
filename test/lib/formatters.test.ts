import { defaultFormatter } from "../../src/lib/formatters";
const markdownCodeBlock = "```";

describe("defaultFormatter", () => {
  it("will format the message with the given level and message", () => {
    const message = "This is a test message";
    const formattedMessage = defaultFormatter({
      level: "info",
      message,
    });
    const timestamp = new Date().toISOString().replace("T", " ").split(".")[0];
    expect(formattedMessage).toBe(
      `${markdownCodeBlock}${timestamp} [INFO] This is a test message${markdownCodeBlock}`,
    );
  });
});
