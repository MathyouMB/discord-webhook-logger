import { defaultFormatter, FormatterInput } from "./formatters";

interface LogMessage {
  level: string;
  message: string;
  discordTargetId?: string;
  additionalData?: any;
}

export class DiscordWebhookLogger {
  private webhookUrls: string[];
  private formatter: (input: FormatterInput) => string;

  constructor({
    webhookUrls,
    format,
  }: {
    webhookUrls: string[];
    format?: (input: FormatterInput) => string;
  }) {
    this.webhookUrls = webhookUrls;
    this.webhookUrls.forEach((url) => {
      if (!this.validDiscordWebhookUrl(url)) {
        throw new Error(`Invalid Discord webhook URL: ${url}`);
      }
    });
    this.formatter = format || defaultFormatter;
  }

  public log({
    level,
    message,
    discordTargetId,
    additionalData,
  }: LogMessage): void {
    const formattedMessage = this.formatter({
      level,
      message,
      discordTargetId,
      additionalData,
    });

    this.webhookUrls.forEach(async (webhookUrl) => {
      await this.sendWebhookMessage(webhookUrl, formattedMessage);
    });
  }

  public error(message: string): void {
    this.log({
      level: "error",
      message,
    });
  }

  public warn(message: string): void {
    this.log({
      level: "warn",
      message,
    });
  }

  public info(message: string): void {
    this.log({
      level: "info",
      message,
    });
  }

  public http(message: string): void {
    this.log({
      level: "http",
      message,
    });
  }

  public verbose(message: string): void {
    this.log({
      level: "verbose",
      message,
    });
  }

  public debug(message: string): void {
    this.log({
      level: "debug",
      message,
    });
  }

  public silly(message: string): void {
    this.log({
      level: "silly",
      message,
    });
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
