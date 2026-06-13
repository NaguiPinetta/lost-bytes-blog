---
title: "Dynamic Workflows: When the Agent Writes Its Own Orchestration"
description: "Claude Code can now write an orchestration script and fan a single prompt out to hundreds of parallel subagents. What it's for, and the one reason not to reach for it."
pubDatetime: 2026-06-13T09:10:00Z
modDatetime: 2026-06-13T09:10:00Z
tags:
  - claude-code
  - agents
  - workflows
  - tooling
draft: false
featured: false
---

There's a category of task that breaks normal agent sessions: the same operation applied across hundreds of items. Audit 300 video transcripts against a ruleset. Triage a backlog of support tickets. Run one transform over every file in a sprawling tree. Hand that to a single Claude Code session and it grinds through serially; reach for subagents manually and you're hand-wiring the fan-out.

**Dynamic workflows** are the answer to that shape, and per Leon van Zyl's walkthrough they're now generally available. The move: Claude Code writes *its own* orchestration script, then runs your one prompt across many parallel subagents in a single session. In his demo, 351 agents run at once, each applying the same rules to a different item, results merged into one final output at the end. Crucially it's not just for code — emails, tickets, transcripts, any batch of similar items qualifies.

How you trigger it is explicit, not magic. You tell Claude Code to use a workflow — van Zyl's phrasing is to open with `Ultra Code` then `use a workflow for the following`, then describe the job. The agent decides what fans out, what verifies, what merges.

The honest caveat — and he leads with it — is **cost**. Each subagent is effectively its own Claude Code session with its own system prompt, context, and tool calls. Multiply that by hundreds and a task you could have done in one session becomes dramatically more expensive run as a workflow. His rule of thumb: if you know the work fits in a single session, do it in a single session. Workflows earn their price only when the fan-out is real — many independent items, or a job too wide for one context to hold.

The mental model that helps: dynamic workflows are for *breadth*, not difficulty. A hard single problem doesn't want 300 agents; 300 easy-but-numerous problems do. Match the tool to the shape of the work, not the size of the ambition.

Source: [Leon van Zyl — *Claude Code Dynamic Workflows Explained for Beginners*](https://www.youtube.com/watch?v=Aa_6bmzDc80) (YouTube).
