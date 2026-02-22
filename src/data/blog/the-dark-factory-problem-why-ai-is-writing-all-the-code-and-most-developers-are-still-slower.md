---
title: "The Dark Factory Problem: Why AI Is Writing All the Code and Most Developers Are Still Slower"
description: "Most developers are slower with AI. The gap between vibe coding and real Dark Factories is the most important organizational gap in software."
pubDatetime: 2026-02-23T09:00:00Z
modDatetime: 2026-02-23T09:00:00Z
tags:
  - ai
  - software
  - productivity
  - dark-factory
  - engineering
draft: false
featured: true
---

Ninety percent of Claude Code was written by Claude Code.
Codex is shipping features authored entirely by Codex.
A handful of teams are running software factories where no human writes code and no human reviews it.

And yet, most developers using AI are slower than before.

Not slightly slower. Measurably slower.

A 2025 randomized controlled trial by METR found experienced open source developers took 19% longer to complete tasks when using AI tools. Worse, they believed they were 24% faster. They were wrong about both the direction and the magnitude.

This gap is not a tooling gap.
It is the most important organizational gap in software right now.

And it explains why the future belongs to Dark Factories, not copilots.

---

## Two Realities, One Industry

At one end of the spectrum, Anthropic reports that nearly all production code is AI generated. Claude Code is building itself. Engineers write specs and evaluate outcomes. That's it.

At the other end, most teams bolt AI onto workflows designed for humans. They autocomplete functions, refactor files, review diffs, attend standups, run sprints, and wonder why things feel worse.

Both groups are using AI.
Only one group redesigned the system around it.

That difference matters more than the model.

---

## The Five Levels of Vibe Coding

Dan Shapiro's framework cuts through the hype by naming what people are actually doing.

**Level 0: Spicy Autocomplete**
You write code. AI suggests the next line.

**Level 1: Coding Intern**
You give small tasks. You review everything.

**Level 2: Junior Developer**
Multi file changes. You still read all the code.

**Level 3: Manager**
AI submits PRs. You approve or reject.

Most teams stop here and think they are advanced.

**Level 4: Product Manager**
You write specs. You evaluate outcomes. Code is a black box.

**Level 5: Dark Factory**
Specs go in. Working software comes out.
No human writes code. No human reviews code.

StrongDM operates here today.

---

## What a Real Dark Factory Looks Like

StrongDM's software factory is not magic. It is discipline.

Three engineers.
Three markdown specification files.
An open source agent called Attractor.

No traditional tests. Instead, they use scenarios.

Scenarios live outside the codebase. The agent cannot see them. They define behavior, not implementation. They act as a holdout set so the AI cannot optimize for passing tests instead of building correct software.

On top of that, StrongDM runs a digital twin universe.
Simulated Okta. Simulated Jira. Simulated Slack. Simulated Google APIs.

Agents develop against fake worlds, not production systems. Full integration testing without touching real data.

This is not theoretical. CXDB ships today with tens of thousands of lines of Rust, Go, and TypeScript. Built end to end by agents.

Their rule of thumb is blunt and correct.
If you are not spending roughly $1,000 per engineer per day on agent compute, you are not operating a serious software factory.

---

## Why Most Developers Get Slower

The slowdown is not because AI is bad at writing code.

It is because adding AI to a human centric workflow creates friction.

Developers spend time reviewing almost correct code.
They context switch between their mental model and the model's output.
They debug subtle failures that look right but are wrong.

AI makes writing cheaper.
It makes owning code more expensive.

This is the bottom of the J curve. Productivity dips before it rises. Most organizations never redesign the workflow, so they stay stuck at the bottom and conclude the tools do not work.

The frontier teams did the opposite. They redesigned everything.

---

## Dark Factories Delete Human Coordination

Standups exist because humans forget.
Sprints exist because humans need pacing.
Code review exists because humans make mistakes.
QA exists because humans cannot objectively evaluate their own work.

When agents implement, those structures stop being safeguards and start being friction.

StrongDM has no sprints. No standups. No Jira board.
They write specs. They evaluate outcomes.

That is not cost cutting.
That is removing systems that no longer serve a purpose.

This is why the transition is painful. It is not just technical. It is political. Entire roles exist to manage coordination between humans. When coordination disappears, those roles must transform or vanish.

---

## The Bottleneck Has Moved

The constraint is no longer implementation speed.
It is specification quality.

Writing a spec that an agent can execute without ambiguity is hard. Harder than writing code. It requires deep system understanding, customer insight, and ruthless clarity.

Humans used to fill gaps with judgment and Slack messages. Agents do not. They build exactly what you described.

If the spec is vague, the output will be confidently wrong.

This is why Dark Factories amplify great engineers instead of replacing them. They turn judgment into the limiting factor.

---

## The Junior Developer Problem

AI is hollowing out the bottom of the career ladder.

Junior roles are declining sharply. The work juniors used to learn on is now automated. Seniors are using AI to do the same tasks faster and with more context.

The apprenticeship model is breaking.

Some organizations are responding with simulated environments where juniors learn by reviewing and directing AI systems instead of writing code from scratch. It is not the same kind of learning, but it may be the right one for the world we are entering.

The bar is rising. Adequate is no longer a viable position. Adequate is what the models do.

---

## Why Dark Factories Are Inevitable

Software demand has never saturated. Every time compute got cheaper, software exploded into new categories.

AI is dropping the cost of building software by an order of magnitude. That unlocks markets that were never economically viable before.

The Dark Factory does not reduce the need for good engineers.
It removes the camouflage.

It forces the industry to confront who actually understands systems, customers, and tradeoffs deeply enough to direct machines correctly.

---

## Dark Factory Is Not a Tool. It Is a Choice.

Most teams are slower with AI because they are trying to preserve human era workflows in a post human implementation world.

The frontier teams made a different choice.
They stopped optimizing for humans writing code.
They optimized for humans deciding what should exist.

That is the real fork.

And the uncomfortable truth is this.
The Dark Factory does not need more engineers.
It needs better ones.

The future of software is not about writing code faster.
It is about being precise enough that machines can do it for you.

That future is already here.
