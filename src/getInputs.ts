import * as core from "@actions/core";

interface Inputs {
  /**
   * Copyright comment to prepend to the file
   */
  copyright: string;
  /**
   * Glob pattern to find ts/js files. Default is \*\*\/*.{js,ts,jsx,tsx,cjs,cts,mjs,mts}
   */
  pattern?: string;
  /**
   * Comma seperated glob patterns to exclude from glob search
   */
  exclude?: string;
}
export function getInputs(): Inputs {
  return {
    copyright: core.getInput("copyright"),
    pattern: core.getInput("pattern"),
    exclude: core.getInput("exclude"),
  };
}
