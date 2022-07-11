interface Checks {
  env?: boolean;
  read?: boolean;
  write?: boolean;
}

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
        "You will need to run with env-permissions: '--allow-env' or '-A'",
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
        "You will need to run with read-permissions: '--allow-read' or '-A'",
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
        "You will need to run with write-permissions: '--allow-write' or '-A'",
      );
      return false;
    }
  }

  return true;
};
