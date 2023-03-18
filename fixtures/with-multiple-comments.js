/*
  Copyright (c) XXX Platforms, Inc. and affiliates.
  This source code is licensed under the MIT license found in the
  LICENSE file in the root directory of this source tree. 
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
