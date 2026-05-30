import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

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

const siteUrl = "https://joaovitor.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "João Vitor — Desenvolvedor Full Stack",
    template: "%s | João Vitor",
  },
  description:
    "Portfólio de João Vitor Ezequiel — Desenvolvedor Full Stack e estudante de Ciência da Computação. Projetos com React, Next.js, TypeScript, Node.js e mais.",
  keywords: [
    "João Vitor",
    "João Vitor Ezequiel",
    "Desenvolvedor Full Stack",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Portfólio",
    "Ciência da Computação",
  ],
  authors: [{ name: "João Vitor Ezequiel" }],
  creator: "João Vitor Ezequiel",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    title: "João Vitor — Desenvolvedor Full Stack",
    description:
      "Construo interfaces e sistemas com React, Next.js e TypeScript. Veja meus projetos e entre em contato.",
    siteName: "João Vitor — Portfólio",
  },
  twitter: {
    card: "summary_large_image",
    title: "João Vitor — Desenvolvedor Full Stack",
    description:
      "Construo interfaces e sistemas com React, Next.js e TypeScript.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0C10",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-space-950 text-starlight antialiased">
        {children}
      </body>
    </html>
  );
}
