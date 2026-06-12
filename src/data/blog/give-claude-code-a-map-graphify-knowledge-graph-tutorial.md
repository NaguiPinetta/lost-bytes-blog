---
title: "Give Claude Code a Map: Cutting Token Burn ~4x with Graphify"
description: "A hands-on walkthrough of Graphify, an open-source tool that builds a knowledge graph over your files so coding agents navigate a map instead of grepping blind — with honest numbers, not the inflated ones."
pubDatetime: 2026-06-12T09:00:00Z
modDatetime: 2026-06-12T09:00:00Z
tags:
  - tutorial
  - claude-code
  - agents
  - knowledge-graphs
  - tokens
  - tooling
draft: false
featured: true
---

You ask Claude Code a question about your project. It greps. It opens a file, reads it, discards it, greps again, opens three more. A minute later you have your answer — and a context window full of files that mostly didn't matter.

If your project is just code, that's usually fine. But the moment your folder is a *mixed* corpus — markdown notes, meeting transcripts, PDFs, images, a bit of code — the agent is doing Ctrl+F across a junk drawer. Too big to paste into context. Too small and too heterogeneous to justify standing up a RAG pipeline with embeddings and a vector database.

That awkward middle is exactly where **Graphify** lives. It's free, open source, and in the benchmark I'll break down below, it cut token usage on repeated questions by about **4x**.

Not 70x. We'll get to that.

---

## What we're installing

Graphify builds a **knowledge graph** over a folder: every file, concept, and entity becomes a node; explicit relationships become edges; related nodes get clustered into communities. The output is an index your agent reads *first*, so instead of re-deriving your project's structure from scratch on every question, it follows the map straight to the files that matter.

The lineage here is Andrej Karpathy's "LLM wiki" idea — interlinked markdown files that act as a navigation layer for a model. Obsidian users will recognize the shape. Graphify's twist is putting an actual graph on top: nodes, edges, communities detected with the Leiden clustering algorithm. So it sits between two familiar tools:

- **Obsidian-style wikis:** explicit links, pure markdown, no semantics beyond what you wrote.
- **RAG:** embeddings + vector DB + similarity search — great for huge corpora, overkill for a few hundred mixed files.

Graphify is the midpoint: explicit, queryable relationships, no embeddings.

**Costs up front:** installation is a couple of minutes. The initial indexing run takes 5–30 minutes depending on corpus size, and the only part that spends API tokens is the semantic-analysis phase (more below). Re-indexing after changes is incremental and cheap.

---

## How it works (so you're not cargo-culting)

Indexing happens in three phases, and only one of them touches an LLM:

1. **Code structure — local, zero tokens.** A tree-sitter pass extracts classes, functions, imports, call graphs, and inline comments across 20 languages. SQL gets special treatment: tables, views, foreign keys, and join relationships are extracted deterministically. No API calls.

2. **Audio and video — local, zero tokens.** Media files are transcribed with faster-whisper running on your machine. The transcription is primed with the most-connected concepts from your graph so far, so domain terms come out right. Results are cached; already-processed files are skipped on later runs.

3. **Documents, images, transcripts — Claude subagents, this is the part that costs tokens.** Parallel subagents each read a batch of files and emit a JSON fragment of nodes and edges; the fragments merge into one graph. This is the semantic layer — "what does this mean and where does it fit" — without any vectorization.

Then communities are detected with the Leiden algorithm (nodes grouped by edge density), and the most-connected nodes — the tool cheerfully calls them *god nodes* — surface as your corpus's recurring obsessions.

---

## Step 1: Install it

