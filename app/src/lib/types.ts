export interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  fork?: boolean;
  archived?: boolean;
}

export interface LanguageStat {
  name: string;
  count: number;
  percentage: number;
}

export type SectionId =
  | "home"
  | "sobre"
  | "jornada"
  | "skills"
  | "projetos"
  | "contato";
