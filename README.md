# DiscordWebhookLogger

`DiscordWebhookLogger` is a TypeScript class for sending structured log messages to Discord via webhooks. It supports customizable log levels, message formatting, and multiple webhook URLs.


## Installation

`npm i discord-webhook-logger`


## Usage

### Basic Usage

```typescript
import { DiscordWebhookLogger } from "discord-webhook-logger";

const logger = new DiscordWebhookLogger({
  webhookUrls: [
    "https://discord.com/api/webhooks/your-webhook-id/your-webhook-token",
  ],
});

logger.info("This is an info message!");
logger.error("An error occurred!");
```


### Constructor

```typescript
new DiscordWebhookLogger({
  webhookUrls,
  levels?,
  format?,
}: {
  webhookUrls: string[];
  levels?: Record<string, LogLevelConfiguration>;
  format?: (level: LogLevelConfiguration, message: string) => string;
})
```

#### Parameters

- **`webhookUrls` (required)**: An array of Discord webhook URLs to send log messages to.
- **`levels` (optional)**: A record defining custom log level configurations. Defaults to `defaultLevelsConfiguration`.
- **`format` (optional)**: A function to format messages before sending. Defaults to `defaultFormatter`.


### Methods

#### `log(level: string, message: string): void`

Logs a message with the specified log level.

```typescript
logger.log("info", "This is a custom log message.");
```

#### Common Log Levels

- `error(message: string): void`
- `warn(message: string): void`
- `info(message: string): void`
- `http(message: string): void`
- `verbose(message: string): void`
- `debug(message: string): void`
- `silly(message: string): void`

```typescript
logger.error("An error occurred!");
logger.debug("Debugging information.");
```


### Customization

#### Custom Log Levels

You can define custom log levels by providing a `levels` configuration.

```typescript
const customLevels = {
  customLevel: { color: "blue", priority: 0 },
};

const logger = new DiscordWebhookLogger({
  webhookUrls: [
    "https://discord.com/api/webhooks/your-webhook-id/your-webhook-token",
  ],
  levels: customLevels,
});

logger.log("customLevel", "A custom level log message!");
```

#### Custom Message Formatting

Provide a custom formatter function to control how messages are formatted.

```typescript
const customFormatter = (level, message) => `[${level.priority}] ${message}`;

const logger = new DiscordWebhookLogger({
  webhookUrls: [
    "https://discord.com/api/webhooks/your-webhook-id/your-webhook-token",
  ],
  format: customFormatter,
});

logger.info("This message is formatted with a custom formatter!");
```

## Requirements

- Node.js version 18 or higher.
- Discord webhook URLs.


## License

This code is provided under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute it as needed.


## Contribution

Feel free to submit issues or contribute improvements to this class.
