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
