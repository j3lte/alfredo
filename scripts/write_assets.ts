const FILES = ["icon.png", "info.plist", "run.ts"];

const output = FILES.map((filename) => {
  const file = Deno.readFileSync(`./assets/${filename}`).toString();
  return `"${filename}": Uint8Array.from([ ${file} ])`;
}).join(",\n    ");

const file = `export const files = {
    ${output}
}`;

Deno.writeFileSync("./lib/assets.ts", new TextEncoder().encode(file));
