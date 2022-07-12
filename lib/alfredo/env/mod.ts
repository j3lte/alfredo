export interface AlfredEnv {
  /**
   * Name of the currently running workflow
   */
  workflowName?: string;
  /**
   * Current workflow version
   */
  workflowVersion?: string;
  /**
   * Unique ID of the currently running workflow
   */
  workflowUid?: string;
  /**
   * The bundle ID of the current running workflow
   */
  workflowBundleId?: string;
  /**
   * Location of the non-volatile workflow data
   *
   * Recommended location: `~/Library/Application Support/Alfred/Workflow Data/[bundle id]`
   */
  workflowData?: string;
  /**
   * Location of the volatile workflow data
   *
   * Recommended location: `~/Library/Caches/com.runningwithcrayons.Alfred/Workflow Data/[bundle id]`
   */
  workflowCache?: string;

  /**
   * This is the location of the Alfred.alfredpreferences. If a user has synced their settings, this will allow you to find out where their settings are regardless of sync state.
   */
  preferences?: string;
  /**
   * From Alfred 2.4, non-synced preferences are moving out of the standard macOS preferences due to a Yosemite issue with prefs inheritance between Alfred Preferences.app and Alfred 2.app.
   *
   * Any local (Mac-specific) preferences are now stored within Alfred.alfredpreferences under …/preferences/local/[alfred_preferences_localhash]/ instead and use Alfred's own preferences framework.
   */
  preferencesLocalHash?: string;

  /**
   * Current theme used
   */
  theme?: string;
  /**
   * If you're creating icons on the fly, this allows you to find out the colour of the theme background.
   */
  themeBackground?: string;
  /**
   * The colour of the selected result.
   */
  themeSelectionBackground?: string;
  /**
   * Find out what subtext mode the user has selected in the Appearance preferences.
   *
   * > Usability note: This is available so developers can tweak the result text based on the user's selected mode, but a workflow's result text should not be bloated unnecessarily based on this, as the main reason users generally hide the subtext is to make Alfred look cleaner.
   */
  themeSubtext: number;

  /**
   * Find out which version and build the user is currently running. This may be useful if your workflow depends on a particular Alfred version's features.
   */
  version?: string;
  /**
   * Find out which version and build the user is currently running. This may be useful if your workflow depends on a particular Alfred version's features.
   */
  versionBuild?: string;

  /**
   * If the user currently has the debug panel open for this workflow. This variable is only set if the user is debugging
   */
  debug: boolean;
}

export const getAlfredEnv = (key: string) => Deno.env.get(`alfred_${key}`);

export const alfredEnv: AlfredEnv = {
  workflowName: getAlfredEnv("workflow_name"),
  workflowVersion: getAlfredEnv("workflow_version"),
  workflowUid: getAlfredEnv("workflow_uid"),
  workflowBundleId: getAlfredEnv("workflow_bundleid"),
  workflowData: getAlfredEnv("workflow_data"),
  workflowCache: getAlfredEnv("workflow_cache"),
  preferences: getAlfredEnv("preferences"),
  preferencesLocalHash: getAlfredEnv("preferences_localhash"),
  theme: getAlfredEnv("theme"),
  themeBackground: getAlfredEnv("theme_background"),
  themeSelectionBackground: getAlfredEnv("theme_selection_background"),
  themeSubtext: Number(getAlfredEnv("theme_subtext")),
  version: getAlfredEnv("version"),
  versionBuild: getAlfredEnv("version_build"),
  debug: getAlfredEnv("debug") === "1",
};
