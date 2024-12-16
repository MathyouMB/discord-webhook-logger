import { DiscordWebhookLogger } from "./lib";

const logger = new DiscordWebhookLogger({
  webhookUrls: [
    "https://discord.com/api/webhooks/1316625557777023027/88zfwzSV7RzsN2W_Fb1J-XeDgNz-jZ7CAu9MuuDhRWvz5BbZ6cKHEEWjaivJBe6NAMjP",
  ],
});

logger.error("This is an error message");
