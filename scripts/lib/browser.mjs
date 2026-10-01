// Finds a local Chromium-based browser (Chrome, Brave, Edge, Chromium) and drives it headless.
// Set CHROME_PATH to use a specific binary.
//
// Headless mode runs in its own temporary profile, so it does not touch an open browser window.
// stdio is ignored on purpose: browser helper processes inherit pipes and would keep
// spawnSync waiting after the browser itself has finished.

import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";

const CANDIDATES = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
];
const ON_PATH = ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser", "brave-browser", "microsoft-edge"];

let cached;
export function findBrowser() {
  if (cached) return cached;
  if (process.env.CHROME_PATH) return (cached = process.env.CHROME_PATH);
  for (const p of CANDIDATES) if (existsSync(p)) return (cached = p);
  for (const name of ON_PATH) {
    try {
      const found = execFileSync("which", [name], { encoding: "utf8" }).trim();
      if (found) return (cached = found);
    } catch {
      /* not installed */
    }
  }
  throw new Error("No Chromium-based browser found. Install Google Chrome or set CHROME_PATH to a Chrome, Brave, Edge or Chromium binary.");
}

function run(args, out) {
  rmSync(out, { force: true });
  const res = spawnSync(findBrowser(), ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1", ...args], {
    stdio: "ignore",
    timeout: 90_000,
    killSignal: "SIGKILL",
  });
  if (res.error) throw new Error(`Browser failed for ${out}: ${res.error.message}`);
  if (!existsSync(out)) throw new Error(`Browser produced no file for ${out} (exit ${res.status})`);
}

/** Screenshot a URL at an exact pixel size. Transparent unless the page paints a background. */
export function screenshot(url, out, width, height, { waitMs = 4000 } = {}) {
  run([`--window-size=${width},${height}`, "--default-background-color=00000000", `--virtual-time-budget=${waitMs}`, `--screenshot=${out}`, url], out);
}

/** Print a URL to PDF using the page's own @page and print CSS. */
export function printToPdf(url, out, { waitMs = 10_000 } = {}) {
  run(["--no-pdf-header-footer", "--print-to-pdf-no-header", `--virtual-time-budget=${waitMs}`, `--print-to-pdf=${out}`, url], out);
}
