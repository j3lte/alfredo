cache:
	deno cache --lock=deps-lock.json --lock-write --import-map=import_map.json deps.ts

assets:
	deno run -A write_assets.ts
