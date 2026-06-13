---
title: "AMD's Gorgon Point Closes the Mini-PC Gap on the M4 Pro"
description: "A developer-and-LLM benchmark of AMD's new Ryzen AI mini PC against Apple's M4 Pro Mac Mini lands at a more interesting place than 'who wins' — it's about price-per-capability."
pubDatetime: 2026-06-13T09:15:00Z
modDatetime: 2026-06-13T09:15:00Z
tags:
  - hardware
  - ai
  - local-llm
  - notes
draft: true
featured: false
---

The interesting hardware question in the small-form-factor box isn't "Apple or AMD" anymore — it's how much you pay for the capability you actually need. Alex Ziskind put AMD's new Ryzen AI 9 HX chip ("Gorgon Point," successor to last year's Strix Point) in a Beelink mini PC up against the M4 Pro Mac Mini on developer and local-LLM workloads, and the takeaway lands on price, not a knockout.

The shape of the comparison, per his testing: spec the Mac Mini to a base M4 Pro — *not* the 20-core GPU, 48GB rather than 64, 1TB storage, 10GbE — and you're at roughly $2,000. The AMD box comes in meaningfully cheaper while shipping 1TB of storage, which reframes the question from "is the new model an upgrade?" to "should I buy the new AMD box, last year's still-discounted model, or save for the M4 Pro (or the eventual M5 Pro)?"

For local-LLM work specifically, that calculus matters more than raw single-threaded wins. Inference is memory-bandwidth and memory-capacity bound; the machine that lets you hold a bigger model in unified memory for fewer dollars often beats the one that's marginally faster per core. Apple's unified memory has long been the quiet reason Mac Minis punch above their weight for running models locally — and an AMD box narrowing that gap on price is the actual story.

The caveats are the usual ones for a single creator's bench: it's one reviewer's workload mix, the numbers come from his tests rather than a standardized suite, and "caught the M4 Pro" is doing some headline work — closing a gap isn't passing. Treat it as a signal that the local-inference hardware market is getting genuinely competitive below $2K, and verify against your own model sizes before buying.

Source: [Alex Ziskind — *AMD's Strix Successor Just Caught the M4 Pro*](https://www.youtube.com/watch?v=sxMSKyrnZH4) (YouTube). Benchmark figures are his.
