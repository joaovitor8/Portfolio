import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Inter, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";
import { PROFILE, SITE_URL } from "@/lib/config";
import { LOCALES, getDictionary, isLocale } from "@/lib/i18n";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

type LayoutParams = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<LayoutParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.title,
      template: dict.meta.titleTemplate,
    },
    description: dict.meta.description,
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        "pt-BR": `${SITE_URL}/pt`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/${locale}`,
      },
    },
    authors: [{ name: PROFILE.fullName }],
    creator: PROFILE.fullName,
    openGraph: {
      type: "website",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      url: `${SITE_URL}/${locale}`,
      title: dict.meta.title,
      description: dict.meta.ogTagline,
      siteName: dict.meta.siteName,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.ogTagline,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    icons: { icon: "/favicon.ico" },
  };
}

export const viewport: Viewport = {
  themeColor: "#0B0C10",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<LayoutParams>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.fullName,
    alternateName: PROFILE.name,
    jobTitle: dict.hero.role,
    description: dict.hero.tagline,
    url: `${SITE_URL}/${locale}`,
    email: `mailto:${PROFILE.email}`,
    image: `${SITE_URL}/opengraph-image`,
    sameAs: [
      `https://github.com/${PROFILE.github}`,
      `https://www.linkedin.com/in/${PROFILE.linkedin}/`,
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
      "Full Stack Development",
    ],
  };

  return (
    <html
      lang={dict.htmlLang}
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-space-950 text-starlight antialiased">
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-100 focus-visible:rounded-full focus-visible:bg-nebula-500 focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-white focus-visible:shadow-lg"
        >
          {dict.skipLink}
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
