import { getUserConfig } from "./config/mod.ts";
import { getUserCache } from "./cache/mod.ts";
import { Config } from "./config/conf.ts";
import { Cache } from "./cache/cache.ts";
export { Icons } from "./icon/mod.ts";
export { output } from "./output/mod.ts";
export { alfredEnv as env } from "./env/mod.ts";

/**
 * Stripped input (first argument coming from Alfred)
 */
export const input: string = (Deno.args[0] || "").trim();

/**
 * Log something to stderr, which shows up while debugging (but does not affect the UI)
 */
export const log = (output: unknown): void => {
  console.error(output);
};

/**
 * Get user config
 *
 * @param defaultConfig Default config
 */
export const userConfig = (defaultConfig?: {
  [key: string]: unknown;
}): Config => getUserConfig(defaultConfig);

/**
 * Get user cache
 *
 * @param version Version
 */
export const userCache = (name: string, version?: string): Cache => getUserCache(name, version);
