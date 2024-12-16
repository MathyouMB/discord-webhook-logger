import * as index from "../lib/index";

test("DiscordLogger is be exported from index.ts", () => {
  expect(index.DiscordLogger).toBeDefined();
});
