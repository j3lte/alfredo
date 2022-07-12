export { alfredEnv as env } from "./env/mod.ts";
export { icon } from "./icon/mod.ts";
export { output } from "./output/mod.ts";
export * from "./output/types.d.ts";

/**
 * Stripped input (first argument coming from Alfred)
 */
export const input = (Deno.args[0] || "").trim();

/**
 * Log something to stderr, which shows up while debugging (but does not affect the UI)
 *
 * @param text Text to log
 */
export const log = (text: string) => {
  console.error(text);
};
