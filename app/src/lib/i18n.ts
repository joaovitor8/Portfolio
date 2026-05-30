export const LOCALES = ["pt", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "pt";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function getOtherLocale(locale: Locale): Locale {
  return locale === "pt" ? "en" : "pt";
}

export interface TimelineEntryI18n {
  type: "education" | "experience" | "project";
  title: string;
  organization: string;
  period: string;
  description: string;
  current?: boolean;
}

export interface Dictionary {
  htmlLang: string;
  meta: {
    title: string;
    titleTemplate: string;
    description: string;
    ogTagline: string;
    siteName: string;
  };
  skipLink: string;
  nav: {
    home: string;
    sobre: string;
    jornada: string;
    skills: string;
    projetos: string;
    contato: string;
    switchLanguage: string;
  };
  hero: {
    available: string;
    greeting: string;
    role: string;
    tagline: string;
    ctaProjects: string;
    ctaContact: string;
    scrollHint: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    nameLabel: string;
    locationLabel: string;
    educationLabel: string;
    emailLabel: string;
    locationValue: string;
    educationValue: string;
  };
  timeline: {
    eyebrow: string;
    title: string;
    current: string;
    entries: TimelineEntryI18n[];
  };
  skills: {
    eyebrow: string;
    title: string;
    categories: { name: string; items: string[] }[];
  };
  projects: {
    eyebrow: string;
    title: string;
    languagesHeading: string;
    repoUnit: { one: string; many: string };
    seeAll: string;
    code: string;
    demo: string;
    featuredBadge: string;
    defaultDescription: string;
    highlights: Record<string, string>;
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    formHeading: string;
    emailLabel: string;
    linkedinLabel: string;
    githubLabel: string;
    downloadResume: string;
  };
  contactForm: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    errorFillAll: string;
    errorInvalidEmail: string;
    errorMessageLong: string;
    errorNotConfigured: string;
    errorGeneric: string;
  };
  footer: {
    builtWith: string;
  };
}

const pt: Dictionary = {
  htmlLang: "pt-BR",
  meta: {
    title: "João Vitor — Desenvolvedor Full Stack",
    titleTemplate: "%s | João Vitor",
    description:
      "Portfólio de João Vitor Ezequiel — Desenvolvedor Full Stack e estudante de Ciência da Computação. Projetos com React, Next.js, TypeScript, Node.js e mais.",
    ogTagline:
      "Construo interfaces e sistemas com React, Next.js e TypeScript. Veja meus projetos e entre em contato.",
    siteName: "João Vitor — Portfólio",
  },
  skipLink: "Pular para o conteúdo principal",
  nav: {
    home: "Início",
    sobre: "Sobre",
    jornada: "Jornada",
    skills: "Skills",
    projetos: "Projetos",
    contato: "Contato",
    switchLanguage: "Mudar para inglês",
  },
  hero: {
    available: "Disponível para novas oportunidades",
    greeting: "Olá, eu sou",
    role: "Desenvolvedor Full Stack",
    tagline:
      "Estudante de Ciência da Computação transformando ideias em produtos digitais com React, Next.js e Node.js.",
    ctaProjects: "Ver projetos",
    ctaContact: "Entrar em contato",
    scrollHint: "Role para explorar",
  },
  about: {
    eyebrow: "Sobre",
    title: "Quem é o piloto desta nave",
    paragraphs: [
      "Sou apaixonado por construir software bem-feito — interfaces fluidas, código legível e produtos que resolvem problemas reais.",
      "Atualmente cursando Ciência da Computação, dedico meu tempo livre a projetos pessoais que exploram desde gestão financeira até experiências interativas.",
      "Procuro minha primeira oportunidade em uma equipe que valorize aprendizado contínuo, código de qualidade e impacto no produto.",
    ],
    nameLabel: "Nome",
    locationLabel: "Localização",
    educationLabel: "Formação",
    emailLabel: "Email",
    locationValue: "Brasil",
    educationValue: "Ciência da Computação",
  },
  timeline: {
    eyebrow: "Jornada",
    title: "Trajetória e formação",
    current: "Atual",
    entries: [
      {
        type: "education",
        title: "Bacharelado em Ciência da Computação",
        organization: "Universidade",
        period: "2023 — 2027",
        description:
          "Algoritmos, estruturas de dados, engenharia de software e fundamentos de computação.",
        current: true,
      },
      {
        type: "project",
        title: "Universe",
        organization: "Projeto pessoal",
        period: "2024",
        description:
          "Experiência interativa com tema espacial usando Next.js, TypeScript e Tailwind.",
      },
      {
        type: "project",
        title: "Controle Financeiro",
        organization: "Projeto pessoal",
        period: "2024",
        description:
          "Aplicação para gestão financeira pessoal com gráficos e categorias.",
      },
    ],
  },
  skills: {
    eyebrow: "Skills",
    title: "Stack e ferramentas",
    categories: [
      {
        name: "Frontend",
        items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      },
      {
        name: "Backend",
        items: ["Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB"],
      },
      {
        name: "Ferramentas",
        items: ["Git", "GitHub", "Vercel", "Figma", "VS Code"],
      },
      {
        name: "Aprendendo",
        items: ["Docker", "Testes (Jest/Vitest)", "CI/CD"],
      },
    ],
  },
  projects: {
    eyebrow: "Projetos",
    title: "O que tenho construído",
    languagesHeading: "Linguagens mais usadas no GitHub",
    repoUnit: { one: "repo", many: "repos" },
    seeAll: "Ver todos os repositórios no GitHub",
    code: "Código",
    demo: "Demo",
    featuredBadge: "Destaque",
    defaultDescription:
      "Projeto explorando boas práticas de desenvolvimento.",
    highlights: {
      Universe: "Experiência interativa com tema espacial",
      ControleFinanceiro:
        "Gestão financeira pessoal com gráficos e categorias",
    },
  },
  contact: {
    eyebrow: "Contato",
    title: "Vamos conversar?",
    intro:
      "Estou aberto a oportunidades como desenvolvedor júnior, estágio e projetos freelance. Responderei em até 24h.",
    formHeading: "Ou envie uma mensagem",
    emailLabel: "Email",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
    downloadResume: "Baixar currículo",
  },
  contactForm: {
    nameLabel: "Nome",
    namePlaceholder: "Seu nome",
    emailLabel: "Email",
    emailPlaceholder: "voce@exemplo.com",
    messageLabel: "Mensagem",
    messagePlaceholder: "O que você gostaria de conversar?",
    submit: "Enviar mensagem",
    submitting: "Enviando...",
    successTitle: "Mensagem enviada!",
    successMessage: "Responderei em até 24h.",
    errorFillAll: "Preencha todos os campos.",
    errorInvalidEmail: "Email inválido.",
    errorMessageLong: "Mensagem muito longa (máx. 5000).",
    errorNotConfigured: "Envio indisponível no momento. Use o email direto.",
    errorGeneric: "Erro ao enviar. Tente o email direto.",
  },
  footer: {
    builtWith: "Construído com Next.js, Tailwind e muito café —",
  },
};

