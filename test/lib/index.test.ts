import * as index from "../../src/lib/index";

it("will export DiscordWebhookLogger from index.ts", () => {
  expect(index.DiscordWebhookLogger).toBeDefined();
});
