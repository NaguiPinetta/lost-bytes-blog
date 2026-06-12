---
title: "Setting Up OpenAI's Codex: From Install to Colleague"
description: "A working path through Codex's five surfaces — install, approval modes, AGENTS.md, and the handoff protocol — distilled from Nate B. Jones' living guide, with the sharp edges marked."
pubDatetime: 2026-06-12T15:00:00Z
modDatetime: 2026-06-12T15:00:00Z
tags:
  - tutorial
  - codex
  - openai
  - agents
  - tooling
  - workflows
draft: false
featured: false
---

You've heard Codex described as "Claude Code, but from OpenAI." Then you go to install it and discover it's not one thing — it's five: a desktop app, a CLI, IDE extensions, a cloud surface, and a mobile entry point. Which one do you actually install? Where does your work live? And why does everyone keep mentioning a markdown file called `AGENTS.md`?

I worked through [Nate B. Jones' living guide to Codex](https://unlock-ai.natebjones.com/guides/codex) — last verified June 10, 2026, and one of the better-maintained references out there — and distilled the setup path that matters. Credit for the underlying material is his; the opinions about where the sharp edges are, mine.

---

## What we're installing

Codex is OpenAI's coding agent. Jones frames it as "the closest thing yet to hiring a colleague who lives in your computer," and the framing is earned: the desktop app gives the agent a workbench — file monitor, diff review, terminal stream, embedded browser — rather than a chat box.

**Costs up front.** You need a ChatGPT plan or an API key:

| Plan | Price | What you get |
|---|---|---|
| Free / Go | $0 / $8 per month | Light usage, fine for evaluation |
| Plus | $20 per month | Roughly 15–80 GPT-5.5 messages or 20–100 GPT-5.4 messages per rolling 5-hour window |
| Pro | $100+ per month | Heavy daily use |
| API key | usage-based | No windows, pay per token |

Note the unit: usage is measured in **rolling 5-hour windows**, not per day. If you've ever hit a mid-afternoon wall with these tools, that's the mechanism. Installation itself takes about ten minutes.

## Step 1: Install the desktop app (and let it install the CLI)

The desktop app is the primary surface — this is where Codex goes from autocomplete to colleague.

```sh
# macOS
brew install --cask codex
```

Windows has a dedicated installer at developers.openai.com/codex; on Linux you live in the CLI instead.

For the CLI, Jones' guide does something I like: instead of giving you commands, it gives you a prompt to paste *into Codex itself* — the tool bootstraps its own tooling. The manual equivalent:

```sh
# check, install, verify
which codex && codex --version
curl -fsSL https://chatgpt.com/codex/install.sh | sh   # or: npm install -g @openai/codex
codex --version
```

## Step 2: Pick a model and an approval mode

Two decisions before the first real session. As of June 2026:

- **GPT-5.5** — frontier model for complex coding
- **GPT-5.4** — everyday professional tasks
- **GPT-5.4-mini** — chores and lightweight work

Jones' default is sensible: **5.5 on medium reasoning for real work, mini for chores.** (If you used the older Codex-tuned models — GPT-5.2-codex, GPT-5.3-codex — they're deprecated on ChatGPT plans; let them go.)

Approval modes are the safety dial:

| Mode | Behavior | Use when |
|---|---|---|
| Read only | Observes, changes nothing | Exploring unfamiliar code |
| Ask before edits | Proposes, you approve | **The working default** |
| Full access | Executes freely | Scoped, low-stakes tasks only |

Match the mode to the stakes. The failure mode on both ends is real: full access on a repo you care about, or approval-dialog fatigue making you rubber-stamp everything — which is full access with extra steps.

User-level defaults live in `~/.codex/config.toml`. Change one key at a time.

## Step 3: Know where your work lives

This is the guide's most practical warning. Codex has two kinds of workspaces:

- **Scratch** — auto-generated under `~/Documents/Codex/…`. Temporary, easy to lose.
- **Durable** — a folder you deliberately chose, ideally version-controlled.

The rule: **before any work you intend to keep, confirm where you are.** Scratch folders are where good prototypes go to die.

## Step 4: Write the AGENTS.md

A markdown file at your repo root with standing instructions: build and test commands, conventions, boundaries, files the agent must not touch. Jones calls it "the single highest-leverage file in this whole workflow" and I think he undersells it — it's the same lesson as `CLAUDE.md` in Claude Code or a graph index for retrieval: **agents perform to the quality of the standing context you give them.** Ten minutes writing it beats re-explaining your project in every session.

Start small:

```markdown
# AGENTS.md
## Commands
- npm run dev / npm run build / npm test
## Conventions
- TypeScript strict; no new dependencies without asking
## Off limits
- .env*, /migrations, anything under /legacy
```

## Step 5: Steal the handoff protocol

The guide's threading model: parent threads hold the goal and plan, child threads execute steps. One thread, one outcome — context sprawl is the silent killer of long agent sessions.

When a thread gets heavy, hand off to a fresh one with this structure (worth saving as a snippet — it works in any agent tool, not just Codex):

1. Goal, in one sentence
2. State — done / in-flight / untouched
3. Decisions made, and why
4. Full paths to relevant files
5. The next three actions
6. Known traps

Two power features worth finding on day one: **browser annotations** (click elements in the embedded browser, attach notes, batch-send with ⌘Enter — each note arrives pinned to a screenshot of that exact element, which beats describing UI bugs in prose) and **skills** (reusable instruction folders in `~/.codex/skills` or `.agents/skills` — never put credentials in them; use environment variables).

---

## Honest limitations

- **The interface changes weekly.** Jones maintains his guide as a living document for a reason; when the app and any tutorial disagree, including this one, the app wins. His suggested habit: skim developers.openai.com/codex/changelog monthly.
- **Rolling 5-hour windows on Plus** are tighter than they sound for agentic work — one ambitious refactor can eat a window. Heavy users end up on Pro or an API key; measure your own usage before upgrading on faith.
- **I haven't put Codex through a multi-week project yet.** This post is a distillation of a guide I trust plus a setup I've verified reads correctly — not a six-month field report. The field report, if Codex earns one, comes later.

## The smallest next step

Install the desktop app, open a **scratch** project deliberately — somewhere disposable — and give Codex one small, real task from your week in *ask before edits* mode. Watch the diff review panel as it works. You'll know within twenty minutes whether this colleague is worth a desk.
