import fs from "fs";
import ts from "typescript";

const node = ts.createSourceFile(
  "x.ts", // fileName
  fs.readFileSync("./src/ts.ts", "utf8"), // sourceText
  ts.ScriptTarget.Latest // langugeVersion
);
console.log(node);
