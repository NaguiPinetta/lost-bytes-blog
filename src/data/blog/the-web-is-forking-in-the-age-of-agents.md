---
title: "The Web Is Forking in the Age of Agents"
description: "Agentic commerce, content for non-human readers, and agent search are being standardized in parallel. The existing web is growing a second interface — for agents."
pubDatetime: 2026-02-22T09:00:00Z
modDatetime: 2026-02-22T09:00:00Z
tags:
  - agents
  - ai
  - web
  - commerce
  - infrastructure
draft: false
featured: true
---

The "agents need money" piece is no longer a handwavy future claim. Multiple payment and commerce providers have shipped concrete primitives that assume the buyer is software, the flow is programmatic, and credentials must be constrained by design.

Stripe shipped Instant Checkout in ChatGPT and publicly positioned the **Agentic Commerce Protocol** as an open standard codeveloped with OpenAI. Stripe's **Shared Payment Tokens** are explicitly scoped and limited, with agent-granted usage limits like max amount and expiration windows. In other words, the protocol assumes the agent is a delegated actor that should never hold raw payment credentials and should not be able to pay outside a tight contract.

On the crypto side, Coinbase introduced **Agentic Wallet**, a wallet surface intended for AI agents, with features like configurable spending limits and key isolation where private keys are not exposed to the agent. It ties directly to **x402**, Coinbase's open payment protocol that "revives" the reserved HTTP 402 status code to enable programmatic payments over HTTP without traditional account and session flows. This matters because HTTP 402 is historically reserved and lacks a standard convention, which is exactly the gap x402 is trying to fill with a concrete spec and headers.

Meanwhile, Google published the **Universal Commerce Protocol (UCP)** as an open-source "common language" for agentic commerce journeys, explicitly describing it as a way to collapse "N × N" integrations into a single integration point and noting compatibility with the Agent Payments Protocol (AP2). The meta-signal here is not that any one protocol will "win." It is that large platforms are converging on the idea that **agentic checkout is a protocol problem, not a UI problem.**

Finally, the card networks have started shipping agent authentication and intent verification as first-class payment infrastructure. Visa launched its **Trusted Agent Protocol (TAP)** as a framework for secure communication between agents and merchants during transactions and described it as a way for merchants to distinguish trusted agents from malicious automation. TAP is built on HTTP Message Signatures (RFC 9421), which is a standards-track mechanism for signing components of HTTP messages.

---

## The content layer is adapting for non-human readers

Classic web pages are optimized for human browsing, with navigation, trackers, scripts, and layout noise that is irrelevant to an LLM trying to extract meaning. This mismatch is now being addressed at the infrastructure layer.

Cloudflare shipped **"Markdown for Agents,"** which uses standard HTTP content negotiation. If a client requests `text/markdown` via the `Accept` header, Cloudflare fetches the origin HTML, converts it to Markdown, and serves it back with `content-type: text/markdown`. The response includes `vary: accept`, which is the cache-correct way to indicate the response differs based on request headers. Cloudflare also adds an `x-markdown-tokens` header that estimates token count, explicitly optimizing for agent context planning and chunking.

Cloudflare's own example quantifies the cost reduction: the same Cloudflare blog post is 16,180 tokens in HTML and 3,150 tokens in Markdown — an **80% reduction.** This is not just a formatting trick. It is a statement that agents are now considered "clients" worth serving efficiently, using HTTP-native mechanisms rather than scraping duct tape.

Cloudflare also bundled governance signals into the content path. Converted responses include a **Content-Signal** header (for example `ai-train=yes`, `search=yes`, `ai-input=yes`) tied to its Content Signals framework for expressing downstream usage preferences. This is part of a broader industry scramble to create something like `robots.txt` for AI usage — except `robots.txt` is explicitly not authorization and is often ignored in practice.

---

## Discovery is splitting into human search and agent search

If the web is forking, search is where the fork becomes measurable. Human search is optimized for browsing and attention. Agent workflows are optimized for programmatic retrieval, structured outputs, and low latency across chained steps.

Agent search benchmarks now talk openly about latency compounding across multi-step workflows. AIMultiple's February 2026 benchmark reports a roughly **20× latency range** between providers, from 669ms (Brave) to 13.6s (Parallel Pro), arguing that when quality is similar, speed becomes the deciding factor in agent pipelines.

Specialized providers are also publishing eval methodology to compete on "factuality under retrieval," not on link-blue-color UX. Exa reports that Exa Fast reaches 94% accuracy on SimpleQA with median latency under 500ms in its own evaluation documentation. Even if you discount self-reported numbers, the important structural shift is what the product returns: **APIs that deliver content and URLs directly for downstream tool use**, instead of a page that assumes a human will click around.

This "search for machines" track has a clear echo of earlier web client shifts. The mobile era did not just shrink screens. It forced different primitives, design patterns, and performance assumptions to become normal. Responsive Web Design, popularized in 2010, exists because the same content had to adapt to a new dominant client. The agent era is repeating that pattern — except the new client is not a device. **It is software.**