const en: Dictionary = {
  htmlLang: "en",
  meta: {
    title: "João Vitor — Full Stack Developer",
    titleTemplate: "%s | João Vitor",
    description:
      "Portfolio of João Vitor Ezequiel — Full Stack Developer and Computer Science student. Projects with React, Next.js, TypeScript, Node.js, and more.",
    ogTagline:
      "I build interfaces and systems with React, Next.js, and TypeScript. Check my projects and get in touch.",
    siteName: "João Vitor — Portfolio",
  },
  skipLink: "Skip to main content",
  nav: {
    home: "Home",
    sobre: "About",
    jornada: "Journey",
    skills: "Skills",
    projetos: "Projects",
    contato: "Contact",
    switchLanguage: "Switch to Portuguese",
  },
  hero: {
    available: "Available for new opportunities",
    greeting: "Hi, I'm",
    role: "Full Stack Developer",
    tagline:
      "Computer Science student turning ideas into digital products with React, Next.js, and Node.js.",
    ctaProjects: "See projects",
    ctaContact: "Get in touch",
    scrollHint: "Scroll to explore",
  },
  about: {
    eyebrow: "About",
    title: "Who's piloting this ship",
    paragraphs: [
      "I'm passionate about building software done right — fluid interfaces, readable code, and products that solve real problems.",
      "Currently pursuing a degree in Computer Science, I spend my free time on personal projects ranging from financial management to interactive experiences.",
      "I'm looking for my first opportunity on a team that values continuous learning, code quality, and product impact.",
    ],
    nameLabel: "Name",
    locationLabel: "Location",
    educationLabel: "Education",
    emailLabel: "Email",
    locationValue: "Brazil",
    educationValue: "Computer Science",
  },
  timeline: {
    eyebrow: "Journey",
    title: "Background and journey",
    current: "Current",
    entries: [
      {
        type: "education",
        title: "BSc in Computer Science",
        organization: "University",
        period: "2023 — 2027",
        description:
          "Algorithms, data structures, software engineering, and computing fundamentals.",
        current: true,
      },
      {
        type: "project",
        title: "Universe",
        organization: "Personal project",
        period: "2024",
        description:
          "Interactive space-themed experience using Next.js, TypeScript, and Tailwind.",
      },
      {
        type: "project",
        title: "Financial Control",
        organization: "Personal project",
        period: "2024",
        description:
          "Application for personal financial management with charts and categories.",
      },
    ],
  },
  skills: {
    eyebrow: "Skills",
    title: "Stack and tools",
    categories: [
      {
        name: "Frontend",
        items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      },
      {
        name: "Backend",
        items: ["Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB"],
      },
      { name: "Tools", items: ["Git", "GitHub", "Vercel", "Figma", "VS Code"] },
      {
        name: "Learning",
        items: ["Docker", "Testing (Jest/Vitest)", "CI/CD"],
      },
    ],
  },
  projects: {
    eyebrow: "Projects",
    title: "What I've been building",
    languagesHeading: "Most used languages on GitHub",
    repoUnit: { one: "repo", many: "repos" },
    seeAll: "See all repositories on GitHub",
    code: "Code",
    demo: "Demo",
    featuredBadge: "Featured",
    defaultDescription: "Project exploring development best practices.",
    highlights: {
      Universe: "Interactive space-themed experience",
      ControleFinanceiro:
        "Personal financial management with charts and categories",
    },
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's talk?",
    intro:
      "I'm open to opportunities as a junior developer, internships, and freelance projects. I'll respond within 24h.",
    formHeading: "Or send a message",
    emailLabel: "Email",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
    downloadResume: "Download résumé",
  },
  contactForm: {
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    messageLabel: "Message",
    messagePlaceholder: "What would you like to talk about?",
    submit: "Send message",
    submitting: "Sending...",
    successTitle: "Message sent!",
    successMessage: "I'll respond within 24h.",
    errorFillAll: "Please fill in all fields.",
    errorInvalidEmail: "Invalid email.",
    errorMessageLong: "Message too long (max 5000).",
    errorNotConfigured: "Sending unavailable right now. Use email directly.",
    errorGeneric: "Error sending. Try email directly.",
  },
  footer: {
    builtWith: "Built with Next.js, Tailwind, and lots of coffee —",
  },
};

const DICTIONARIES: Record<Locale, Dictionary> = { pt, en };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}
