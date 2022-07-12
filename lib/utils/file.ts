/**
 * Check if a folder is empty in Deno
 *
 * @param path Local path to check
 * @returns boolean
 */
export const isDirEmpty = async (path: string) => {
  let i = 0;
  for await (const _ of Deno.readDir(path)) {
    i += 1;
  }
  return i === 0;
};
