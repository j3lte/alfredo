import { ScriptItem, ScriptOutput } from "./types.d.ts";

/**
 * Show items in Alfred
 *
 * @param items Items to show in Alfred
 * @param interval (Optional) Rerun interval in seconds (should be between 0.1 and 5.0)
 */
export const output = (items: ScriptItem[], interval?: number) => {
  const data: ScriptOutput = {
    items,
  };

  if (typeof interval === "number" && interval > 0.1 && interval <= 5) {
    data.rerun = interval;
  }

  console.log(JSON.stringify(data, null, "\t"));
};
