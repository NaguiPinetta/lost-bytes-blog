---
title: "Reverse-Engineering Your Software Architecture with Claude Code (So Claude Can Actually Help)"
description: "Use Claude Code to reverse-engineer your system into versioned flow docs, then use those flows as a source of truth for investigations and support."
pubDatetime: 2026-02-09T09:00:00Z
modDatetime: 2026-02-09T09:00:00Z
tags:
  - architecture
  - claude
  - ai
  - documentation
  - workflows
draft: false
featured: true
---

If you've used Claude Code for real work, you've probably seen this pattern:

- With a stack trace, it's great: it finds the code, explains the bug, suggests a fix.
- Without a stack trace (support tickets, weird data anomalies, "customer says X"), it gets… vague.

The reason is simple: Claude doesn't know your system's end-to-end behavior.

Modern systems don't live in one repo. They're spread across:

- UI repo(s)
- BFF(s)
- service repos
- event handlers
- workflows (Step Functions / Temporal / etc.)
- databases
- message buses

So I started doing something different:

**Use Claude Code to reverse-engineer the system into flow documentation, then use those flows as a "source of truth" for future investigations.**

This post is a practical tutorial showing how to do that reliably.

---

## What you're building

You will generate a folder of architecture flows that look like:

UI → BFF → API → DB → publish event → handler → use case → publish event → …

Each flow gets:

- a readable README.md (tables + explanation)
- a strict diagram.mermaid (Mermaid flowchart with swimlanes per repo)

Claude can then use these flows later to:

- identify "what should have happened"
- compare expected vs observed behavior
- plan investigations without re-reading your entire codebase

---

## Why this works

Claude struggles with complex issues because it has to:

1. discover your architecture from scratch
2. keep it in its context window
3. re-derive it every time

Flow docs solve that. They're:

- versioned in git
- compact
- stable
- easy for humans
- easy for AI agents

---

## The Setup (One-Time)

### 1) Put your repos under one parent folder

Claude needs to read sibling repos to connect the dots.

Example layout:

```
~/code/
  core-domain-repo/      (your "center of the universe")
  ui-repo/
  bff-repo/
  service-orders/
  service-payments/
  service-shipping/
  workflows/
  events/
```

You'll run Claude Code from the core repo, but allow it to read the rest.

---

### 2) Create three lightweight docs in your core repo

Create these files:

```
docs/architecture/
  AI_ARCHITECTURE_ANALYSIS.md
  SYSTEM_OVERVIEW.md
  DOMAIN_CONCEPTS.md
```

**SYSTEM_OVERVIEW.md** (keep it light)

A bullet list:

- ui-repo — UI routes and user actions
- bff-repo — endpoints called by UI, calls downstream services
- service-orders — owns Order domain, publishes orders.* events
- workflows — Step Functions .asl.json
- events — event names and schemas

That's it. No essays.

**DOMAIN_CONCEPTS.md** (keep it light)

Explain entities and key operations in plain language:

- Order: lifecycle pending → confirmed → shipped
- ops: Order.create(), Order.confirmPayment(), Order.cancel()
- Payment: authorize(), capture()
- Shipment: create()

This helps Claude avoid semantic hallucinations.

---

### 3) Create the requirements file (this is the engine)

Create `docs/architecture/AI_ARCHITECTURE_ANALYSIS.md`.

Use this structure (adapt repo names + paths):

```markdown
# AI Architecture Analysis

## Objective
Map out all flows this application is involved in.

A flow maps end-to-end behavior from:
UI action → BFF → backend APIs → DB → events → handlers → use cases → events → …

Flows must be documented in Mermaid for versioning and visualization.

## Output Contract
- Flow list: docs/architecture/flows/index.md
- Each flow in: docs/architecture/flows/<flow-slug>/
  - README.md
  - diagram.mermaid

Do NOT create extra files.

## Requirements
Each flow must include:
1) UI URL path (or triggering event)
2) BFF endpoint path + repository
3) Downstream service endpoints
4) Database interactions
5) Events produced/consumed (full name)
6) Consumers of events (if easy to identify)
7) Workflows triggered and key workflow steps

## Where to Find Information
- docs/architecture for domain/system docs
- OpenAPI specs (use as index + validation)
- Workflow definitions (e.g. *.asl.json) MUST be read end-to-end
- Domain entities/use cases describe operations and entry points

## diagram.mermaid Requirements (CRITICAL)
1) Must be pure Mermaid (.mermaid), NO markdown fences
2) Must start with: flowchart LR
3) Swimlanes: each repository is a subgraph with direction LR
4) Step types ONLY:
   - HTTP Endpoint (full path)
   - Aggregate Method Call
   - Database Operation (cylinder)
   - Event Publication
   - Workflow Trigger
   - Workflow Step (prefix with workflow name)
   - Lambda Invocation
   - UI Action

## Validation
At the end, list:
- endpoints from OpenAPI not in any flow
- events produced/consumed not in any flow
```

