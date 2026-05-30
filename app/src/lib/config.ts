export const SITE_URL = "https://joaovitor.dev";

// Apenas dados não-traduzíveis. Strings localizadas vivem em `src/lib/i18n.ts`.
export const PROFILE = {
  name: "João Vitor",
  fullName: "João Vitor Ezequiel",
  email: "joaoezeki@gmail.com",
  github: "joaovitor8",
  linkedin: "joaovitorezequiel",
  // Adicione `public/curriculo.pdf` e troque para "/curriculo.pdf" para reativar o botão.
  resumeUrl: undefined as string | undefined,
  available: true,
};

export const FEATURED_PROJECTS: Record<
  string,
  { tags: string[]; demoUrl?: string }
> = {
  Universe: {
    tags: ["Next.js", "TypeScript", "Tailwind"],
  },
  ControleFinanceiro: {
    tags: ["React", "Node.js", "PostgreSQL"],
  },
};

export const FEATURED_ORDER = Object.keys(FEATURED_PROJECTS);
