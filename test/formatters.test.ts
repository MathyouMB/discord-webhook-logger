import { defaultFormatter } from "../lib/formatters";

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
    expect(formattedMessage).toBe(`${timestamp} [INFO] This is a test message`);
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
    expect(formattedMessage).toBe(`${timestamp} [ERROR] `);
  });
});
