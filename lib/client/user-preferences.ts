import { join, parseBuffer } from "../../deps.ts";

const getHome = () => {
  return Deno.env.get("HOME");
};

export interface Preferences {
  version?: number;
  path?: string;
}

const getPreferences = async (): Promise<Preferences> => {
  let errorMessage = "";

  const userHome = getHome() || "";
  const settings3 = join(
    userHome,
    "/Library/Preferences/com.runningwithcrayons.Alfred-Preferences-3.plist",
  );
  const settings = join(
    userHome,
    "/Library/Preferences/com.runningwithcrayons.Alfred-Preferences.plist",
  );

  const prefsJsonPath = join(
    userHome,
    "/Library/Application Support/Alfred/prefs.json",
  );

  // PREFS JSON

  try {
    const prefsPathFile = await Deno.readTextFile(prefsJsonPath);
    const { current: currentPrefsPath } = JSON.parse(prefsPathFile) as {
      current?: string;
    };

    if (currentPrefsPath) {
      return {
        path: currentPrefsPath,
      } as Preferences;
    }
  } catch (_error) {
    errorMessage = `Alfred preferences not found at location ${prefsJsonPath}`;
  }

  // PREFS PLIST Alfred 3

  try {
    const bplistFile = await Deno.readFile(settings3);
    const { syncfolder = "~/Library/Application Support/Alfred 3" } = parseBuffer(bplistFile) as {
      syncfolder?: string;
    };
    const prefsPath = join(syncfolder, "Alfred.alfredpreferences");

    return {
      version: 3,
      path: prefsPath,
    };
  } catch (error) {
    if (error.code === "EACCES") {
      errorMessage = `Permission denied to read Alfred 3 preferences at location ${settings3}`;
    }
  }

  // PREFS PLIST Alfred >3

  try {
    const bplistFile = await Deno.readFile(settings);
    const { syncfolder = "~/Library/Application Support/Alfred" } = parseBuffer(
      bplistFile,
    ) as { syncfolder?: string };
    const prefsPath = join(syncfolder, "Alfred.alfredpreferences");

    return {
      path: prefsPath,
    };
  } catch (error) {
    if (error.code === "EACCES") {
      errorMessage = `Permission denied to read Alfred preferences at location ${settings}`;
    }
  }

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  return {};
};

export const getWorkFlowDir = async () => {
  const prefs = await getPreferences();
  if (prefs && prefs.path) {
    return join(prefs.path, "workflows");
  }
  return null;
};
