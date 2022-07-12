import { getPaths } from "../../utils/file.ts";
import { alfredEnv } from "../env/mod.ts";
import { Config } from "./conf.ts";

export const getUserConfig = (defaultConfig?: {
  [key: string]: unknown;
}): Config => {
  const { workflowData } = alfredEnv;

  if (workflowData) {
    return new Config({
      cwd: workflowData,
      configName: "user-config",
      defaults: defaultConfig,
    });
  } else {
    console.error(
      "I cannot seem to find a workflow data directory. Have you set the workflow bundle id? Reverting to TMP dir",
    );
  }

  return new Config({
    cwd: getPaths().tmpdir,
    configName: "user-config-alfred-temp",
    defaults: defaultConfig,
  });
};
