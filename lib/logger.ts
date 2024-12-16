import { defaultFormatter } from "./formatters";
import {
  defaultLevelsConfiguration,
  LogLevelConfiguration,
} from "./log-level-configuration";

export class DiscordWebhookLogger {
  private webhookUrls: string[];
  private levels: Record<string, LogLevelConfiguration>;
  private formatter: (level: LogLevelConfiguration, message: string) => string;

  constructor({
    webhookUrls,
    levels,
    format,
  }: {
    webhookUrls: string[];
    levels?: Record<string, LogLevelConfiguration>;
    format?: (level: LogLevelConfiguration, message: string) => string;
  }) {
    this.webhookUrls = webhookUrls;
    this.webhookUrls.forEach((url) => {
      if (!this.validDiscordWebhookUrl(url)) {
        throw new Error(`Invalid Discord webhook URL: ${url}`);
      }
    });
    this.levels = { ...defaultLevelsConfiguration, ...levels };
    this.formatter = format || defaultFormatter;
  }

  public log(level: string, message: string): void {
    const levelConfiguration = this.levels[level];
    if (!levelConfiguration) {
      throw new Error(`Unknown level: ${level}`);
    }

    const formattedMessage = this.formatter(levelConfiguration, message);

    this.webhookUrls.forEach(async (webhookUrl) => {
      await this.sendWebhookMessage(webhookUrl, formattedMessage);
    });
  }

  public error(message: string): void {
    this.log("error", message);
  }

  public warn(message: string): void {
    this.log("warn", message);
  }

  public info(message: string): void {
    this.log("info", message);
  }

  public http(message: string): void {
    this.log("http", message);
  }

  public verbose(message: string): void {
    this.log("verbose", message);
  }

  public debug(message: string): void {
    this.log("debug", message);
  }

  public silly(message: string): void {
    this.log("silly", message);
  }

  private async sendWebhookMessage(
    webhookUrl: string,
    message: string,
  ): Promise<void> {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: message }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to send message to Discord webhook: ${response.statusText}`,
      );
    }
  }

  private validDiscordWebhookUrl(url: string): boolean {
    return url.startsWith("https://discord.com/api/webhooks/");
  }
}
