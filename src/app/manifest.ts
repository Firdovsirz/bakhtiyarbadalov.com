import type { MetadataRoute } from "next";
import { site } from "@/content/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "B. Badalov",
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#0b181c",
    theme_color: "#0b181c",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
