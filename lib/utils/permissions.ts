interface Checks {
  env?: boolean;
  read?: boolean;
  write?: boolean;
}

/**
 * Do a check for Deno params. This is for
 *
 * env: Environment (script should run with --allow-env)
 * read: Read files (script should run with --allow-read)
 * write: Write files (script should run with --allow-write)
 */
export const checkPermissions = async ({ env, read, write }: Checks = {}) => {
  const envCheck = typeof env === "undefined" ? true : env;
  const readCheck = typeof read === "undefined" ? true : read;
  const writeCheck = typeof write === "undefined" ? true : write;

  if (envCheck) {
    const { state: envStatus } = await Deno.permissions.request({
      name: "env",
    });
    if (envStatus !== "granted") {
      console.log(
        "You will need to run with permissions: '--allow-env' or '-A'",
      );
      return false;
    }
  }

  if (readCheck) {
    const { state: readStatus } = await Deno.permissions.request({
      name: "read",
    });
    if (readStatus !== "granted") {
      console.log(
        "You will need to run with permissions: '--allow-read' or '-A'",
      );
      return false;
    }
  }

  if (writeCheck) {
    const { state: writeStatus } = await Deno.permissions.request({
      name: "write",
    });
    if (writeStatus !== "granted") {
      console.log(
        "You will need to run with permissions: '--allow-write' or '-A'",
      );
      return false;
    }
  }

  return true;
};
