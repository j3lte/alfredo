import { Command, ensureDir, parse, resolve, VERSION } from "./deps.ts";
import { copyFiles, generate } from "./lib/generate/mod.ts";
import { getTarget, link, unlink } from "./lib/linking/mod.ts";
import { isDirEmpty } from "./lib/utils/file.ts";

await new Command()
  .name("alfredo")
  .version(VERSION)
  .description("Let's do Deno things in Alfred (https://www.alfredapp.com/)")
  .command("generate", "Generate a Alfred workflow")
  .option("-n, --dont-link", "Don't link the folder")
  .option("-o, --only-workflow", "Only create a workflow")
  .arguments("<identifier:string> [folder:string]")
  .action(async (options, ...args) => {
    const [identifier, folder] = args;
    const toPath = resolve(folder || Deno.cwd());
    const { base } = parse(toPath);

    await ensureDir(toPath);
    const empty = await isDirEmpty(toPath);

    if (!empty && !options.onlyWorkflow) {
      console.error(`Error: folder "${toPath}" is not empty`);
      Deno.exit(1);
    }

    const id = identifier.replaceAll("/", ".");
    await generate(id, toPath);

    if (!options.onlyWorkflow) {
      await copyFiles(toPath);
    }

    if (!options.dontLink) {
      await link(base, toPath);
    }

    console.log("Done!");
  })
  .command("link", "Link the folder to the Alfred workflow folder")
  .arguments("[folder-name:string]")
  .action(async (_options, ...args) => {
    const [folder] = args;
    const toPath = resolve(folder || Deno.cwd());
    const { base } = parse(toPath);

    const { target, symlink } = await getTarget(base);

    if (target && symlink !== false) {
      await link(base, toPath);
      console.log("Done!");
    } else {
      console.error(`Error: something went wrong with linking "${toPath}"`);
    }
  })
  .command("unlink", "Unlink the folder to the Alfred workflow folder")
  .arguments("[folder-name:string]")
  .action(async (_options, ...args) => {
    const [folder] = args;
    const toPath = resolve(folder || Deno.cwd());
    const { base } = parse(toPath);

    const { target, symlink } = await getTarget(base);

    if (target && symlink === true) {
      await unlink(base);
      console.log("Done!");
    } else if (symlink === null) {
      // TODO
    } else {
      console.error(`Error: something went wrong with unlinking "${toPath}"`);
    }
  })
  .parse(Deno.args);
