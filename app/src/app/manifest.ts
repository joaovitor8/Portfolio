import type { MetadataRoute } from "next";
import { PROFILE } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${PROFILE.fullName} — Full Stack Developer`,
    short_name: PROFILE.name,
    description: `Portfolio of ${PROFILE.fullName}.`,
    start_url: "/",
    display: "standalone",
    background_color: "#050610",
    theme_color: "#0B0C10",
    orientation: "portrait",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
