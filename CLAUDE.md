# Lost Bytes blog

Astro 5 static blog (AstroPaper-based), deployed on Vercel. Posts live in
`src/data/blog/*.md`; frontmatter schema is in `src/content.config.ts`.

## Writing posts

Before writing or editing any blog post, read `_meta/writing-personas.md` and
select the matching persona (Vera = analysis, Tomás = tutorials, Iris = curiosity
pieces, Dario = secops). State the chosen persona, then write the entire post in
that voice.

## Commands

- `npm run dev` — dev server
- `npm run build` — runs `astro check` then builds
- `npm run lint` / `npm run format`
