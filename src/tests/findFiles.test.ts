import { findFiles } from "../findFiles";
import { normalizePaths } from "../normalizePaths";

describe("findFiles", () => {
  test("returns all files in cwd by default", async () => {
    expect(normalizePaths(await findFiles())).toMatchInlineSnapshot(`
      [
        "/jest.config.js",
        "/src/writeFile.ts",
        "/src/normalizePaths.ts",
        "/src/injectCopyright.ts",
        "/src/index.ts",
        "/src/getSourceFileWithCopyrightComment.ts",
        "/src/getInputs.ts",
        "/src/findFiles.ts",
        "/fixtures/with-multiple-comments.ts",
        "/fixtures/with-multiple-comments.js",
        "/fixtures/with-comment.ts",
        "/fixtures/with-comment.js",
        "/fixtures/no-comment.ts",
        "/fixtures/no-comment.js",
        "/src/tests/getSourceFileWithCopyrightComment.test.ts",
        "/src/tests/findFiles.test.ts",
        "/src/tests/integration/injectCopyrights.test.ts",
      ]
    `);
  });
  test("respects glob pattern", async () => {
    expect(normalizePaths(await findFiles("./fixtures/**")))
      .toMatchInlineSnapshot(`
      [
        "/fixtures/with-multiple-comments.ts",
        "/fixtures/with-multiple-comments.js",
        "/fixtures/with-comment.ts",
        "/fixtures/with-comment.js",
        "/fixtures/no-comment.ts",
        "/fixtures/no-comment.js",
      ]
    `);
  });
  test("respects exclude pattern", async () => {
    expect(
      normalizePaths(
        await findFiles("fixtures/**", "fixtures/with-comment.js,fixtures/no-*")
      )
    ).toMatchInlineSnapshot(`
      [
        "/fixtures/with-multiple-comments.ts",
        "/fixtures/with-multiple-comments.js",
        "/fixtures/with-comment.ts",
      ]
    `);
  });
});
