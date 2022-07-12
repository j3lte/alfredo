import { assertEquals, assertFalse, sinon } from "../../deps-dev.ts";
import { withPermissions } from "../../lib/utils/permissions.ts";

Deno.test("Permissions enabled", { permissions: { read: true } }, async () => {
  const perm = await withPermissions(["read"], false);

  assertEquals(perm, true, "withPermissions should return true when enabled");
});

Deno.test(
  "Permissions disabled",
  async () => {
    const orig = Deno.permissions.request;
    const permissionsStub = sinon.stub();
    permissionsStub.withArgs({ name: "read" }).returns({ state: "rejected" });

    Deno.permissions.request = permissionsStub;

    const perm = await withPermissions(["read"], false);

    assertFalse(
      perm,
      "withPermissions should return false when disabled",
    );

    Deno.permissions.request = orig;
  },
);
