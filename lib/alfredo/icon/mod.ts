/**
 * Returns the location of an Apple Icon in the filesystem
 *
 * @param name Icon name
 */
export const getIcon = (name: string) =>
  `/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/${name}.icns`;

/**
 * Default system icons
 */
export const Icons = {
  /**
   * Get path to an icon in the system
   *
   * @param name Icon name
   */
  get: getIcon,
  /**
   * Path to icon for: ToolbarInfo
   */
  info: getIcon("ToolbarInfo"),
  /**
   * Path to icon for: AlertNoteIcon
   */
  warning: getIcon("AlertNoteIcon"),
  /**
   * Path to icon for: AlertStopIcon
   */
  error: getIcon("AlertStopIcon"),
  /**
   * Path to icon for: Actions
   */
  alert: getIcon("Actions"),
  /**
   * Path to icon for: ToolbarFavoritesIcon
   */
  like: getIcon("ToolbarFavoritesIcon"),
  /**
   * Path to icon for: ToolbarDeleteIcon
   */
  delete: getIcon("ToolbarDeleteIcon"),
  /**
   * Path to icon for: FinderIcon
   */
  finder: getIcon("FinderIcon"),
};
