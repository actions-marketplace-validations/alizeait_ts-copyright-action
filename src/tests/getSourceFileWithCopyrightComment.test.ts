import fs from "fs";
import { getSourceFileWithCopyrightComment } from "../getSourceFileWithCopyrightComment";

const copyrightComment = `Copyright (c) XXX Platforms, Inc. and affiliates.\nThis source code is licensed under the MIT license found in the\nLICENSE file in the root directory of this source tree.`;

describe("getSourceFileWithCopyrightComment", () => {
  describe("ts", () => {
    test("Adds copyright comment to the top of the file when no comment is already present", () => {
      const file = getFileContents("./fixtures/no-comment.ts");
      expect(getSourceFileWithCopyrightComment(file, copyrightComment))
        .toMatchInlineSnapshot(`
        "/*
          Copyright (c) XXX Platforms, Inc. and affiliates.
          This source code is licensed under the MIT license found in the
          LICENSE file in the root directory of this source tree. 
        */

        import fs from "fs";
        import ts from "typescript";

        const node: ts.SourceFile = ts.createSourceFile(
          "x.ts", // fileName
          fs.readFileSync("./src/ts.ts", "utf8"), // sourceText
          ts.ScriptTarget.Latest // langugeVersion
        );
        console.log(node);
        "
      `);
    });

    test("Updates comment if it already exists instead of duplicating", () => {
      const file = getFileContents("./fixtures/with-comment.ts");
      expect(
        getSourceFileWithCopyrightComment(file, copyrightComment + ":updated")
      ).toMatchInlineSnapshot(`
        "/*
          Copyright (c) XXX Platforms, Inc. and affiliates.
          This source code is licensed under the MIT license found in the
          LICENSE file in the root directory of this source tree.:updated 
        */

        import fs from "fs";
        import ts from "typescript";

        const node: ts.SourceFile = ts.createSourceFile(
          "x.ts", // fileName
          fs.readFileSync("./src/ts.ts", "utf8"), // sourceText
          ts.ScriptTarget.Latest // langugeVersion
        );
        console.log(node);
        "
      `);
    });

    test("Only updates the first comment with copyright when multiple exist", () => {
      const file = getFileContents("./fixtures/with-multiple-comments.ts");
      expect(
        getSourceFileWithCopyrightComment(file, copyrightComment + ":updated")
      ).toMatchInlineSnapshot(`
        "/*
          Copyright (c) XXX Platforms, Inc. and affiliates.
          This source code is licensed under the MIT license found in the
          LICENSE file in the root directory of this source tree.:updated 
        */

        import fs from "fs";
        import ts from "typescript";

        /*
          Copyright (c) YYY Platforms, Inc. and affiliates.
        */
        const node: ts.SourceFile = ts.createSourceFile(
          "x.ts", // fileName
          fs.readFileSync("./src/ts.ts", "utf8"), // sourceText
          ts.ScriptTarget.Latest // langugeVersion
        );
        console.log(node);
        "
      `);
    });
  });
  describe("js", () => {
    test("Adds copyright comment to the top of the file when no comment is already present", () => {
      const file = getFileContents("./fixtures/no-comment.js");
      expect(getSourceFileWithCopyrightComment(file, copyrightComment))
        .toMatchInlineSnapshot(`
        "/*
          Copyright (c) XXX Platforms, Inc. and affiliates.
          This source code is licensed under the MIT license found in the
          LICENSE file in the root directory of this source tree. 
        */

        import fs from "fs";
        import ts from "typescript";

        const node = ts.createSourceFile(
          "x.ts", // fileName
          fs.readFileSync("./src/ts.ts", "utf8"), // sourceText
          ts.ScriptTarget.Latest // langugeVersion
        );
        console.log(node);
        "
      `);
    });

    test("Updates comment if it already exists instead of duplicating", () => {
      const file = getFileContents("./fixtures/with-comment.js");
      expect(
        getSourceFileWithCopyrightComment(file, copyrightComment + ":updated")
      ).toMatchInlineSnapshot(`
        "/*
          Copyright (c) XXX Platforms, Inc. and affiliates.
          This source code is licensed under the MIT license found in the
          LICENSE file in the root directory of this source tree.:updated 
        */

        import fs from "fs";
        import ts from "typescript";

        const node = ts.createSourceFile(
          "x.ts", // fileName
          fs.readFileSync("./src/ts.ts", "utf8"), // sourceText
          ts.ScriptTarget.Latest // langugeVersion
        );
        console.log(node);
        "
      `);
    });

    test("Only updates the first comment with copyright when multiple exist", () => {
      const file = getFileContents("./fixtures/with-multiple-comments.js");
      expect(
        getSourceFileWithCopyrightComment(file, copyrightComment + ":updated")
      ).toMatchInlineSnapshot(`
        "/*
          Copyright (c) XXX Platforms, Inc. and affiliates.
          This source code is licensed under the MIT license found in the
          LICENSE file in the root directory of this source tree.:updated 
        */

        import fs from "fs";
        import ts from "typescript";

        /*
          Copyright (c) YYY Platforms, Inc. and affiliates.
        */
        const node = ts.createSourceFile(
          "x.ts", // fileName
          fs.readFileSync("./src/ts.ts", "utf8"), // sourceText
          ts.ScriptTarget.Latest // langugeVersion
        );
        console.log(node);
        "
      `);
    });
  });
});

function getFileContents(path: string) {
  return fs.readFileSync(path, "utf-8");
}
