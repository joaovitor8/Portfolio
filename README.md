# Portfólio — João Vitor Ezequiel

Portfólio pessoal com tema cósmico, desenvolvido em **Next.js 16**, **React 19**, **TypeScript** e **Tailwind CSS v4**, com animações em **Framer Motion**.

## Stack

- [Next.js 16](https://nextjs.org/) — App Router
- React 19
- TypeScript 5
- Tailwind CSS 4
- Framer Motion 12
- Lucide React (ícones)

## Como rodar localmente

```bash
cd app
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Estrutura

```
app/
├── src/app/
│   ├── layout.tsx      # Metadata, fontes, SEO
│   ├── page.tsx        # Página única com seções (Hero, Sobre, Skills, Projetos, Contato)
│   └── globals.css     # Tema, scrollbar, utilitários
└── public/             # Assets estáticos (favicon, currículo)
```

## Personalização

Toda a configuração editável fica no topo de `src/app/page.tsx`, em três blocos:

- `PROFILE` — nome, role, contatos, GitHub username, link do currículo
- `ABOUT` — parágrafos da seção "Sobre"
- `SKILLS` — categorias e tecnologias
- `FEATURED_PROJECTS` — projetos do GitHub que recebem destaque, com tags e link de demo

Os repositórios são buscados automaticamente da API pública do GitHub usando o `PROFILE.github`. Os projetos listados em `FEATURED_PROJECTS` aparecem primeiro com badge de "Destaque"; os demais são ordenados por estrelas (top 4).

### Adicionar currículo

Coloque o PDF em `app/public/curriculo.pdf` ou ajuste `PROFILE.resumeUrl` em `page.tsx`.

### Atualizar metadata SEO

Edite `siteUrl` e os campos de `metadata` em `src/app/layout.tsx`.

## Scripts

```bash
npm run dev     # desenvolvimento
npm run build   # build de produção
npm run start   # servidor de produção
npm run lint    # ESLint
```

## Deploy

Deploy recomendado na [Vercel](https://vercel.com): conecte o repositório e a build acontece automaticamente.

## Licença

MIT — veja [LICENSE](LICENSE).
