/*
  Copyright (c) 2023 Ali Zeaiter.
  This source code is licensed under the MIT license found in the
  LICENSE file in the root directory of this source tree. 
*/

import { findFiles } from "./findFiles";
import { getInputs } from "./getInputs";
import fs from "fs/promises";
import { getSourceFileWithCopyrightComment } from "./getSourceFileWithCopyrightComment";
import { writeFile } from "./writeFile";
import { debug } from "@actions/core";

export async function injectCopyright() {
  const inputs = getInputs();
  debug("Found the following inputs" + JSON.stringify(inputs, null, 2));

  const files = await findFiles(inputs.pattern, inputs.exclude);

  debug("Found the following files:" + JSON.stringify(files, null, 2));

  await Promise.all(
    files.map(async (file) => {
      const contents = await fs.readFile(file, "utf-8");
      const contentsWithComment = getSourceFileWithCopyrightComment(
        contents,
        inputs.copyright
      );
      debug("Writing file:" + file);
      return writeFile(file, contentsWithComment);
    })
  );
}
