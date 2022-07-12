import { crStr, join } from "../../deps.ts";
import { files } from "../assets.ts";
import { VERSION } from "../../mod.ts";
import { withPermissions } from "../utils/permissions.ts";

const generateRandomString = () =>
  [8, 4, 4, 4, 12]
    .map((length) => crStr({ length }))
    .join("-")
    .toUpperCase();

export const generate = async (id?: string, folder = Deno.cwd()) => {
  if (!(await withPermissions(["read", "write"]))) {
    return;
  }

  const pListFilePath = join(folder, "info.plist");

  try {
    const { isFile } = await Deno.stat(pListFilePath);
    if (isFile) {
      console.error(
        `\nSorry, there is already a file: ${pListFilePath}\nAborting...\n`
      );
      Deno.exit(1);
    }
    // deno-lint-ignore no-empty
  } catch (_) {}

  try {
    const template = new TextDecoder().decode(files["info.plist"]);

    const randomUUID = generateRandomString();
    const identifier = id || "com.alfredo.task";

    const plistText = template
      .replaceAll("{{ uuid }}", randomUUID)
      .replaceAll("{{ identifier }}", identifier);

    const pListFilePath = join(folder, "info.plist");

    await Deno.writeFile(pListFilePath, new TextEncoder().encode(plistText));
  } catch (error) {
    console.error(
      "Error when generating an Alfred workflow file :: ",
      error.message
    );
  }
};

export const assets = async (folder = Deno.cwd()) => {
  await Deno.writeFile(
    join(folder, "user-config.json"),
    new TextEncoder().encode("{\n}")
  );
  await Deno.writeFile(join(folder, "icon.png"), files["icon.png"]);

  const updatedRunFile = new TextDecoder()
    .decode(files["run.ts"])
    .replace("<<VERSION>>", `@${VERSION}`);
  await Deno.writeFile(
    join(folder, "run.ts"),
    new TextEncoder().encode(updatedRunFile)
  );
};
