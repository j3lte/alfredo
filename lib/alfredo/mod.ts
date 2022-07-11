import type { AlfredEnv, AlfredMeta, ScriptItem, ScriptOutput } from "./typed.d.ts";
import { arch } from "../../deps.ts";
// import { CacheConf } from "./cache/mod.ts";

const getIcon = (name: string) =>
  `/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/${name}.icns`;
const getEnv = (key: string) => Deno.env.get(`alfred_${key}`) as string;

/**
 * Main Alfred task runner
 */
export class Alfredo {
  /**
   * Meta information regarding the workflow
   */
  meta: AlfredMeta = {
    name: getEnv("workflow_name"),
    version: getEnv("workflow_version"),
    uid: getEnv("workflow_uid"),
    bundleId: getEnv("workflow_bundleid"),
  };

  /**
   * Environment information regarding Alfred/workflow
   */
  alfred: AlfredEnv = {
    version: getEnv("version"),
    theme: getEnv("theme"),
    themeBackground: getEnv("theme_background"),
    themeSelectionBackground: getEnv("theme_selection_background"),
    themeSubtext: Number(getEnv("theme_subtext")),
    data: getEnv("workflow_data"),
    cache: getEnv("workflow_cache"),
    preferences: getEnv("preferences"),
    preferencesLocalHash: getEnv("preferences_localhash"),
  };

  /**
   * This is the input coming from the user, usually represented as ```{query}``` in Alfred
   */
  input = Deno.args[2];
  /**
   * This is set by Alfred, when debugging the workflow
   */
  debug = getEnv("debug") === "1";

  /**
   * Icon set
   */
  icon = {
    get: getIcon,
    info: getIcon("ToolbarInfo"),
    warning: getIcon("AlertCautionIcon"),
    error: getIcon("AlertStopIcon"),
    alert: getIcon("Actions"),
    like: getIcon("ToolbarFavoritesIcon"),
    delete: getIcon("ToolbarDeleteIcon"),
  };

  constructor() {}

  /**
   * Show items in Alfred
   *
   * @param items Items to show in Alfred
   * @param variables (Optional) Variables (haven't got that working yet)
   * @param interval (Optional) Rerun interval in seconds (should be between 0.1 and 5.0)
   */
  output(
    items: ScriptItem[],
    variables?: { [key: string]: string },
    interval?: number,
  ) {
    const data: ScriptOutput = {
      items,
    };

    if (
      typeof variables !== "undefined" &&
      Object.keys(variables).keys.length !== 0
    ) {
      data.variables = variables;
    }

    if (typeof interval === "number" && interval > 0.1 && interval <= 5) {
      data.rerun = interval;
    }

    console.log(JSON.stringify(data, null, "\t"));
  }

  /**
   * Log something to stderr, which shows up while debugging (but does not affect the UI)
   *
   * @param text Text to log
   */
  log(text: string) {
    console.error(text);
  }

  /**
   * Show error in Alfred
   *
   * @param error Error to show
   */
  async error(error: Error) {
    const version = await arch();

    const copy = [
      `    `,
      `  \`\`\``,
      `  ${error.stack}`,
      `  \`\`\``,
      `  -`,
      `  ${this.meta.name} ${this.meta.version}`,
      `  Alfred ${this.alfred.version}`,
      `  ${Deno.build.os} ${version}`,
      `    `,
    ]
      .join("\n")
      .trim();

    const item: ScriptItem = {
      title: error.stack ? `${error.name}: ${error.message}` : error.toString(),
      subtitle: "Press ⌘L to see the full error and ⌘C to copy it.",
      valid: false,
      text: {
        copy,
        largetype: error.stack ?? copy,
      },
      icon: {
        path: this.icon.error,
      },
    };

    this.output([item]);
  }
}

export const alfredo = new Alfredo();
