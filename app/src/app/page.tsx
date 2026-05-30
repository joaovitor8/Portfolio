"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Code2,
  User,
  Send,
  Rocket,
  Home,
  ExternalLink,
  Star,
  GitFork,
  MapPin,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Download,
} from "lucide-react";

// =============================================================================
// CONFIG — edite estes valores para personalizar o portfólio
// =============================================================================

const PROFILE = {
  name: "João Vitor",
  fullName: "João Vitor Ezequiel",
  role: "Desenvolvedor Full Stack",
  tagline:
    "Estudante de Ciência da Computação transformando ideias em produtos digitais com React, Next.js e Node.js.",
  location: "Brasil",
  email: "joaoezeki@gmail.com",
  github: "joaovitor8",
  linkedin: "joaovitorezequiel",
  resumeUrl: "/curriculo.pdf",
  available: true,
};

const ABOUT = [
  "Sou apaixonado por construir software bem-feito — interfaces fluidas, código legível e produtos que resolvem problemas reais.",
  "Atualmente cursando Ciência da Computação, dedico meu tempo livre a projetos pessoais que exploram desde gestão financeira até experiências interativas.",
  "Procuro minha primeira oportunidade em uma equipe que valorize aprendizado contínuo, código de qualidade e impacto no produto.",
];

const SKILLS: Record<string, string[]> = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  Backend: ["Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB"],
  Ferramentas: ["Git", "GitHub", "Vercel", "Figma", "VS Code"],
  Aprendendo: ["Docker", "Testes (Jest/Vitest)", "CI/CD"],
};

// Projetos em destaque — buscados via GitHub e enriquecidos aqui
const FEATURED_PROJECTS: Record<
  string,
  { tags: string[]; demoUrl?: string; highlight?: string }
> = {
  Universe: {
    tags: ["Next.js", "TypeScript", "Tailwind"],
    highlight: "Experiência interativa com tema espacial",
  },
  ControleFinanceiro: {
    tags: ["React", "Node.js", "PostgreSQL"],
    highlight: "Gestão financeira pessoal com gráficos e categorias",
  },
};

const FEATURED_ORDER = Object.keys(FEATURED_PROJECTS);

// =============================================================================
// TIPOS
// =============================================================================

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
}

type SectionId = "home" | "sobre" | "skills" | "projetos" | "contato";

// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [reposError, setReposError] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -60]);

  // Estrelas geradas uma única vez
  const stars = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.7 + 0.2,
        duration: `${Math.random() * 3 + 2}s`,
        delay: `${Math.random() * 3}s`,
      })),
    []
  );

  // Busca repositórios do GitHub
  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://api.github.com/users/${PROFILE.github}/repos?sort=updated&per_page=100`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("GitHub API error");
        return res.json();
      })
      .then((data: Repo[]) => {
        if (!Array.isArray(data)) throw new Error("Invalid response");
        // Featured primeiro, depois o resto
        const featured = FEATURED_ORDER.map((name) =>
          data.find((r) => r.name === name)
        ).filter(Boolean) as Repo[];
        const rest = data
          .filter((r) => !FEATURED_ORDER.includes(r.name))
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 4);
        setRepos([...featured, ...rest]);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setReposError(true);
      })
      .finally(() => setLoadingRepos(false));

    return () => controller.abort();
  }, []);

  // Detecta seção ativa via IntersectionObserver
  useEffect(() => {
    const sections: SectionId[] = ["home", "sobre", "skills", "projetos", "contato"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-space-950 text-starlight">
      {/* Background fixo: gradiente + estrelas */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(139,92,246,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_85%_30%,rgba(6,182,212,0.18),transparent_60%)] aurora" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_15%_70%,rgba(139,92,246,0.15),transparent_60%)] aurora" style={{ animationDelay: "-7s" }} />
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white twinkle"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              ["--twinkle-duration" as string]: star.duration,
              animationDelay: star.delay,
            }}
          />
        ))}
        {/* vinheta sutil para legibilidade */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.6)_100%)]" />
      </div>

      {/* Navegação */}
      <Navigation active={activeSection} />

      {/* Conteúdo */}
      <main className="relative z-10">
        <Hero opacity={heroOpacity} y={heroY} />
        <About />
        <Skills />
        <Projects repos={repos} loading={loadingRepos} error={reposError} />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

// =============================================================================
// NAVIGATION
// =============================================================================

