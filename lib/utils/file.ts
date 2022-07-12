import { join as pathJoin } from "../../deps.ts";

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

export const getPaths = () => {
  const homedir: string | null = Deno.env.get("HOME") ?? null;
  const tmpdir: string = Deno.env.get("TMPDIR") as string;
  const cachedir: string | null = homedir ? pathJoin(homedir, "Library/Caches") : null;
  return {
    homedir,
    tmpdir,
    cachedir,
  };
};
