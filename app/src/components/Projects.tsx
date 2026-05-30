"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Star,
  GitFork,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { FEATURED_PROJECTS, PROFILE } from "@/lib/config";
import type { LanguageStat, Repo } from "@/lib/types";
import type { Dictionary } from "@/lib/i18n";
import { Section } from "./Section";
import { Github } from "./icons";
import { LanguageStats } from "./LanguageStats";

export function Projects({
  dict,
  repos,
  languages,
}: {
  dict: Dictionary["projects"];
  repos: Repo[];
  languages: LanguageStat[];
}) {
  return (
    <Section id="projetos" eyebrow={dict.eyebrow} title={dict.title}>
      <LanguageStats
        languages={languages}
        heading={dict.languagesHeading}
        repoUnit={dict.repoUnit}
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo, idx) => (
          <ProjectCard key={repo.id} repo={repo} dict={dict} index={idx} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href={`https://github.com/${PROFILE.github}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-stardust transition-colors hover:text-white"
        >
          {dict.seeAll}
          <ArrowRight size={14} />
        </a>
      </div>
    </Section>
  );
}

function ProjectCard({
  repo,
  dict,
  index,
}: {
  repo: Repo;
  dict: Dictionary["projects"];
  index: number;
}) {
  const featured = FEATURED_PROJECTS[repo.name];
  const tags = featured?.tags ?? (repo.language ? [repo.language] : []);
  const description =
    dict.highlights[repo.name] ||
    repo.description ||
    dict.defaultDescription;
  const demoUrl = featured?.demoUrl || repo.homepage;
  const isFeatured = !!featured;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="card-glow group flex flex-col rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur transition-colors hover:bg-white/6"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          {isFeatured && (
            <span className="mb-2 inline-flex items-center gap-1 rounded-full border border-nebula-400/30 bg-nebula-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-nebula-300">
              <Sparkles size={10} />
              {dict.featuredBadge}
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
          aria-label={`${dict.code}: ${repo.name}`}
          className="inline-flex items-center gap-1.5 text-sm text-stardust transition-colors hover:text-white"
        >
          <Github size={14} />
          {dict.code}
        </a>
        {demoUrl && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${dict.demo}: ${repo.name}`}
            className="inline-flex items-center gap-1.5 text-sm text-cyan-soft transition-colors hover:text-cyan-300"
          >
            <ExternalLink size={14} />
            {dict.demo}
          </a>
        )}
      </div>
    </motion.article>
  );
}
