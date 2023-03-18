/*
  Copyright (c) 2023 Ali Zeaiter.
  This source code is licensed under the MIT license found in the
  LICENSE file in the root directory of this source tree. 
*/

import fs from "fs/promises";

export async function writeFile(file: string, data: string) {
  return fs.writeFile(file, data);
}
