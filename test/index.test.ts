import * as index from "../lib/index";

it("will export DiscordLogger from index.ts", () => {
  expect(index.DiscordLogger).toBeDefined();
});
