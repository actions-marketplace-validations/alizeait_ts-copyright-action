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
      debug("File:" + file);
      debug("File content:" + contentsWithComment);
      return writeFile(file, contentsWithComment);
    })
  );
}
