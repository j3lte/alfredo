import { Config, ConfigParameters } from "../config/conf.ts";

interface CacheOptions extends ConfigParameters {
  version?: string;
}

export class Cache extends Config {
  version: string;

  constructor(options: CacheOptions) {
    super(options);
    this.version = options.version || "1.0.0";
  }

  get(key: string, options: { ignoreMaxAge?: boolean }) {
    options = options || {};
    if (options.ignoreMaxAge !== true && this.isExpired(key)) {
      super.delete(key);
      return;
    }
    const item = super.get(key);
    return item && item.data;
  }

  set(
    key: string | { [key: string]: unknown },
    val: unknown,
    opts?: { maxAge?: number },
  ) {
    if (typeof key === "object") {
      opts = (val || {}) as { maxAge?: number };
      const timestamp = typeof opts.maxAge === "number" ? Date.now() + opts.maxAge : undefined;
      Object.keys(key).forEach((k) => {
        super.set(k, {
          timestamp,
          version: this.version,
          data: key[k],
        });
      });
    } else {
      super.set(key, {
        timestamp: typeof opts?.maxAge === "number" ? Date.now() + opts.maxAge : undefined,
        version: this.version,
        data: val,
      });
    }
  }

  has(key: string) {
    if (!super.has(key)) {
      return false;
    }
    if (this.isExpired(key)) {
      super.delete(key);
      return false;
    }
    return true;
  }

  isExpired(key: string) {
    const item = super.get(key);
    if (!item) {
      return false;
    }
    const invalidTimestamp = item.timestamp && item.timestamp < Date.now();
    const invalidVersion = item.version !== this.version;
    return Boolean(invalidTimestamp || invalidVersion);
  }
}
