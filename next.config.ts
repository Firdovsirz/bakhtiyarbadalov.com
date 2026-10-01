import type { NextConfig } from "next";

// On external macOS volumes (often exFAT, like the drive this project lives on), macOS writes
// "._*" AppleDouble files next to every file, including inside Turbopack's on-disk cache in
// .next/cache, which then fails to load ("invalid digit found in string"). Turn the cache off
// there; builds on Vercel, CI or an internal disk keep it.
const onExternalMacVolume = process.platform === "darwin" && process.cwd().startsWith("/Volumes/");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    turbopackFileSystemCacheForDev: !onExternalMacVolume,
    turbopackFileSystemCacheForBuild: !onExternalMacVolume,
  },
  async headers() {
    return [
      {
        source: "/Bakhtiyar-Badalov-CV.pdf",
        headers: [{ key: "Content-Disposition", value: 'inline; filename="Bakhtiyar-Badalov-CV.pdf"' }],
      },
    ];
  },
};

export default nextConfig;
