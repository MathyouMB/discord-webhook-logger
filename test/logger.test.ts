import { DiscordLogger } from "../lib/logger";

const mockWebhookUrls = [
  "https://discord.com/api/webhooks/1234567890/ABCDEFGHIJKLMN1234567890",
];

describe("DiscordLogger", () => {
  describe("initialization", () => {
    describe("webhookUrls", () => {
      test("will initialize with given webhookUrls", () => {
        const logger = new DiscordLogger({ webhookUrls: mockWebhookUrls });
        expect(logger).toBeInstanceOf(DiscordLogger);
      });

      test("will store the webhookUrls correctly", () => {
        const logger = new DiscordLogger({ webhookUrls: mockWebhookUrls });
        expect((logger as any).webhookUrls).toEqual(mockWebhookUrls);
      });

      test("will throw an error if an invalid webhook URL is provided", () => {
        const invalidWebhookUrls = ["https://example.com/webhooks"];
        expect(
          () => new DiscordLogger({ webhookUrls: invalidWebhookUrls }),
        ).toThrow(`Invalid Discord webhook URL: ${invalidWebhookUrls[0]}`);
      });
    });

    describe("levels", () => {
      test("will use default levels configuration if none is provided", () => {
        const logger = new DiscordLogger({ webhookUrls: mockWebhookUrls });

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

      test("will merge custom levels configuration with default", () => {
        const customLevels = {
          custom: { level: 7, color: "white" },
        };
        const logger = new DiscordLogger({
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

      test("will override default levels configuration with custom", () => {
        const customLevels = {
          error: { level: 7, color: "white" },
        };
        const logger = new DiscordLogger({
          webhookUrls: mockWebhookUrls,
          levels: customLevels,
        });

        expect((logger as any).levels["error"]).toEqual(customLevels["error"]);
      });
    });
  });

  describe("log", () => {
    test("will throw an error if an unknown level is logged", () => {
      const logger = new DiscordLogger({ webhookUrls: mockWebhookUrls });

      expect(() => logger.log("unknown", "This is a test message")).toThrow(
        "Unknown level: unknown",
      );
    });

    test("will log messages with the correct color", () => {
      const logger = new DiscordLogger({ webhookUrls: mockWebhookUrls });
      console.log = jest.fn();

      logger.log("info", "This is an info message");

      expect(console.log).toHaveBeenCalledWith(
        "\x1b[1m\x1b[3blueminfo\x1b[0m: This is an info message",
      );
    });

    test("will send messages to all webhook URLs", async () => {
      const mockMessage = "This is an info message";
      const logger = new DiscordLogger({ webhookUrls: mockWebhookUrls });
      const sendWebhookMessageSpy = jest
        .spyOn(logger as any, "sendWebhookMessage")
        .mockImplementation(async () => {});

      logger.log("info", mockMessage);

      expect(sendWebhookMessageSpy).toHaveBeenCalledWith(
        mockWebhookUrls[0],
        mockMessage,
      );
    });
  });

  describe("log helper methods", () => {
    const mockMessage = "This is a test message";
    const logger = new DiscordLogger({ webhookUrls: mockWebhookUrls });

    test("will send error log", () => {
      const logSpy = jest.spyOn(logger as DiscordLogger, "log");
      logger.error(mockMessage);
      expect(logSpy).toHaveBeenCalledWith("error", mockMessage);
    });

    test("will send warn log", () => {
      const logSpy = jest.spyOn(logger as DiscordLogger, "log");
      logger.warn(mockMessage);
      expect(logSpy).toHaveBeenCalledWith("warn", mockMessage);
    });

    test("will send info log", () => {
      const logSpy = jest.spyOn(logger as DiscordLogger, "log");
      logger.info(mockMessage);
      expect(logSpy).toHaveBeenCalledWith("info", mockMessage);
    });

    test("will send http log", () => {
      const logSpy = jest.spyOn(logger as DiscordLogger, "log");
      logger.http(mockMessage);
      expect(logSpy).toHaveBeenCalledWith("http", mockMessage);
    });

    test("will send verbose log", () => {
      const logSpy = jest.spyOn(logger as DiscordLogger, "log");
      logger.verbose(mockMessage);
      expect(logSpy).toHaveBeenCalledWith("verbose", mockMessage);
    });

    test("will send debug log", () => {
      const logSpy = jest.spyOn(logger as DiscordLogger, "log");
      logger.debug(mockMessage);
      expect(logSpy).toHaveBeenCalledWith("debug", mockMessage);
    });
  });
});
