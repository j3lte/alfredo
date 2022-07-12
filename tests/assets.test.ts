import { assert, assertEquals } from "../deps-dev.ts";
import { files } from "../lib/assets.ts";

Deno.test("Should have assets", () => {
  const keys = Object.keys(files);

  assertEquals(keys.length, 3);

  let file: keyof typeof files;

  for (file in files) {
    const val = files[file];
    assert(
      val.length > 0,
      `Asset '${file}' should have a filesize`,
    );
    assertEquals(
      typeof val,
      "object",
    );
  }
});
