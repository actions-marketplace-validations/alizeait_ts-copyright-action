/*
  Copyright (c) 2023 Ali Zeaiter.
  This source code is licensed under the MIT license found in the
  LICENSE file in the root directory of this source tree. 
*/

import { injectCopyright } from "./injectCopyright";
import { debug } from "@actions/core";

try {
  debug("Starting copyright injection...");
  injectCopyright();
  debug("Finished copyright injection.");
} catch (error) {
  console.error(error);
  process.exit(1);
}
