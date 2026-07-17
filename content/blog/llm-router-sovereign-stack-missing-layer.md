---
title: "The LLM Router Is the Missing Layer in Your Sovereign AI Stack"
subtitle: "You have models. You have infrastructure. Your routing logic is buried in application code, inconsistent across teams, and impossible to govern centrally. Here is how to fix that."
date: "2026-07-15"
excerpt: "Every organization with more than one LLM in production has a routing problem they have not named yet. Which model handles which request? When does sensitive data stay on-premise? What happens when a provider goes down? The answers are currently scattered across application code. The LLM router is the layer that centralizes those decisions — and the open-source options for building it have matured significantly."
tags: ["Sovereign AI", "AI Governance", "LLM", "AI Infrastructure", "AgOps", "Multi-Model AI", "AI Strategy"]
featured: true
author: "John K. Johansen"
heroImage: "/images/blog/default-blog-hero.png"
---

I wrote in early July about Mozilla.ai's Otari and the control plane gap — the problem that routing and governance decisions for LLM traffic are currently distributed across application code rather than centralized in a governance layer. That article covered the conceptual architecture. This one is more specific: what the routing problem actually looks like in practice, what the open-source options for solving it are, and how a model router fits into a sovereign AI stack alongside the inference infrastructure I have been writing about.

The starting point is naming the problem precisely, because most teams I talk to have the problem without having named it.

## The Routing Problem You Already Have

Consider a typical mid-sized enterprise AI deployment after twelve to eighteen months of growth. The data science team built a document summarization pipeline on Claude. The engineering team built a code review agent on GPT-5. The security team built an anomaly detection assistant on a local Llama model because the data is too sensitive for cloud inference. The product team is experimenting with Qwen3 for customer-facing classification.

Four teams. Four models. Four routing decisions made independently, encoded in four different codebases, with four different fallback behaviors, four different cost assumptions, and four different policies about what data goes where.

Now the CISO asks: can you show me a complete picture of what data is being sent to which AI providers, and confirm that none of our customer PII is leaving the perimeter? The answer requires examining all four codebases. When the answer is found, it is expressed in four different policy forms. When the policy needs to change — a new data classification requirement, a provider having a reliability incident — four teams need to be coordinated.

This is the routing problem. It is not a technical failure. It is a natural consequence of building AI capabilities in an environment where there was no shared routing infrastructure to use. The decisions ended up in the application code because that was the only place they could live.

## What a Model Router Does

A model router is a layer that sits between your applications and your inference backends — cloud APIs, local models, hybrid setups — and makes routing decisions based on centrally defined policies rather than application-embedded logic.

The routing decisions a production model router needs to make include:

**Capability routing**: This request needs reasoning depth that a 7B model cannot provide — route to the frontier API. This request is a structured extraction task that a local 8B model handles well — route to the sovereign tier. The decision is based on task characteristics, not on which team wrote which application.

**Data sovereignty routing**: This request contains a data classification marker indicating customer PII — route exclusively to the on-premise inference cluster, regardless of which application is making the request. The policy is enforced at the router, not remembered by each application team.

**Cost and budget routing**: This team has consumed 80% of their monthly token budget — route subsequent requests to the less expensive model tier until the budget resets. Cost governance lives in the router, not in a spreadsheet.

**Reliability routing**: The primary inference endpoint is returning elevated error rates — fail over to the secondary endpoint automatically, without application code changes. The router's health monitoring handles this transparently.

**Audit trail generation**: Every routing decision — which request went to which model, why, what the data classification was, what the cost was — is logged in one place. The CISO's question becomes answerable from a single system rather than four codebases.

## The Open-Source Options

The model router category has matured considerably in 2026. Several open-source options are now production-ready for enterprise use.

**Otari (Mozilla.ai)**: The most architecturally principled option. Otari is explicitly designed as an LLM control plane — borrowing the control plane / data plane split from network infrastructure. It handles routing policy definition separately from policy execution, which means routing rules can change without touching application code. Mozilla's institutional commitment to open-source governance and their history of opposing centralization make Otari a natural fit for organizations concerned about vendor dependency in their governance infrastructure. I covered Otari in detail on July 5.