---

## Execution environments are turning agents into "workers," not chatbots

A web that agents can read and pay on still needs a way for agents to do work over time. That requires execution, state, and artifact handling.

OpenAI's February 2026 post on **"Shell + Skills + Compaction"** describes a set of primitives aimed at long-running agent workflows: reusable "skills" as versioned instruction bundles, a hosted shell tool that runs in OpenAI-managed containers where agents can install dependencies and write files, and server-side compaction to prevent long runs from collapsing under context limits. The same post explicitly frames skills as a way to avoid "prompt megadocs" and make procedures mountable and reusable across runs, with a concrete example of improved eval accuracy and reduced time-to-first-token from an early enterprise user.

Two details are especially relevant to a "forking web" thesis:

**First,** the shell tool makes the agent a first-class consumer of Linux-like execution, not just APIs. An agent can install dependencies, run scripts, and write artifacts to disk as a best-practice handoff boundary.

**Second,** OpenAI calls out the security posture required once you mix powerful procedures with networking. The guidance is clear: treat skills plus network access as high risk, keep allowlists strict, and keep credentials out of the model via domain secrets. That is the same **"agent is not automatically trustworthy"** assumption that shows up in payment guardrails and agent authentication protocols.

---

## Trust is becoming the missing primitive

Once agents can read, search, execute, and pay, the main bottleneck becomes trust and containment.

The **payment layer** is building trust via constraints and cryptography. Stripe's Shared Payment Tokens have explicit usage limits and revocation semantics. Visa's Trusted Agent Protocol is explicitly about verifying approved agents, distinguishing them from malicious bots, and preserving visibility into the user behind the agent. Coinbase's Agentic Wallet emphasizes spending guardrails and protecting private keys from exposure to the agent.

The **infrastructure layer** is building trust via policy signals and monetization hooks. Cloudflare's AI Index proposes a permissioned model for discovery, including opt-in indexing, an MCP server, and a search API, plus the ability for site owners to monetize access through Pay per crawl and x402. This is a direct response to the blind-crawl economics that defined the human web search era.

The **"skills marketplace" layer** is where trust failures show up first. OpenClaw is a useful case study because it combines local permissions, third-party "skills," and user trust. Recent reporting describes malicious skills uploaded to OpenClaw's skill registry that trick users and agents into executing malware or exfiltrating secrets — which is exactly why modern guidance increasingly assumes tools are untrusted by default. The practical conclusion is uncomfortable: **if the web is forking, the attack surface is forking with it.**

---

## A fork, not a redesign

I kept this idea around for a while: that agents would "change the web." I assumed that meant new websites, new apps, and new startups.

That is not what is happening.

What is happening is quieter.

The existing web is growing a **second interface.** Not a redesign. A fork.

The first interface is for humans. It speaks HTML, layout, and persuasion.

The second interface is for agents. It speaks Markdown, JSON, and protocols.

Cloudflare is a clean example. If an agent asks for `text/markdown`, Cloudflare will convert HTML to Markdown on the fly and return it with an `x-markdown-tokens` header so the agent can budget context. The same page can now ship two representations, cache-correctly, using content negotiation and `vary: accept`.

That sounds small until you notice what it implies.

**Agents are no longer treated as scraping bugs. They are treated as clients.**

Payments are doing the same shift. Stripe and OpenAI put Instant Checkout inside ChatGPT and open-sourced the Agentic Commerce Protocol as the shared language between agents and merchants. Stripe's Shared Payment Tokens are scoped and expiring because an agent is not supposed to hold raw credentials. Coinbase built an Agentic Wallet that gives an agent spending power while keeping private keys out of reach, with spending guardrails as a default feature, not an afterthought. On top of that sits x402, which tries to standardize "pay to access" directly over HTTP by reviving HTTP 402 in a real protocol.

Then there is trust. Visa's Trusted Agent Protocol is built to let merchants identify approved agents, distinguish them from malicious bots, and carry intent and transaction context through a flow without rebuilding everything. It is literally HTTP signatures as identity and intent, because we do not have a better primitive yet.

Search is forking too. Agent search benchmarks talk about latency compounding because multi-step agent work turns small delays into minutes quickly. Providers like Exa publish evals that frame speed and factuality as the product, not a list of links for a human to browse.

Execution is the final piece. OpenAI's hosted shell, skills, and compaction package is a bet that agents are not just chat interfaces. They will install dependencies, run scripts, and produce artifacts in containers, then keep going for long runs without collapsing under context.

So yes, **the web is forking.**

Not because someone declared a "new web." Because the old web is adding a second client type, and the infrastructure companies are making that client real.

The open question is not whether agents will browse and buy. They already are.

The open question is **what will build trust fast enough** to keep the fork from turning into a fraud layer, a malware layer, and a generic bot war.

That part is still being written.
