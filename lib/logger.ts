import {
  defaultLevelsConfiguration,
  LogLevelConfiguration,
} from "./log-level-configuration";

export class DiscordLogger {
  private webhookUrls: string[];
  private levels: Record<string, LogLevelConfiguration>;

  constructor({
    webhookUrls,
    levels,
  }: {
    webhookUrls: string[];
    levels?: Record<string, LogLevelConfiguration>;
  }) {
    this.webhookUrls = webhookUrls;
    this.webhookUrls.forEach((url) => {
      if (!this.validDiscordWebhookUrl(url)) {
        throw new Error(`Invalid Discord webhook URL: ${url}`);
      }
    });
    this.levels = { ...defaultLevelsConfiguration, ...levels };
  }

  public log(level: string, message: string): void {
    const levelConfiguration = this.levels[level];
    if (!levelConfiguration) {
      throw new Error(`Unknown level: ${level}`);
    }

    const color = levelConfiguration.color;
    console.log(`\x1b[1m\x1b[3${color}m${level}\x1b[0m: ${message}`);

    this.webhookUrls.forEach(async (webhookUrl) => {
      await this.sendWebhookMessage(webhookUrl, message);
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
    console.log(`Sending message to ${webhookUrl}: ${message}`);
  }

  private validDiscordWebhookUrl(url: string): boolean {
    return url.startsWith("https://discord.com/api/webhooks/");
  }
}
