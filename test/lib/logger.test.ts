import { defaultFormatter } from "../../src/lib/formatters";
import { DiscordWebhookLogger } from "../../src/lib/logger";
import { jest } from "@jest/globals";

const mockWebhookUrls = [
  "https://discord.com/api/webhooks/1234567890/ABCDEFGHIJKLMN1234567890",
];

jest
  .spyOn(DiscordWebhookLogger.prototype as any, "sendWebhookMessage")
  .mockImplementation(async () => {});

describe("DiscordWebhookLogger", () => {
  describe("initialization", () => {
    describe("webhookUrls", () => {
      it("will initialize with given webhookUrls", () => {
        const logger = new DiscordWebhookLogger({
          webhookUrls: mockWebhookUrls,
        });
        expect(logger).toBeInstanceOf(DiscordWebhookLogger);
      });

      it("will store the webhookUrls correctly", () => {
        const logger = new DiscordWebhookLogger({
          webhookUrls: mockWebhookUrls,
        });
        expect((logger as any).webhookUrls).toEqual(mockWebhookUrls);
      });

      it("will throw an error if an invalid webhook URL is provided", () => {
        const invalidWebhookUrls = ["https://example.com/webhooks"];
        expect(
          () => new DiscordWebhookLogger({ webhookUrls: invalidWebhookUrls }),
        ).toThrow(`Invalid Discord webhook URL: ${invalidWebhookUrls[0]}`);
      });
    });
  });

  describe("log", () => {
    it("will send messages to all webhook URLs", async () => {
      const mockLevel = "info";
      const mockMessage = "This is an info message";
      const logger = new DiscordWebhookLogger({ webhookUrls: mockWebhookUrls });
      const sendWebhookMessageSpy = jest
        .spyOn(logger as any, "sendWebhookMessage")
        .mockImplementation(async () => {});

      logger.log({
        level: mockLevel,
        message: mockMessage,
      });

      expect(sendWebhookMessageSpy).toHaveBeenCalledWith(
        mockWebhookUrls[0],
        defaultFormatter({
          level: mockLevel,
          message: mockMessage,
        }),
      );
    });

    it("will format message with custom formatter", async () => {
      const mockMessage = "This is an info message";
      const customFormatter = jest.fn(() => "Custom formatted message");
      const logger = new DiscordWebhookLogger({
        webhookUrls: mockWebhookUrls,
        format: customFormatter,
      });
      const sendWebhookMessageSpy = jest
        .spyOn(logger as any, "sendWebhookMessage")
        .mockImplementation(async () => {});

      logger.log({
        level: "info",
        message: mockMessage,
      });

      expect(sendWebhookMessageSpy).toHaveBeenCalledWith(
        mockWebhookUrls[0],
        "Custom formatted message",
      );
    });
  });

  describe("log helper methods", () => {
    const mockMessage = "This is a test message";
    const logger = new DiscordWebhookLogger({ webhookUrls: mockWebhookUrls });

    it("will send error log", () => {
      const logSpy = jest.spyOn(logger as DiscordWebhookLogger, "log");
      logger.error(mockMessage);
      expect(logSpy).toHaveBeenCalledWith({
        level: "error",
        message: mockMessage,
      });
    });

    it("will send warn log", () => {
      const logSpy = jest.spyOn(logger as DiscordWebhookLogger, "log");
      logger.warn(mockMessage);
      expect(logSpy).toHaveBeenCalledWith({
        level: "warn",
        message: mockMessage,
      });
    });

    it("will send info log", () => {
      const logSpy = jest.spyOn(logger as DiscordWebhookLogger, "log");
      logger.info(mockMessage);
      expect(logSpy).toHaveBeenCalledWith({
        level: "info",
        message: mockMessage,
      });
    });

    it("will send http log", () => {
      const logSpy = jest.spyOn(logger as DiscordWebhookLogger, "log");
      logger.http(mockMessage);
      expect(logSpy).toHaveBeenCalledWith({
        level: "http",
        message: mockMessage,
      });
    });

    it("will send verbose log", () => {
      const logSpy = jest.spyOn(logger as DiscordWebhookLogger, "log");
      logger.verbose(mockMessage);
      expect(logSpy).toHaveBeenCalledWith({
        level: "verbose",
        message: mockMessage,
      });
    });

    it("will send debug log", () => {
      const logSpy = jest.spyOn(logger as DiscordWebhookLogger, "log");
      logger.debug(mockMessage);
      expect(logSpy).toHaveBeenCalledWith({
        level: "debug",
        message: mockMessage,
      });
    });
  });
});
