import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google"; // Importando do Google Fonts
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "João Vitor | Full Stack Developer",
  description: "Portfólio de desenvolvimento",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.variable} ${spaceGrotesk.variable} bg-space-900 text-starlight antialiased`}>
        {children}
      </body>
    </html>
  );
}
