/**
 * Returns the location of an Apple Icon in the filesystem
 *
 * @param name Icon name
 */
export const getIcon = (name: string) =>
  `/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/${name}.icns`;

/**
 * Default icons
 */
export const icon = {
  get: getIcon,
  info: getIcon("ToolbarInfo"),
  warning: getIcon("AlertNoteIcon"),
  error: getIcon("AlertStopIcon"),
  alert: getIcon("Actions"),
  like: getIcon("ToolbarFavoritesIcon"),
  delete: getIcon("ToolbarDeleteIcon"),
  finder: getIcon("FinderIcon"),
};
