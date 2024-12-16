import { customFormatter } from "../../src/examples/custom-formatter";
import { FormatterInput } from "../../src/lib/formatters";

describe("customFormatter", () => {
  it("should format info level message correctly", () => {
    const input: FormatterInput = {
      level: "info",
      message: "This is an info message",
      discordTargetId: "123456789",
      additionalData: { key: "value" },
    };

    const result = customFormatter(input);
    const expectedTimestamp = new Date()
      .toISOString()
      .replace("T", " ")
      .split(".")[0];
    const expected = `ℹ️ **This is an info message: <@123456789>** \`\`\`json\n{\n  "key": "value",\n  "timestamp": "${expectedTimestamp}"\n}\n\`\`\``;

    expect(result).toBe(expected);
  });

  it("should format warn level message correctly", () => {
    const input: FormatterInput = {
      level: "warn",
      message: "This is a warning message",
      discordTargetId: "987654321",
      additionalData: { key: "value" },
    };

    const result = customFormatter(input);
    const expectedTimestamp = new Date()
      .toISOString()
      .replace("T", " ")
      .split(".")[0];
    const expected = `⚠️ **This is a warning message: <@987654321>** \`\`\`json\n{\n  "key": "value",\n  "timestamp": "${expectedTimestamp}"\n}\n\`\`\``;

    expect(result).toBe(expected);
  });

  it("should format error level message correctly", () => {
    const input: FormatterInput = {
      level: "error",
      message: "This is an error message",
      discordTargetId: "1122334455",
      additionalData: { key: "value" },
    };

    const result = customFormatter(input);
    const expectedTimestamp = new Date()
      .toISOString()
      .replace("T", " ")
      .split(".")[0];
    const expected = `🚨 **This is an error message: ** \`\`\`json\n{\n  "key": "value",\n  "timestamp": "${expectedTimestamp}"\n}\n\`\`\``;

    expect(result).toBe(expected);
  });

  it("should include additional data in the formatted message", () => {
    const input: FormatterInput = {
      level: "info",
      message: "Message with additional data",
      discordTargetId: "123123123",
      additionalData: { foo: "bar", baz: 42 },
    };

    const result = customFormatter(input);
    const expectedTimestamp = new Date()
      .toISOString()
      .replace("T", " ")
      .split(".")[0];
    const expected = `ℹ️ **Message with additional data: <@123123123>** \`\`\`json\n{\n  "foo": "bar",\n  "baz": 42,\n  "timestamp": "${expectedTimestamp}"\n}\n\`\`\``;

    expect(result).toBe(expected);
  });
});
