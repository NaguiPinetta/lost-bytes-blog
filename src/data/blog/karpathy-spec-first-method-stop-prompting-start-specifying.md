---
title: "The Spec Is the Work: Karpathy's Case Against Just Prompting"
description: "Andrej Karpathy's argument that the bottleneck in AI-assisted building isn't the model — it's the spec you fail to write. Distilled from a walkthrough of his AISN 2026 talk."
pubDatetime: 2026-06-13T09:00:00Z
modDatetime: 2026-06-13T09:00:00Z
tags:
  - ai
  - workflows
  - agents
  - notes
draft: true
featured: false
---

Here's a question Andrej Karpathy uses to expose what today's models still can't do: *I want to go to a car wash 50 metres away. Should I drive or walk?* State-of-the-art models say walk — it's close. They miss the obvious: you need the car at the car wash. I tried it on four frontier models after hearing this; they all said walk.

The point isn't that models are dumb. It's that they're brilliant at what can be *measured* and blind to context they were never given. Which is why, in Karpathy's framing — distilled here from austin.marchese's walkthrough of his AISN 2026 talk — almost everyone is prompting wrong.

The fix is the **spec**, and Karpathy is pointedly unimpressed with the lightweight version most tools ship. On plan mode: *"I don't even like the plan mode… I think there's something more general here where you have to work with your agent to design a spec that is very detailed."* (Translated nothing here — he said it in English; the channel is one of the few that does.)

Two moves make a spec real:

**Uncover the goal, not the task.** "Create an end-of-month report" is a task. The *goal* is the decision that report drives — the conclusion you're trying to reach. A model can execute the task but can never decide the goal; that information lives in your head. His trick for getting it out: tell the agent to *interview you* first. The spec is how your understanding gets into a form the model can use.

**Work agile, not waterfall.** The natural failure mode with capable agents is to hand them the whole thing at once and wait for a finished product. Karpathy's counter is to break the work into small buckets and check direction throughout. People over-trust agents precisely because the agents are good — and waterfall hides the drift until it's expensive.

The honest caveat: "write a better spec" is advice that's easy to nod at and hard to operationalize. The interview-me technique is the one concrete, stealable habit here — and it costs you nothing to try on your next non-trivial task before you write a single line of prompt.

Source: [austin.marchese — *Stop Prompting Claude. Use Karpathy's Method Instead*](https://www.youtube.com/watch?v=7zZy1QTvokM) (YouTube), summarizing Karpathy's AISN 2026 remarks.
