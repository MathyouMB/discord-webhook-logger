import { defaultFormatter } from "../lib/formatters";
import { defaultLevelsConfiguration } from "../lib/log-level-configuration";
import { DiscordWebhookLogger } from "../lib/logger";
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

    describe("levels", () => {
      it("will use default levels configuration if none is provided", () => {
        const logger = new DiscordWebhookLogger({
          webhookUrls: mockWebhookUrls,
        });

        expect((logger as any).levels).toEqual(
          expect.objectContaining({
            error: expect.any(Object),
            warn: expect.any(Object),
            info: expect.any(Object),
            http: expect.any(Object),
            verbose: expect.any(Object),
            debug: expect.any(Object),
            silly: expect.any(Object),
          }),
        );
      });

      it("will merge custom levels configuration with default", () => {
        const customLevels = {
          custom: { level: 7, color: "white", label: "CUSTOM" },
        };
        const logger = new DiscordWebhookLogger({
          webhookUrls: mockWebhookUrls,
          levels: customLevels,
        });

        expect((logger as any).levels).toEqual(
          expect.objectContaining({
            ...customLevels,
            error: expect.any(Object),
            warn: expect.any(Object),
            info: expect.any(Object),
            http: expect.any(Object),
            verbose: expect.any(Object),
            debug: expect.any(Object),
            silly: expect.any(Object),
          }),
        );
      });

      it("will override default levels configuration with custom", () => {
        const customLevels = {
          error: { level: 7, color: "white", label: "CUSTOM" },
        };
        const logger = new DiscordWebhookLogger({
          webhookUrls: mockWebhookUrls,
          levels: customLevels,
        });

        expect((logger as any).levels["error"]).toEqual(customLevels["error"]);
      });
    });
  });

  describe("log", () => {
    it("will throw an error if an unknown level is logged", () => {
      const logger = new DiscordWebhookLogger({ webhookUrls: mockWebhookUrls });

      expect(() => logger.log("unknown", "This is a test message")).toThrow(
        "Unknown level: unknown",
      );
    });

    it("will send messages to all webhook URLs", async () => {
      const mockMessage = "This is an info message";
      const logger = new DiscordWebhookLogger({ webhookUrls: mockWebhookUrls });
      const sendWebhookMessageSpy = jest
        .spyOn(logger as any, "sendWebhookMessage")
        .mockImplementation(async () => {});

      logger.log("info", mockMessage);

      expect(sendWebhookMessageSpy).toHaveBeenCalledWith(
        mockWebhookUrls[0],
        defaultFormatter(defaultLevelsConfiguration.info, mockMessage),
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

      logger.log("info", mockMessage);

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
      expect(logSpy).toHaveBeenCalledWith("error", mockMessage);
    });

    it("will send warn log", () => {
      const logSpy = jest.spyOn(logger as DiscordWebhookLogger, "log");
      logger.warn(mockMessage);
      expect(logSpy).toHaveBeenCalledWith("warn", mockMessage);
    });

    it("will send info log", () => {
      const logSpy = jest.spyOn(logger as DiscordWebhookLogger, "log");
      logger.info(mockMessage);
      expect(logSpy).toHaveBeenCalledWith("info", mockMessage);
    });

    it("will send http log", () => {
      const logSpy = jest.spyOn(logger as DiscordWebhookLogger, "log");
      logger.http(mockMessage);
      expect(logSpy).toHaveBeenCalledWith("http", mockMessage);
    });

    it("will send verbose log", () => {
      const logSpy = jest.spyOn(logger as DiscordWebhookLogger, "log");
      logger.verbose(mockMessage);
      expect(logSpy).toHaveBeenCalledWith("verbose", mockMessage);
    });

    it("will send debug log", () => {
      const logSpy = jest.spyOn(logger as DiscordWebhookLogger, "log");
      logger.debug(mockMessage);
      expect(logSpy).toHaveBeenCalledWith("debug", mockMessage);
    });
  });
});
