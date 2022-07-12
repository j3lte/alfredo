/**
 * Check permissions before running a script. This will return a boolean to see if all permissions have been `granted`.
 *
 * @param flags a list of one or more of the following flags: ```["run", "read", "write", "net", "env", "ffi", "hrtime"]```
 * @param showLog Show an error in the console
 * @returns
 */

export const withPermissions = async (
  flags: Deno.PermissionName[] = [],
  showLog = true,
): Promise<boolean> => {
  let hasPermissions = true;

  await Promise.all(
    flags.map(async (name) => {
      const { state } = await Deno.permissions.request({
        name,
      });
      if (state !== "granted") {
        hasPermissions = false;
        if (showLog) {
          console.error(
            `I need permissions for ${name}. You will need to run with permissions: '--allow-${name}'`,
          );
        }
      }
    }),
  );

  return hasPermissions;
};