function Navigation({ active }: { active: SectionId }) {
  const items: { id: SectionId; label: string; icon: React.ReactNode }[] = [
    { id: "home", label: "Início", icon: <Home size={16} /> },
    { id: "sobre", label: "Sobre", icon: <User size={16} /> },
    { id: "skills", label: "Skills", icon: <Sparkles size={16} /> },
    { id: "projetos", label: "Projetos", icon: <Code2 size={16} /> },
    { id: "contato", label: "Contato", icon: <Send size={16} /> },
  ];

  return (
    <nav className="fixed left-1/2 top-6 z-50 -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-space-900/70 px-2 py-2 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`relative flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition-colors sm:text-sm ${
                isActive ? "text-white" : "text-stardust hover:text-white"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-nebula-500 to-cyan-glow"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

// =============================================================================
// HERO
// =============================================================================

function Hero({ opacity, y }: { opacity: any; y: any }) {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center px-6 pt-24"
    >
      <motion.div style={{ opacity, y }} className="text-center">
        {PROFILE.available && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-medium text-emerald-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Disponível para novas oportunidades
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative mx-auto mb-6 inline-block"
        >
          <div className="absolute -inset-6 rounded-full bg-nebula-500/30 blur-2xl" />
          <Rocket size={56} className="relative text-nebula-400" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-3 text-sm uppercase tracking-[0.3em] text-stardust"
        >
          Olá, eu sou
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-display text-5xl font-bold leading-tight tracking-tight md:text-7xl lg:text-8xl"
        >
          <span className="text-gradient">{PROFILE.name}</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-4 text-xl font-medium text-white md:text-2xl"
        >
          {PROFILE.role}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-6 max-w-xl text-base text-stardust md:text-lg"
        >
          {PROFILE.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projetos"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-nebula-500 to-cyan-glow px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 glow-purple"
          >
            Ver projetos
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contato"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
          >
            <Mail size={16} />
            Entrar em contato
          </a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-stardust">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-1 text-xs uppercase tracking-widest"
        >
          <span>Role para explorar</span>
          <div className="h-8 w-px bg-gradient-to-b from-stardust to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// ABOUT
// =============================================================================

function About() {
  return (
    <Section id="sobre" eyebrow="Sobre" title="Quem é o piloto desta nave">
      <div className="grid gap-10 md:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5 text-base leading-relaxed text-stardust md:text-lg">
          {ABOUT.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <div className="space-y-3">
          <InfoCard icon={<User size={18} />} label="Nome" value={PROFILE.fullName} />
          <InfoCard icon={<MapPin size={18} />} label="Localização" value={PROFILE.location} />
          <InfoCard
            icon={<GraduationCap size={18} />}
            label="Formação"
            value="Ciência da Computação"
          />
          <InfoCard icon={<Mail size={18} />} label="Email" value={PROFILE.email} />
        </div>
      </div>
    </Section>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-nebula-500/30 to-cyan-glow/20 text-nebula-300">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-wider text-stardust">{label}</div>
        <div className="truncate text-sm font-medium text-white">{value}</div>
      </div>
    </div>
  );
}

// =============================================================================
// SKILLS
// =============================================================================

function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Stack e ferramentas">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(SKILLS).map(([category, items]) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="card-glow rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur"
          >
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-cyan-soft">
              {category}
            </h3>
            <ul className="space-y-2">
              {items.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center gap-2 text-sm text-starlight"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-nebula-400 to-cyan-glow" />
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// =============================================================================
// PROJECTS
// =============================================================================

function Projects({
  repos,
  loading,
  error,
}: {
  repos: Repo[];
  loading: boolean;
  error: boolean;
}) {
  return (
    <Section id="projetos" eyebrow="Projetos" title="O que tenho construído">
      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-56 animate-pulse rounded-2xl border border-white/10 bg-white/[0.02]"
            />
          ))}
        </div>
      ) : error || repos.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center text-stardust">
          Não foi possível carregar os projetos do GitHub no momento.{" "}
          <a
            href={`https://github.com/${PROFILE.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-soft underline-offset-4 hover:underline"
          >
            Ver no GitHub
          </a>
          .
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo, idx) => (
            <ProjectCard key={repo.id} repo={repo} index={idx} />
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <a
          href={`https://github.com/${PROFILE.github}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-stardust transition-colors hover:text-white"
        >
          Ver todos os repositórios no GitHub
          <ArrowRight size={14} />
        </a>
      </div>
    </Section>
  );
}

function ProjectCard({ repo, index }: { repo: Repo; index: number }) {
  const featured = FEATURED_PROJECTS[repo.name];
  const tags = featured?.tags ?? (repo.language ? [repo.language] : []);
  const description =
    featured?.highlight ||
    repo.description ||
    "Projeto explorando boas práticas de desenvolvimento.";
  const demoUrl = featured?.demoUrl || repo.homepage;
  const isFeatured = !!featured;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="card-glow group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition-colors hover:bg-white/[0.06]"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          {isFeatured && (
            <span className="mb-2 inline-flex items-center gap-1 rounded-full border border-nebula-400/30 bg-nebula-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-nebula-300">
              <Sparkles size={10} />
              Destaque
            </span>
          )}
          <h3 className="truncate font-display text-lg font-bold capitalize text-white">
            {repo.name.replace(/[-_]/g, " ")}
          </h3>
        </div>
        <div className="flex shrink-0 items-center gap-1 text-stardust">
          {repo.stargazers_count > 0 && (
            <span className="flex items-center gap-1 text-xs">
              <Star size={12} />
              {repo.stargazers_count}
            </span>
          )}
          {repo.forks_count > 0 && (
            <span className="flex items-center gap-1 text-xs">
              <GitFork size={12} />
              {repo.forks_count}
            </span>
          )}
        </div>
      </div>

      <p className="mb-5 line-clamp-3 flex-1 text-sm leading-relaxed text-stardust">
        {description}
      </p>

      {tags.length > 0 && (
        <div className="mb-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-medium text-starlight"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 border-t border-white/5 pt-4">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-stardust transition-colors hover:text-white"
        >
          <Github size={14} />
          Código
        </a>
        {demoUrl && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-cyan-soft transition-colors hover:text-cyan-300"
          >
            <ExternalLink size={14} />
            Demo
          </a>
        )}
      </div>
    </motion.article>
  );
}

// =============================================================================
// CONTACT
// =============================================================================

function Contact() {
  return (
    <Section id="contato" eyebrow="Contato" title="Vamos conversar?">
      <div className="mx-auto max-w-3xl">
        <p className="mb-10 text-center text-base text-stardust md:text-lg">
          Estou aberto a oportunidades como desenvolvedor júnior, estágio e
          projetos freelance. Responderei em até 24h.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <ContactLink
            href={`mailto:${PROFILE.email}`}
            icon={<Mail size={22} />}
            label="Email"
            value={PROFILE.email}
          />
          <ContactLink
            href={`https://www.linkedin.com/in/${PROFILE.linkedin}/`}
            icon={<Linkedin size={22} />}
            label="LinkedIn"
            value={`/in/${PROFILE.linkedin}`}
          />
          <ContactLink
            href={`https://github.com/${PROFILE.github}`}
            icon={<Github size={22} />}
            label="GitHub"
            value={`@${PROFILE.github}`}
          />
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${PROFILE.email}`}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-nebula-500 to-cyan-glow px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 glow-cyan"
          >
            <Mail size={16} />
            Enviar email
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          {PROFILE.resumeUrl && (
            <a
              href={PROFILE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              <Download size={16} />
              Baixar currículo
            </a>
          )}
        </div>
      </div>
    </Section>
  );
}

function ContactLink({
  href,
  icon,
  label,
  value,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="card-glow group flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur transition-colors hover:bg-white/[0.06]"
    >
      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-nebula-500/30 to-cyan-glow/20 text-nebula-300 transition-transform group-hover:scale-110">
        {icon}
      </div>
      <div className="text-xs uppercase tracking-widest text-stardust">{label}</div>
      <div className="truncate text-sm font-medium text-white">{value}</div>
    </a>
  );
}

// =============================================================================
// FOOTER
// =============================================================================

function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/5 px-6 py-8 text-center text-xs text-stardust">
      <p>
        Construído com Next.js, Tailwind e muito café —{" "}
        <span className="text-white">© {new Date().getFullYear()} {PROFILE.fullName}</span>
      </p>
    </footer>
  );
}

// =============================================================================
// SECTION WRAPPER
// =============================================================================

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: SectionId;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-cyan-soft">
            {eyebrow}
          </p>
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-nebula-500 to-transparent" />
        </motion.div>
        {children}
      </div>
    </section>
  );
}
