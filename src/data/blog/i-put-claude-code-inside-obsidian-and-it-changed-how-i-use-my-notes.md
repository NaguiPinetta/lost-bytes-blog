---
title: "I Put Claude Code Inside Obsidian — and It Changed How I Use My Notes"
description: "Embedding Claude Code inside my Obsidian vault gave the AI real filesystem access. No more copy-paste — an agent that lives inside my notes."
pubDatetime: 2025-02-11T09:00:00Z
modDatetime: 2025-02-11T09:00:00Z
tags:
  - notes
  - obsidian
  - ai
  - claude
  - workflows
  - knowledge-management
draft: false
featured: true
---

I've tried every "AI + notes" combo over the last year.

Most of them feel the same:
copy → paste → prompt → copy back → repeat.

Useful, sure — but never integrated.

Last week I embedded Claude Code directly inside Obsidian, giving the AI access to my actual vault: folders, files, structure, context. Not a chat window next to notes — but an agent living inside them.

It was… eye-opening.

---

## The Problem With "AI-Assisted Note-Taking"

Most AI tools treat your notes as input, not as a system.

They:

- Don't understand your structure
- Don't persist decisions
- Don't modify files directly
- Don't respect how knowledge evolves over time

So you end up doing the glue work:

- copying context
- explaining structure
- pasting results back
- manually reorganizing

That's not augmentation. That's delegation overhead.

---

## Enter Claude Code (With File System Access)

Claude Code is different.

It's not just a chatbot — it's an agent that can:

- read files
- write files
- navigate folders
- maintain context across tasks

By running it inside my Obsidian vault, Claude stopped being a "helper" and started behaving like a knowledge assistant.

---

## What Changes When AI Lives Inside Your Vault

Once Claude has direct access to your notes, things click fast.

**Inline context (no copy-paste)**

Claude can read the exact note you're working on — and the surrounding ones — instantly.

You can say:

"Summarize today's notes and link related concepts."

And it just… does it.

**Real structure awareness**

It understands:

- folders
- naming conventions
- backlinks
- project boundaries

This matters more than embeddings or vector search.
Structure is meaning.

**Persistent improvements**

Claude can:

- refactor messy notes
- normalize headings
- add frontmatter
- reorganize folders

Not suggestions. Actual changes.

---

## How I Set It Up (High Level)

The setup is surprisingly straightforward:

1. **Install Claude Code (CLI)**  
   This gives you a local agent with filesystem access.

2. **Run it from your Obsidian vault**

   ```bash
   cd path/to/your/ObsidianVault
   claude
   ```

3. **Optionally integrate via Obsidian plugins**  
   Community plugins can embed:
   - a Claude UI
   - a terminal panel
   - or an MCP (Model Context Protocol) bridge

4. **Add a CLAUDE.md file**  
   This acts as persistent instructions for how Claude should treat your vault:
   - naming rules
   - folder logic
   - writing style
   - do-and-don't rules

That file alone is a game changer.

---

## This Is What "AI-Native Tools" Actually Mean

The big takeaway for me:

AI isn't powerful because it generates text.
It's powerful when it can operate inside your system.

Obsidian + Claude Code feels less like "AI assistance" and more like:

- a junior researcher
- a documentation refactorer
- a memory gardener

All rolled into one.

---

## Where This Gets Really Interesting

This setup hints at what's coming next:

- AI agents with long-term memory
- tools that respect user-defined structure
- local-first, file-based workflows
- assistants that change the system, not just comment on it

For builders, writers, and knowledge hoarders — this is the direction.

---

## Final Thought

If you use Obsidian seriously — as a thinking tool, not just a notebook — embedding Claude Code is worth experimenting with.

It doesn't replace thinking.
It removes friction from maintaining thought.

And that's the difference.
