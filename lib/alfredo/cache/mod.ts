import { snakeCase } from "../../../deps.ts";
import { getPaths } from "../../utils/file.ts";
import { alfredEnv } from "../env/mod.ts";
import { Cache } from "./cache.ts";

export const getUserCache = (name: string, version?: string) => {
  const { workflowCache } = alfredEnv;

  if (workflowCache) {
    return new Cache({
      cwd: workflowCache,
      configName: snakeCase(`user-cache-${name}`),
      version,
    });
  } else {
    console.error(
      "I cannot seem to find a workflow cache directory. Have you set the workflow bundle id? Reverting to TMP dir",
    );
  }

  return new Cache({
    cwd: getPaths().tmpdir,
    configName: snakeCase(`user-cache-alfred-temp-${name}`),
    version,
  });
};
