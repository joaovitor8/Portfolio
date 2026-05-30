import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages: Record<string, string> = Object.fromEntries(
    LOCALES.map((l) => [l === "pt" ? "pt-BR" : l, `${SITE_URL}/${l}`])
  );

  return LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: locale === DEFAULT_LOCALE ? 1 : 0.9,
    alternates: {
      languages: {
        ...languages,
        "x-default": `${SITE_URL}/${DEFAULT_LOCALE}`,
      },
    },
  }));
}
