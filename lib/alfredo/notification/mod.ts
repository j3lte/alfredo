import { withPermissions } from "../../utils/permissions.ts";

/**
 * Show a notification
 */
export const showNotification = async (
  text: string,
  { title, subtitle }: { title?: string; subtitle?: string } = {},
) => {
  if (!(await withPermissions(["run"]))) {
    return;
  }

  const msg = [
    "display notification",
    `"${text}"`,
    title ? `with title "${title}"` : "",
    subtitle ? `subtitle "${subtitle}"` : "",
  ].join(" ");

  const p = Deno.run({
    cmd: ["osascript", "-e", msg],
  });

  await p.status();
};
