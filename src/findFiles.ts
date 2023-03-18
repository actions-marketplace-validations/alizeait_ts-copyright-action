import glob from "glob";

export async function findFiles(
  pattern = "**/*.{js,ts,jsx,tsx,cjs,cts,mjs,mts}",
  exclude = "node_modules/**,dist/**,build/**,coverage/**"
) {
  return glob(pattern, {
    ignore: exclude ? exclude.split(",") : undefined,
    absolute: true,
    nodir: true,
  });
}