This file is what makes the process repeatable.

---

### 4) Create the flows folder

```
docs/architecture/flows/
  index.md
```

Put a placeholder in index.md:

```markdown
# Architecture Flows
- (TBD)
```

---

### 5) Give Claude Code cross-repo read permissions

Edit:

`.claude/settings.local.json`

Add:

```json
{
  "permissions": {
    "allow": [
      "Read(//Users/<you>/code/**)"
    ]
  }
}
```

Restrict the path if you want tighter access, but the point is: Claude must read sibling repos.

---

## The Workflow (Repeatable)

### 6) Map the first flow with Claude (this becomes the template)

Start Claude Code in your core repo.

Prompt:

> Read:
> - docs/architecture/AI_ARCHITECTURE_ANALYSIS.md
> - docs/architecture/SYSTEM_OVERVIEW.md
> - docs/architecture/DOMAIN_CONCEPTS.md
>
> Propose a plan to produce ONE flow first (as a template).
> Ask me which flow to start with.
> Do not generate other flows yet.

Pick a first flow that includes:

- a UI route
- a BFF endpoint
- at least one downstream service
- at least one event
- ideally one workflow

This first one might take 1–2 hours to refine. Worth it.

---

### 7) Enforce a consistent README template for every flow

Each README.md should follow the same shape so both humans and Claude can use it later:

- Overview
- Flow boundaries (Start / End)
- Quick Reference tables: endpoints, events, DB tables, domain ops
- Flow steps (numbered)
- Repos involved
- Related flows
- Link to diagram.mermaid

Consistency > beauty.

---

### 8) Enforce strict Mermaid swimlanes

Your diagram.mermaid must:

- start with flowchart LR
- define one subgraph per repo
- contain only allowed node types

If Claude generates "diagram zoo" (sequence diagrams, mixed styles), you correct it:

> Fix diagram.mermaid to comply with CRITICAL rules in AI_ARCHITECTURE_ANALYSIS.md.
> No markdown. Starts with flowchart LR. Swimlanes per repo. Only allowed step types.

---

### 9) Generate the next flows faster (new session per flow)

After the template exists, flows get faster.

Prompt for each new flow:

> Create flow documentation for: [flow name]
> Follow AI_ARCHITECTURE_ANALYSIS.md strictly.
> Create folder with README.md + diagram.mermaid only.
> Update docs/architecture/flows/index.md.
> Use OpenAPI specs to validate endpoints.
> If a workflow is involved, locate the .asl.json and trace to final event.

---

## The Reliability Layer (Do this or you'll get misled)

### 10) Workflow tracing rule (critical)

Claude will miss events if it doesn't read workflow definitions.

Add/keep this rule and enforce it:

When you encounter a workflow, you MUST:

1. find .asl.json
2. read the entire workflow
3. document every event in sequence (including the final one)

This alone prevents some of the most dangerous omissions.

---

### 11) Coverage audit: endpoints and events not in any flow

Once you have a handful of flows, run this check:

Prompt:

> Using OpenAPI specs and event definitions across repos, list all endpoints and events.
> Tell me which endpoints/events are NOT referenced in any flow under docs/architecture/flows.
> Output two tables: Missing Endpoints, Missing Events.

This lets you spot gaps quickly.

---

### 12) Compliance pass: compare flows vs requirements

Claude will ignore rules sometimes. Make it self-review:

> Review every flow folder and compare outputs against AI_ARCHITECTURE_ANALYSIS.md.
> Fix omissions and Mermaid syntax errors.
> Keep the output contract (README.md + diagram.mermaid only).

---

## The Payoff: Making Claude Better at Support Tickets

### 13) Add one step to your investigation prompt

When investigating a ticket/log anomaly:

**Identify the affected flows in docs/architecture/flows before analyzing.**

This changes the dynamic completely.

Instead of "Claude guesses from logs," it becomes:

1. Find expected behavior from flow docs
2. Compare expected vs observed
3. Query the specific events/endpoints that matter
4. Narrow down where the divergence happened

---

## Accuracy Strategy (pick your comfort level)

You'll never get perfect accuracy from reverse-engineering alone, so decide:

- Good enough + re-scan when close to root cause
- Add CI validation later (endpoint/event coverage checks)
- Destroy and regenerate quarterly
- Build a verification agent that re-checks flows against code

The goal isn't perfection—it's faster correct direction.

---

## Closing Thought

This approach flips the problem:

Instead of asking Claude to "understand your system" every time…

…you build a compact, versioned architecture map that Claude can consult instantly.

It's not just documentation.
It's a cognitive index for your system — for humans and AI.
