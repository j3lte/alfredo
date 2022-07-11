import { dir, join as pathJoin } from "../../../deps.ts";

const homedir: string | null = dir("home");
const tmpdir: string | null = Deno.env.get("TMPDIR") ?? null;
interface IOptions {
  suffix: string;
}
const macos = (name: string) => {
  if (!homedir) {
    throw new Error("Can't extract the home directory.");
  }
  if (!tmpdir) {
    throw new Error("Can't extract the tmp directory.");
  }
  const library = pathJoin(homedir, "Library");
  return {
    data: pathJoin(library, "Application Support", name),
    config: pathJoin(library, "Preferences", name),
    cache: pathJoin(library, "Caches", name),
    log: pathJoin(library, "Logs", name),
    temp: pathJoin(tmpdir, name),
  };
};

export default (
  name: string,
  options: IOptions = {
    suffix: "deno",
  },
) => {
  if (typeof name !== "string") {
    throw new TypeError(`Expected string, got ${typeof name}`);
  }
  // Add suffix to prevent possible conflict with native apps
  if (options.suffix) {
    name += `-${options.suffix}`;
  }
  return macos(name);
};
