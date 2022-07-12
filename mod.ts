export type { Config, ConfigParameters } from "./lib/alfredo/config/conf.ts";
export type { Cache, CacheOptions } from "./lib/alfredo/cache/cache.ts";
export type { AlfredEnv } from "./lib/alfredo/env/mod.ts";
export type { Icons } from "./lib/alfredo/icon/mod.ts";
export type {
  ActionType,
  IconType,
  ScriptItem,
  ScriptItemType,
  ScriptOutput,
} from "./lib/alfredo/output/types.d.ts";

export { withPermissions } from "./lib/utils/permissions.ts";
export * as alfredo from "./lib/alfredo/mod.ts";
export const _VERSION = "0.4.1";
