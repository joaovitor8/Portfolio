import { notFound } from "next/navigation";
import { Background } from "@/components/Background";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Timeline } from "@/components/Timeline";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { getRepos } from "@/lib/github";
import { getDictionary, isLocale } from "@/lib/i18n";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const { repos, languages } = await getRepos();

  return (
    <div className="relative min-h-screen bg-space-950 text-starlight">
      <Background />
      <Navigation dict={dict.nav} locale={locale} />
      <main id="main-content" className="relative z-10">
        <Hero dict={dict.hero} />
        <About dict={dict.about} />
        <Timeline dict={dict.timeline} />
        <Skills dict={dict.skills} />
        <Projects dict={dict.projects} repos={repos} languages={languages} />
        <Contact
          dict={dict.contact}
          formDict={dict.contactForm}
          locale={locale}
        />
        <Footer dict={dict.footer} />
      </main>
    </div>
  );
}
