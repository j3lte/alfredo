import { join, dotprop } from "../../../deps.ts";
import { alfredEnv } from "../env/mod.ts";

const userConfigPath = alfredEnv.workflowData || Deno.cwd();
const configFile = join(userConfigPath, "user-config.json");

class AlfredoConfig {
  #store: { [key: string]: unknown } = {};

  constructor() {
    try {
      const file = Deno.readTextFileSync(configFile);
      const config = JSON.parse(file) as { [key: string]: unknown };

      this.#store = config;
      // deno-lint-ignore no-empty
    } catch (error) {}
  }

  saveConfig() {
    try {
      Deno.writeTextFileSync(
        configFile,
        JSON.stringify(this.#store, null, "\t")
      );
    } catch (error) {
      console.error(`Error trying to write the store!`, error);
    }
  }

  get<T>(key: string, defaultValue: T) {
    return dotprop.getProperty(this.#store, key, defaultValue);
  }

  has(key: string) {
    return dotprop.hasProperty(this.#store, key);
  }

  get size() {
    return Object.keys(this.#store).length;
  }

  *[Symbol.iterator]() {
    for (const [key, value] of Object.entries(this.#store)) {
      yield [key, value];
    }
  }
}
