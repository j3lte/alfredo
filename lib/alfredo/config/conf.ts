import { dirname as pathDirname, resolve as pathResolve } from "../../../deps.ts";

const plainObject = () => Object.create(null);
const INTERNAL_KEY = "__internal__";

export interface ConfigParameters {
  cwd: string;
  configName?: string;
  fileExtension?: string;
  projectSuffix?: string;
  // deno-lint-ignore ban-types
  serialize?: Function;
  // deno-lint-ignore ban-types
  deserialize?: Function;
  accessPropertiesByDotNotation?: boolean;
  // deno-lint-ignore ban-types
  defaults?: {} | null;
}
const checkValueType = (key: string, value: unknown) => {
  const nonJsonTypes = ["undefined", "symbol", "function"];
  const type = typeof value;
  if (nonJsonTypes.includes(type)) {
    throw new TypeError(
      `Setting a value of type \`${type}\` for key \`${key}\` is not allowed as it's not supported by JSON`,
    );
  }
};
export class Config {
  private _options: ConfigParameters = {
    cwd: "",
    configName: "config",
    fileExtension: "json",
    serialize: (value: string) => JSON.stringify(value, null, "\t"),
    deserialize: JSON.parse,
    accessPropertiesByDotNotation: false,
    defaults: null,
  };
  defaultValues: Record<string, unknown> = {};
  // deno-lint-ignore ban-types
  serialize: Function;
  // deno-lint-ignore ban-types
  deserialize: Function;
  path: string;
  constructor(options: ConfigParameters) {
    this._options = {
      ...this._options,
      ...options,
    };
    // Try to locate path's
    if (!this._options.cwd) {
      throw new Error("I need a working directory!");
    }
    // Did we provided default value for our configs?
    if (this._options.defaults) {
      this.defaultValues = this._options.defaults;
    }
    // make sure we have serializer
    if (!this._options.serialize) {
      throw new Error(
        "Invalid serializer. Please specify the `serialize` option.",
      );
    }
    if (!this._options.deserialize) {
      throw new Error(
        "Invalid serializer. Please specify the `deserialize` option.",
      );
    }
    this.serialize = this._options.serialize;
    this.deserialize = this._options.deserialize;
    const fileExtension = this._options.fileExtension ? `.${this._options.fileExtension}` : "";
    this.path = pathResolve(
      this._options.cwd,
      `${this._options.configName}${fileExtension}`,
    );
  }
  private _ensureDirectory() {
    // Ensure the directory exists as it could have been deleted in the meantime.
    Deno.mkdirSync(pathDirname(this.path), {
      recursive: true,
    });
  }
  private _write(value: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(this.serialize(value));
    try {
      Deno.writeFileSync(this.path, data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  private _containsReservedKey(key: string) {
    if (typeof key === "object") {
      const firstKey = Object.keys(key)[0];
      if (firstKey === INTERNAL_KEY) {
        return true;
      }
    }
    if (typeof key !== "string") {
      return false;
    }
    if (this._options.accessPropertiesByDotNotation) {
      if (key.startsWith(`${INTERNAL_KEY}.`)) {
        return true;
      }
      return false;
    }
    return false;
  }
  has(key: string) {
    if (this._options.accessPropertiesByDotNotation) {
      // return dotProp.has(this.store, key);
    }
    return key in this.store;
  }
  reset(...keys: string[]) {
    if (!this.defaultValues) {
      return;
    }
    for (const key of keys) {
      this.set(key, this.defaultValues[key]);
    }
  }
  delete(key: string) {
    const { store } = this;
    if (this._options.accessPropertiesByDotNotation) {
      //dotProp.delete(store, key);
    } else {
      delete store[key];
    }
    this.store = store;
  }
  clear() {
    this.store = plainObject();
  }
  get size() {
    return Object.keys(this.store).length;
  }
  get store() {
    try {
      const decoder = new TextDecoder("utf-8");
      let data = Deno.readFileSync(this.path);
      data = this.deserialize(decoder.decode(data));
      return Object.assign(plainObject(), data);
    } catch (error) {
      // if nothing is found, return plain object
      if (error.name === "NotFound") {
        this._ensureDirectory();
        return plainObject();
      }
      throw error;
    }
  }
  set store(value) {
    this._ensureDirectory();
    this._write(value);
  }
  get options() {
    return this._options;
  }
  get(key: string, defaultValue: unknown = null) {
    return key in this.store ? this.store[key] : defaultValue;
  }
  set(key: string, value: unknown) {
    if (typeof key !== "string" && typeof key !== "object") {
      throw new TypeError(
        `Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof key}`,
      );
    }
    if (typeof key !== "object" && value === undefined) {
      throw new TypeError("Use `delete()` to clear values");
    }
    if (this._containsReservedKey(key)) {
      throw new TypeError(
        `Please don't use the ${INTERNAL_KEY} key, as it's used to manage this module internal operations.`,
      );
    }
    const { store } = this;
    const set = (key: string, value: unknown) => {
      checkValueType(key, value);
      if (this._options.accessPropertiesByDotNotation) {
        //dotProp.set(store, key, value);
      } else {
        store[key] = value;
      }
    };
    if (typeof key === "object") {
      const object = key;
      for (const [key, value] of Object.entries(object)) {
        set(key, value);
      }
    } else {
      set(key, value);
    }
    this.store = store;
  }
  *[Symbol.iterator]() {
    for (const [key, value] of Object.entries(this.store)) {
      yield [key, value];
    }
  }
}
