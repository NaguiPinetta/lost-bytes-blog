---
title: "Plan–Code–Execute: Building Agents That Create Their Own Tools"
description: "A tutorial on building PCE agents that create their own tools on demand — no massive tool registry, just plan, code, and execute."
pubDatetime: 2025-02-11T09:00:00Z
modDatetime: 2025-02-11T09:00:00Z
tags:
  - agents
  - ai
  - tutorials
  - software
  - reasoning
draft: false
featured: true
---

Most agent frameworks today obsess over tool selection.

Which API should the agent call?
Which function should it choose?
How do we register more tools?

But that question already assumes something fragile:

That the right tools exist before the problem is understood.

In this tutorial, we'll build a Plan–Code–Execute (PCE) agent that does something more interesting:

**It creates its own tools, on demand, as code.**

No massive tool registry.
No orchestration framework magic.
Just small agents, real software, and clear reasoning.

---

## Why Pre-Built Tools Break Down

Pre-built tools work well for:

- demos
- bounded tasks
- known workflows

They break down when:

- data schemas change
- files aren't named what you expect
- tasks are exploratory
- the question itself evolves mid-analysis

Real work doesn't need more tools.
It needs agents that can invent tools when required.

---

## The Core Idea: Plan → Code → Execute

Instead of asking an agent which tool to use, we ask:

1. Plan what needs to be done
2. Code whatever doesn't exist yet
3. Execute the generated software
4. Explain the results

Code becomes a reasoning artifact, not a static dependency.

---

## The Architecture (Minimal, Explicit, Boring)

We'll build five small agents. Each has one job.

### 1. Analyst Agent (Grounding)

**Purpose:** Prevent hallucinations.

The Analyst:

- scans folders and files
- opens datasets
- infers schemas (columns, formats)
- reports what actually exists

This stops failures like:

"Load sales.csv"
when the file is actually Sales Order.csv

**Output:** A structured schema describing the environment.

---

### 2. Planner Agent (Reasoning)

**Purpose:** Turn intent into a dependency graph.

**Input:**

- user goal
- analyst schema

**Output:**

- a JSON plan
- each step labeled as:
  - CODE → needs executable software
  - TEXT → needs narrative synthesis

Example:

```json
[
  {"step": "Load sales data and compute rolling averages", "type": "CODE"},
  {"step": "Detect anomalies in production signal", "type": "CODE"},
  {"step": "Summarize findings for planner", "type": "TEXT"}
]
```

This is where reasoning lives.

---

### 3. Coder Agent (Tool Creation)

**Purpose:** Write real software.

For every CODE step, the Coder:

- writes a standalone Python script
- handles imports, paths, errors
- produces CSVs, plots, metrics

Important rule:

**The coder writes programs, not snippets.**

Each script should run independently.

---

### 4. Executor Agent (Reality Check)

**Purpose:** Run code, capture truth.

The Executor:

- runs generated scripts
- captures stdout / stderr
- stores artifacts (CSV, PNG, logs)

This is where ideas meet reality.

If something breaks, logs become feedback.

---

### 5. Reporter Agent (Human Output)

**Purpose:** Turn artifacts into understanding.

The Reporter:

- reads metrics, plots, logs
- answers the original question
- adapts tone (planner, manager, engineer)

This agent never invents facts — it narrates results.

---

## Orchestration (Almost Embarrassingly Simple)

No framework required.

A `main.py` that does:

```python
schema = analyst.scan()
plan = planner.create_plan(goal, schema)

for step in plan:
    if step.type == "CODE":
        script = coder.write(step, schema)
        executor.run(script)

report = reporter.summarize(plan.outputs)
```

Each agent is ~50–100 lines.
That's the point.

---

## Why This Works Better Than Tool Catalogs

**Tools are disposable**

Generated → used → forgotten.

No maintenance debt.

**Grounding comes first**

The analyst removes guesswork before reasoning starts.

**Code is explainability**

Every chart, metric, and transformation is inspectable.

**Cost is trivial**

The full end-to-end system (real data, real charts) can run for under $1 in tokens.

---

## When You Should Use This Pattern

Use Plan–Code–Execute when:

- data is messy or evolving
- tasks are exploratory
- explainability matters
- you don't know upfront what tools you'll need

Don't use it for:

- chatbots
- CRUD workflows
- simple automations

This is a thinking architecture, not a UI feature.

---

## The Bigger Shift

This isn't really about agents.

It's about changing how we think about software:

When planning, coding, and execution are reasoning steps,
tools stop being assets and start being artifacts.

The most powerful agents won't be the ones with the biggest toolboxes.

They'll be the ones that can turn intent into working software — on the fly.

---

## What I'm Exploring Next

- applying PCE to translation pipelines (Omniglot)
- explainability agents for AI training runs
- dataset-aware documentation agents
- agents that refactor their own code

If you're building agentic systems and still arguing about tool schemas —
you might already be late.
