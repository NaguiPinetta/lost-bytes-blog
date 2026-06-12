---
description: Distill this week's Noise Distiller material into one Lost Bytes draft post and open a PR for review
---

You are running the weekly **distill → draft → PR** pipeline for the Lost Bytes blog.
Noise Distiller (the user's own feed-aggregation app) does extraction and selection;
you do the editorial judgment and writing. The user is the editor — everything ships
as a **draft PR**, never directly to main.

## 1. Ensure Noise Distiller's API is up

```sh
curl -s -m 2 http://localhost:8000/healthz
```

If it's not responding, start it the same way `daily_briefing.sh` does and wait for health (up to 30s):

```sh
cd /Users/nagui/Desktop/git/noise-distiller/api && nohup uv run uvicorn app.main:app --host 0.0.0.0 --port 8000 >> /tmp/noise_distiller.log 2>&1 &
```

If it still won't come up, stop and report — do not improvise around it.

## 2. Gather material (last 7 days)

Pull three signals, in priority order:

1. **Bookmarks** (the user's own curation — strongest signal):
   `GET http://localhost:8000/api/v1/events?is_bookmarked=true&limit=20&sort=published`
   Ignore items older than 14 days or obviously already used (see step 3).
2. **Cross-source clusters** (independent sources converging on a story):
   `GET http://localhost:8000/api/v1/intel/clusters?hours=168&fields=summary`
   Rank by `source_count` (≥2 required) then `trend_score`.
3. **Recent digests** for narrative context:
   `GET http://localhost:8000/api/v1/digests?kind=daily` (latest few)

## 3. The editorial bar — pick ONE topic or none

List existing posts (`ls src/data/blog/` + skim titles/tags) so you never re-cover a topic.

A topic clears the bar only if ALL hold:
- Corroborated: ≥2 independent sources in a cluster, OR explicitly bookmarked by the user
- Substantive: there's an argument, a measurable claim, or something installable — not just news
- On-beat: AI/agents/engineering/tooling, or a genuine curiosity piece
- Fresh: not already covered on the blog

**If nothing clears the bar, stop.** Report what you considered and why each fell short.
A skipped week is the system working, not failing.

## 4. Deep-read before writing

For the chosen topic:
- `GET /api/v1/intel/clusters/{cluster_id}/events` for the full event list
- For events without content: `POST /api/v1/events/{event_id}/extract`, then re-fetch
  to get `content_md` / `summary_distilled`
- WebFetch the 1–3 primary source URLs directly to verify any number or claim you
  intend to repeat. House rule: numbers get checked or get hedged; every borrowed
  idea gets attributed with a link.

## 5. Write the post

- Read `_meta/writing-personas.md`. Pick the persona by deliverable: installable → Tomás;
  converging trend / argument → Vera; oddity → Iris. State the persona choice.
- Write to `src/data/blog/<kebab-slug>.md`, following the frontmatter schema in
  `src/content.config.ts`. **`draft: true`**, `featured: false`, `pubDatetime` = now (UTC).
- Follow the house rules in the personas file (short paragraphs, honest numbers, no hype).

## 6. Validate

`npm run build` must pass with 0 errors. Fix or abort — never ship a broken build.

## 7. Open the PR

```sh
git switch -c post/<slug> && git add src/data/blog/<slug>.md && git commit && git push -u origin post/<slug>
gh pr create --title "Draft: <post title>" --body "<see below>"
git switch main
```

PR body must include:
- Persona used and why
- Sources consulted, as links, with which claims came from where
- The Noise Distiller evidence (cluster id, source_count, trend_score, or "bookmarked by you")
- A reviewer checklist: ☐ claims spot-checked ☐ voice right ☐ flip `draft: false` ☐ merge

## Hard rules

- Never commit to `main`. Never set `draft: false`. Never merge the PR yourself.
- One post maximum per run.
- If anything fails mid-pipeline, leave the repo on `main` with a clean working tree
  and report exactly where it stopped.
