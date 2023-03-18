/*
  Copyright (c) 2023 Ali Zeaiter.
  This source code is licensed under the MIT license found in the
  LICENSE file in the root directory of this source tree. 
*/

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
