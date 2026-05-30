import "server-only";
import { FEATURED_ORDER, FEATURED_PROJECTS, PROFILE } from "./config";
import type { LanguageStat, Repo } from "./types";

function buildFallback(): Repo[] {
  return FEATURED_ORDER.map((name, i) => {
    const info = FEATURED_PROJECTS[name];
    return {
      // Descrição vem do dicionário (dict.projects.highlights[name]) no ProjectCard.
      id: -1 - i,
      name,
      description: null,
      html_url: `https://github.com/${PROFILE.github}/${name}`,
      homepage: info.demoUrl ?? null,
      language: info.tags[0] ?? null,
      stargazers_count: 0,
      forks_count: 0,
    };
  });
}

function computeLanguages(repos: Repo[]): LanguageStat[] {
  const counts = new Map<string, number>();
  for (const r of repos) {
    if (r.fork || r.archived) continue;
    if (!r.language) continue;
    counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
  }
  const total = Array.from(counts.values()).reduce((a, b) => a + b, 0);
  if (total === 0) return [];
  return Array.from(counts.entries())
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
}

export async function getRepos(): Promise<{
  repos: Repo[];
  languages: LanguageStat[];
}> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${PROFILE.github}/repos?sort=updated&per_page=100`,
      {
        next: { revalidate: 3600 },
        headers: { Accept: "application/vnd.github+json" },
      }
    );
    if (!res.ok) return { repos: buildFallback(), languages: [] };

    const data = (await res.json()) as Repo[];
    if (!Array.isArray(data)) return { repos: buildFallback(), languages: [] };

    const languages = computeLanguages(data);

    const featured = FEATURED_ORDER.map((name) =>
      data.find((r) => r.name === name)
    ).filter((r): r is Repo => Boolean(r));

    const rest = data
      .filter(
        (r) => !FEATURED_ORDER.includes(r.name) && !r.fork && !r.archived
      )
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 4);

    const combined = [...featured, ...rest];
    return {
      repos: combined.length > 0 ? combined : buildFallback(),
      languages,
    };
  } catch {
    return { repos: buildFallback(), languages: [] };
  }
}
