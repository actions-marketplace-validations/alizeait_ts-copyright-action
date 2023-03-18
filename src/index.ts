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
