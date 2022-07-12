import { ensureDir, getProperty, hasProperty, join, parse, setProperty } from "../../../deps.ts";
import { alfredEnv } from "../env/mod.ts";

const userConfigPath = alfredEnv.workflowData;
const configFile = userConfigPath ? join(userConfigPath, "user-config.json") : null;

export class UserConfig {
  #store: { [key: string]: unknown } = {};

  constructor(create = false, defaultConfig: { [key: string]: unknown } = {}) {
    if (!configFile) {
      console.error(
        `It seems we don't have a path for our data! Have you set a Bundle ID for this workflow?`,
      );
      this.#store = defaultConfig;
      return;
    }

    try {
      const file = Deno.readTextFileSync(configFile);
      const config = JSON.parse(file) as { [key: string]: unknown };
      const store = Object.assign(defaultConfig, config);

      this.#store = store;
    } catch (error) {
      this.#store = defaultConfig;
      if (error instanceof Deno.errors.NotFound) {
        console.error(`Can't find the user config: ${configFile}`);
        if (create) {
          this.saveConfig();
        }
      } else {
        console.error(`Error opening user config: `, error);
      }
    }
  }

  async saveConfig() {
    if (!configFile) {
      console.error(
        `It seems we don't have a path for our data! Have you set a Bundle ID for this workflow?`,
      );
      return;
    }
    try {
      const parsedPath = parse(configFile);
      await ensureDir(parsedPath.dir);
      Deno.writeTextFileSync(
        configFile,
        JSON.stringify(this.#store, null, "\t"),
      );
    } catch (error) {
      console.error(`Error trying to write the store!`, error);
    }
  }

  get(key: string, defaultValue: unknown) {
    return getProperty(this.#store, key, defaultValue);
  }

  set(key: string, value: unknown) {
    return setProperty(this.#store, key, value);
  }

  has(key: string) {
    return hasProperty(this.#store, key);
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
