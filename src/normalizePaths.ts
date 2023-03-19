/*
  Copyright (c) 2023 Ali Zeaiter.
  This source code is licensed under the MIT license found in the
  LICENSE file in the root directory of this source tree. 
*/

import path from "path";

export function normalizePath(filePath: string) {
  return filePath
    .replace(process.cwd(), "")
    .split(path.sep)
    .join(path.posix.sep);
}
export function normalizePaths(paths: string[]) {
  return paths.map(normalizePath);
}
