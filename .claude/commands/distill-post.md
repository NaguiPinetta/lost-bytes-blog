---
description: Distill today's Noise Distiller material into a batch of 5-7 short Lost Bytes notes and ship them as one PR
---

You are running the daily **distill → batch-draft → PR** pipeline for the Lost Bytes blog.
Noise Distiller (the user's own feed-aggregation app) does extraction and selection;
you do the editorial judgment and writing. Output is a **batch of 5–7 short notes**
(plus optionally one full-length post if something truly meaty appeared), shipped
together on one branch as one PR.

## 1. Ensure Noise Distiller's API is up

```sh
curl -s -m 2 http://localhost:8000/healthz
```

If it's not responding, start it the way `daily_briefing.sh` does and wait for health (up to 30s):

```sh
cd /Users/nagui/Desktop/git/noise-distiller/api && nohup uv run uvicorn app.main:app --host 0.0.0.0 --port 8000 >> /tmp/noise_distiller.log 2>&1 &
```

If it still won't come up, stop and report — do not improvise around it.

## 2. Gather material (last 24-48h)

Pull three signals, in priority order:

1. **Bookmarks** (the user's own curation — these get first claim on slots):
   `GET http://localhost:8000/api/v1/events?is_bookmarked=true&limit=30&sort=published`
2. **Cross-source clusters** (independent sources converging):
   `GET http://localhost:8000/api/v1/intel/clusters?hours=48&fields=summary`
   Rank by `source_count` then `trend_score`.
3. **Fresh notable events** beyond those:
   `GET http://localhost:8000/api/v1/events?limit=60&sort=published` — skim for
   single-source items that are still clearly worth a note (major release,
   striking result, genuinely odd find).

## 3. The editorial bar — select 5-7, never pad

List existing posts (`ls src/data/blog/` + skim recent titles) to avoid re-covering
topics — including yesterday's batch.

An item earns a slot if ALL hold:
- Real substance: an argument, a measurable claim, a release, or a genuine curiosity —
  not incremental news or press-release noise
- On-beat: AI/agents/engineering/tooling, or the curiosity-cabinet lane
  (language, images, history of tech)
- Not already covered on the blog
- You can attribute it to a primary source you actually fetched

Target **5–7 entries**. If only 3 clear the bar, ship 3. If nothing does, stop and
report. **Never pad the batch to hit the number** — padding is how notebooks become slop.
Aim for subject spread across the batch (not 6 notes about the same model launch).

## 4. Verify before writing

For each selected item: WebFetch the primary source URL (or use the event's
`content_md` after `POST /api/v1/events/{event_id}/extract`). Any number or strong
claim you repeat must come from the source, or be hedged. Attribute with links.

## 5. Write the batch

Read `_meta/writing-personas.md` first.

**Short note format** (the default — 300–500 words each):
- Persona still applies, lightly: commentary/trend → Vera's voice; hands-on/release
  → Tomás's; oddity → Iris's
- Shape: a sharp lede (what happened / what it is) → why it matters or what's
  actually new → one honest caveat or open question → source attribution with link
- Frontmatter per `src/content.config.ts`: `draft: true`, `featured: false`,
  `pubDatetime` = now (UTC) — stagger entries by a few minutes so sort order is stable.
  Tags: 3–5, lowercase kebab-case, reuse existing tags where they fit.
- Titles: specific and honest, no clickbait, no "Breaking".

**Full-length post** (optional, max one per batch): if one topic genuinely supports it
(several sources converging, or something installable worth a walkthrough), write it
at full persona length per the personas guide and mark it in the PR as the lead.

## 6. Validate

`npm run build` must pass with 0 errors before shipping.

## 7. Ship the batch — one branch, one PR

```sh
git switch -c posts/<YYYY-MM-DD>
git add src/data/blog/<the new files>
git commit -m "Daily distill batch: <N> notes (<date>)"
git push -u origin posts/<YYYY-MM-DD>
gh pr create --title "Daily batch <date>: <N> notes" --body "<see below>"
git switch main
```

PR body must include, per entry: title, persona, one-line gist, and source links —
plus the Noise Distiller evidence (bookmark / cluster id + source_count) and a
reviewer checklist: ☐ skim each note ☐ drop any weak ones ☐ flip `draft: false` on
keepers ☐ merge.

## 8. Mark material as used

For every Noise Distiller event used in a shipped note:
`PATCH http://localhost:8000/api/v1/events/{event_id}` with `{"is_archived": true}`
so tomorrow's run doesn't resurface it.

## Hard rules

- Never commit to `main`. Never set `draft: false`. Never merge the PR.
- 7 entries maximum per run; quality bar beats quota.
- If anything fails mid-pipeline, leave the repo on `main` with a clean working tree
  and report exactly where it stopped.
- Finish with a summary: entries shipped (titles + personas), entries considered and
  rejected (one line why), and the PR URL.
