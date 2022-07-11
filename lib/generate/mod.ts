import { checkPermissions } from "../utils/permissions.ts";
import { crStr, join } from "../../deps.ts";
import { files } from "../assets.ts";
import { VERSION } from "../../mod.ts";

const generateRandomString = () =>
  [8, 4, 4, 4, 12]
    .map((length) => crStr({ length }))
    .join("-")
    .toUpperCase();

export const generate = async (id?: string, folder = Deno.cwd()) => {
  if (!(await checkPermissions({ env: false }))) {
    return;
  }

  const pListFilePath = join(folder, "info.plist");

  try {
    const { isFile } = await Deno.stat(pListFilePath);
    if (isFile) {
      console.error(
        `\nSorry, there is already a file: ${pListFilePath}\nAborting...\n`,
      );
      Deno.exit(1);
    }
    // deno-lint-ignore no-empty
  } catch (_) {}

  try {
    // const __dirname = dirname(fromFileUrl(import.meta.url));
    // const templateFile = join(__dirname, "../../assets/info.plist");
    // const template = await Deno.readTextFile(templateFile);
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
      error.message,
    );
  }
};

export const copyFiles = async (folder = Deno.cwd()) => {
  // const __dirname = dirname(fromFileUrl(import.meta.url));
  // const [iconFile, runFile] = ["icon.png", "run.ts"].map((name) => ({
  //   name,
  //   path: join(__dirname, `../../assets/${name}`),
  // }));

  // await Deno.copyFile(iconFile.path, join(folder, iconFile.name));
  // await Deno.copyFile(runFile.path, join(folder, runFile.name));
  await Deno.writeFile(join(folder, "icon.png"), files["icon.png"]);

  const updatedRunFile = new TextDecoder()
    .decode(files["run.ts"])
    .replace("<<VERSION>>", `@${VERSION}`);
  await Deno.writeFile(
    join(folder, "run.ts"),
    new TextEncoder().encode(updatedRunFile),
  );
};
