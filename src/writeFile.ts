import fs from "fs/promises";

export async function writeFile(file: string, data: string) {
  return fs.writeFile(file, data);
}
