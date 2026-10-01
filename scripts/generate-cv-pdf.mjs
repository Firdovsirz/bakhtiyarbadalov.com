// Prints the /cv page to public/Bakhtiyar-Badalov-CV.pdf, so the PDF always matches the website.
//
// Usage:
//   npm run build && npm run generate:cv          starts the built site on a spare port and prints it
//   CV_URL=https://bakhtiyarbadalov.com/cv npm run generate:cv    prints a site that is already running
//
// Needs Chrome, Brave, Edge or Chromium (see scripts/lib/browser.mjs).

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { printToPdf } from "./lib/browser.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const outFile = fileURLToPath(new URL("../public/Bakhtiyar-Badalov-CV.pdf", import.meta.url));

async function waitFor(url, timeoutMs = 60_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      /* server not up yet */
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`Timed out waiting for ${url}`);
}

if (process.env.CV_URL) {
  printToPdf(process.env.CV_URL, outFile);
} else {
  if (!existsSync(`${root}/.next/BUILD_ID`)) {
    console.error("No production build found. Run `npm run build` first, or set CV_URL to a running site.");
    process.exit(1);
  }
  const port = process.env.PORT ?? "3123";
  const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", port], { cwd: root, stdio: "ignore" });
  try {
    const url = `http://localhost:${port}/cv`;
    await waitFor(url);
    printToPdf(url, outFile);
  } finally {
    server.kill();
  }
}
console.log(`CV written to ${outFile}`);