Grab the install command from the [Graphify GitHub repo](https://github.com/safishamsi/graphify) — it ships installers for Claude Code, Codex, Cursor, Gemini CLI, VS Code, and others. The lazy-but-effective route is the one I'd actually recommend: paste the repo URL into Claude Code and say

```text
Research this repo and install it with best practices for this setup.
```

Claude detects its own harness and runs the right installer. For Claude Code that means a CLI, a skill, and a `/graphify` slash command get registered. The installer will offer optional extras — faster-whisper for audio/video, yt-dlp for YouTube sources, PDF and Office support, Postgres extraction, and more. Install what your corpus actually contains, skip the rest.

## Step 2: Build the graph

In Claude Code, inside the project you want indexed:

```text
/graphify
```

On a large corpus it will ask scoping questions first: which folder to build over, whether to include videos, transcriptions, images. Answer honestly — every modality you include adds indexing time and (for phase 3) tokens. If images don't carry meaning in your project, leave them out.

Then wait. **5 to 30 minutes** depending on size. The benchmark corpus I'm referencing was 294 files and roughly 4 million words of YouTube transcripts, scripts, and notes; it came out the other end as a graph of ~1,600 nodes and ~4,000 edges.

## Step 3: Look at the map

Ask Claude Code to open the generated graph HTML and you get an interactive visualization: every dot a video, concept, tool, or entity; every line a relationship Claude found on its own; every color a Leiden community. Double-click a node to see its neighbors and degree (connection count — higher degree, more central).

This part is genuinely useful beyond the token savings. The god nodes are a mirror: they show you what your corpus is *actually* about, which for a content creator means your editorial line, your repetitions, your unexplored gaps — surfaced without you connecting anything by hand.

## Step 4: Query through the graph

The command that pays the rent:

```text
graphify query "what patterns do my best-performing videos share?"
```

The agent answers using the graph — following edges to the few relevant files — instead of re-reading half the corpus. You can also just talk to Claude Code normally; the installed skill teaches it the graph exists and when to consult it.

## Step 5: Keep it fresh

The #1 criticism you'll find in every comment section: "the graph goes stale the moment files change." True — and addressed:

```text
graphify update
```

This re-extracts **only changed files** — a changelog-style diff, not a full rebuild. Adding one new document re-indexes that document, which costs next to nothing. For a personal corpus, updating weekly or whenever you add material is plenty. (For the team workflow, there's a setup where one person runs the index, commits the output, and everyone's agent reads the same graph.)

---

## Does it actually work? The honest numbers

There's a claim circulating that this approach saves "70x in tokens." It doesn't, and repeating it helps no one. Here's a real measurement — same question, same corpus, asked through Claude Code with and without the graph (numbers from the creator who indexed the 294-file corpus above and published the methodology):

| | Tokens per question | How it got the answer |
|---|---|---|
| Without Graphify | ~67,000 | Grepped, then read 35 files essentially blind |
| With Graphify | ~16,000 | Read the graph, then only the referenced files |

That's **4.2x fewer tokens, a ~76% reduction**. The theoretical maximum on that corpus — if the baseline had to read *everything* — works out to about 52x, and no realistic query hits it. So: 70x is fiction; 4x is the measured reality. And a 4x reduction is excellent. Nobody needs to inflate it.

Two caveats that keep the math honest:

- **Indexing isn't free.** Phase 3 and every `update` spend tokens. If your corpus churns constantly (large active team, dozens of commits a day), the re-indexing overhead eats into the savings.
- **The savings compound with model price.** At list price, Claude Fable 5 runs $10/$50 per million input/output tokens — exactly double Opus 4.8's $5/$25. Cut token usage ~4x and the most expensive model on the market effectively costs you *less per question* than its predecessor did without the graph. That's the actual headline.

---

## When *not* to use this

- **Pure code repositories.** Tree-sitter-aware grep inside Claude Code is already good; the graph's edge is multimodal corpora (transcripts, PDFs, audio, images), not `src/`.
- **Huge document collections.** Past a certain scale, embeddings and a vector DB earn their complexity. Graphify's sweet spot is "too big for context, too small for RAG."
- **High-churn shared repos** where you'd be running `update` many times a day — measure whether the re-index tokens outweigh the query savings for your case.

Worth knowing for later: the graph exports to an Obsidian vault, SVG, Neo4j, and even an MCP server, so any model from anywhere can query the same map.

---

## The smallest next step

Pick one messy folder — the one with client projects, meeting audio, and notes all mixed together. Run `/graphify` over just that folder, ask it three questions you actually care about, and watch the token counter. You'll know within ten minutes whether the map is worth keeping.
