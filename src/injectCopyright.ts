import { findFiles } from "./findFiles";
import { getInputs } from "./getInputs";
import fs from "fs/promises";
import { getSourceFileWithCopyrightComment } from "./getSourceFileWithCopyrightComment";
import { writeFile } from "./writeFile";

export async function injectCopyright() {
  const inputs = getInputs();

  const files = await findFiles(inputs.pattern, inputs.exclude);

  await Promise.all(
    files.map(async (file) => {
      const contents = await fs.readFile(file, "utf-8");
      const contentsWithComment = getSourceFileWithCopyrightComment(
        contents,
        inputs.copyright
      );
      return writeFile(file, contentsWithComment);
    })
  );
}
