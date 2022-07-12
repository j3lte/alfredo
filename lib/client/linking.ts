import { ensureSymlink, join } from "../../deps.ts";
import { checkPermissions } from "../utils/permissions.ts";
import { getWorkFlowDir } from "./user-preferences.ts";

export const getWorkFlowTarget = async (name: string) => {
  const workFlowDir = await getWorkFlowDir();
  return workFlowDir !== null ? join(workFlowDir, name) : null;
};

/**
 * Returns a target in the workflow folder
 *
 * @param name Folder path
 */
export const getTarget = async (
  name: string,
): Promise<{ target: string | null; symlink: boolean | null }> => {
  const targetDir = await getWorkFlowTarget(name);
  if (!targetDir) {
    return {
      target: null,
      symlink: null,
    };
  }
  try {
    const { isSymlink } = await Deno.lstat(targetDir);
    return {
      target: targetDir,
      symlink: isSymlink,
    };
    // deno-lint-ignore no-empty
  } catch (_) {}

  return {
    target: targetDir,
    symlink: null,
  };
};

export const link = async (name: string, source = Deno.cwd()) => {
  if (!(await checkPermissions())) {
    return;
  }
  const target = await getWorkFlowTarget(name);

  if (target) {
    await ensureSymlink(source, target);
  }
};

export const unlink = async (name: string) => {
  if (!(await checkPermissions())) {
    return;
  }
  const target = await getWorkFlowTarget(name);

  if (target) {
    try {
      const stat = await Deno.lstat(target);
      if (stat && stat.isSymlink) {
        await Deno.remove(target);
      } else {
        throw new Error(`'${target}' is not a symlink`);
      }
    } catch (error) {
      throw new Error("Error unlinking: ", error.message);
    }
  }
};
