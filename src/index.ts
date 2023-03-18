import { injectCopyright } from "./injectCopyright";

try {
  injectCopyright();
} catch (error) {
  console.error(error);
  process.exit(1);
}
