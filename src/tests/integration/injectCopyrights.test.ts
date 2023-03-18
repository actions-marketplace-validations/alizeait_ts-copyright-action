import { injectCopyright } from "../../injectCopyright";
import { normalizePath } from "../../normalizePaths";

jest.mock("../../getInputs", () => {
  return {
    __esModule: true,
    getInputs: jest.fn().mockReturnValue({
      copyright: `Copyright (c) XXX Platforms, Inc. and affiliates.\nThis source code is licensed under the MIT license found in the\nLICENSE file in the root directory of this source tree.`,
      pattern: "fixtures/**",
    }),
  };
});
jest.mock("../../writeFile", () => {
  return {
    __esModule: true,
    writeFile: jest.fn((file: string, fileWithCopyright: string) => {
      expect({
        file: normalizePath(file),
        fileWithCopyright,
      }).toMatchSnapshot();
    }),
  };
});

describe("injectCopyright", () => {
  test("Adds comments to all matched files", async () => {
    await injectCopyright();
  });
});