**nexus-llm-router**: An OpenAI-compatible routing middleware with task-aware routing strategies, cost budget enforcement, observability hooks, and durable audit records. The task-awareness is particularly useful — nexus-llm-router can make routing decisions based on detected task type (code generation vs. summarization vs. classification) rather than requiring the application to specify the routing destination. For organizations where multiple teams are building on the router without centralizing routing configuration, task-aware defaults reduce the coordination overhead.

**multillm**: Focuses on the multi-tenant use case — multiple teams or applications sharing a common LLM gateway with per-tenant cost tracking, cross-model shared memory (so context from one model can inform routing decisions for another), and failover between providers. The shared memory concept is interesting for agentic workflows where a routing decision in one step should be informed by what happened in previous steps.

**smg (Sovereign Model Gateway)**: Written in Rust, which makes it a natural fit for organizations running Rust-based infrastructure (as I do with KaiManager and KaiCatalog). smg focuses on KV-cache-aware routing — it can make routing decisions that account for whether a request can reuse an existing KV cache on a particular inference endpoint, which meaningfully affects latency. It also includes multi-tenant authentication and pluggable chat history storage.

## Where the Router Fits in the Sovereign Stack

For a sovereign AI stack — inference running on AMD hardware via Lemonade, agent orchestration via Kaigents, governance via KaiManager — the model router occupies a specific position: between the agent's tool calls and the inference backends.

When a Kaigents agent makes an inference request, that request currently goes directly to whichever backend the agent's configuration specifies. For a small deployment with one or two inference endpoints, this is manageable. As the stack grows — hybrid OGA endpoints for small models, ROCm endpoints for larger models, frontier API fallbacks for tasks that exceed local capability — the routing logic needs to live somewhere. Without a router, it accumulates in each agent's configuration. With a router, it lives in one governance layer that all agents share.

The practical configuration that makes sense for the sovereign stack I run:

- Requests with task type = structured extraction, classification, or bounded code generation → Lemonade OGA hybrid endpoint (Qwen3-8B or DeepSeek-R1-Distill-Qwen-7B)
- Requests with task type = complex reasoning or extended context → Lemonade CPU/ROCm endpoint (larger models via llama.cpp-rocm)
- Requests containing data classification markers above threshold → on-premise only, regardless of task type
- Requests that exceed local model capability → frontier API with explicit budget limits
- All requests → audit log with routing decision, model used, token count, data classification

This configuration lives in the router. It does not live in each agent's definition. When the policy changes — a new model becomes available in the hybrid tier, a data classification threshold is updated — one configuration change propagates to all agents.

## The Governance Dividend

I want to be specific about why this matters beyond operational convenience. The router is where AI governance becomes auditable rather than aspirational.

When routing decisions are embedded in application code, your governance position is: "we have policies, and our developers follow them." When routing decisions are centralized in a router with policy enforcement and audit logging, your governance position is: "we have policies, the architecture enforces them, and here is the complete audit trail proving it."

For regulated industries, that is the difference between passing an audit and failing one. For any organization with a data sovereignty requirement — which increasingly means any organization processing personal data in the EU, health data anywhere, or financial data in jurisdictions with AI governance requirements — the router is the mechanism that makes the architecture trustworthy rather than merely policy-compliant.

The policy substitute that I described in the Sovereign AI Washing article — telling employees not to put sensitive data in AI prompts — is the application-code equivalent of embedded routing logic. It relies on human compliance rather than architectural enforcement. The router makes the right routing decision architecturally guaranteed rather than policy-dependent.

## Where to Start

If your organization has more than two LLMs in production and more than one team building on them, you have the routing problem. The question is whether to address it now or after it has caused a compliance incident.

The practical starting point is Otari or nexus-llm-router, both of which can be evaluated without a procurement process and deployed alongside existing infrastructure without requiring application changes beyond pointing at the router's OpenAI-compatible endpoint.

The inventory before you start: what models are in production, what data goes to each, what the routing decision is for each use case, and where that decision currently lives. That inventory is the basis for the routing policy you will define in the router.

The routing problem is not going to become simpler as your AI deployment grows. Address it while the inventory is still manageable.
