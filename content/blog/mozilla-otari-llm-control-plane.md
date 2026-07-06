---
title: "Mozilla.ai's Otari and the Control Plane Gap: Why Agent Governance Is the New DevOps"
subtitle: "An open-source LLM control plane for orchestration, routing, and governance — Mozilla.ai is solving the problem that every multi-model enterprise has and few have named."
date: "2026-07-05"
excerpt: "Mozilla.ai launched Otari in early July 2026: an open-source LLM control plane for managing agent orchestration, routing, and governance across providers. The control plane concept is borrowed from infrastructure networking. Applied to AI agents, it solves a class of problems that are going to define enterprise AI operations for the next three years."
tags: ["AI Governance", "Open Source", "AI Agents", "AgOps", "LLM", "Mozilla", "Multi-Agent Systems"]
featured: true
author: "John K. Johansen"
heroImage: "/images/blog/mozilla-otari-llm-control-plane-hero.png"
---

The control plane concept comes from networking. In modern network infrastructure, the control plane handles routing decisions — where does this packet go, how does traffic flow, what policies apply — while the data plane handles the actual packet forwarding. The split exists because routing decisions are complex and policy-dependent, while packet forwarding is high-throughput and needs to be as simple and fast as possible. Mixing the two in the same system creates architectural compromises in both directions.

Mozilla.ai launched Otari in early July 2026 as an open-source LLM control plane: a system that manages the routing, orchestration, and governance decisions for AI agent traffic, separate from the actual inference. The analogy to network control planes is deliberate and correct. The problem Otari is solving — how do you make principled, policy-governed routing decisions for LLM traffic across multiple models and providers — is exactly the control plane problem applied to AI.

## The Problem Otari Is Solving

Any organization that has deployed AI for more than a year and has more than one model in use has a routing problem. It may not have been named as such, but it exists.

Which model handles which request? When do you use the expensive frontier model versus the capable but cheaper local model? When does a request that started on one model get handed off to another because the context requires a different capability? When do you route to a cloud provider versus the on-premise inference cluster? What happens when one provider is unavailable? How do you enforce the policy that certain data categories never leave the perimeter — which means routing requests involving that data exclusively to on-premise inference?

These decisions are currently being made in application code. Each application has its own routing logic, its own fallback behavior, its own policy encoding. When the routing logic needs to change — a new model becomes available, a provider has an outage, a policy is updated — every application that contains routing logic needs to be updated. The policy is distributed across the codebase rather than centralized in a governance layer.

This is the control plane gap. The AI ecosystem has excellent data planes — inference servers that can serve LLM requests at high throughput and low latency. It has not had a control plane: a centralized system that makes routing and governance decisions and expresses those decisions to the data plane, separated from the data plane's execution.

Otari is Mozilla.ai's answer to that gap. It provides a centralized place to define routing policies — "requests from this application go to this model unless the data contains a PII marker, in which case route to the on-premise inference cluster" — and applies those policies at runtime without requiring each application to implement its own routing logic.

## Why Mozilla.ai Building This Matters

Mozilla has a specific institutional perspective that makes them an interesting actor in this space. Their history with the web — particularly the Firefox project and the advocacy work around open web standards — has made them deeply attentive to centralization risks. An internet where routing and governance decisions are controlled by a small number of powerful entities is something Mozilla has spent decades arguing against.

The same concern applied to AI: a world where AI routing and governance decisions are controlled by a small number of hyperscalers or platform companies is a world that reproduces the centralization dynamics Mozilla has always opposed. Otari being open-source is not just a release strategy. It is an architectural commitment: the control plane for AI routing and governance should not be a proprietary black box owned by one vendor.

For enterprises evaluating Otari, this matters. Open-source control planes can be audited, forked, and self-hosted. The routing policies you define, the governance logic you implement, and the data that flows through the routing decisions stay under your control. A proprietary control plane run by a vendor offers the same routing functionality with a different governance model — one where the vendor can change the rules, inspect the traffic, or deprecate the service.

## The Relationship to What I Am Building

The control plane concept maps directly to work I have been doing with Kaigents and KaiCatalog, and I want to be specific about the relationship rather than vague.

KaiCatalog is a catalog — it defines what tools and models are available, what their capabilities are, and what governance policies apply to each. This is the policy definition layer. KaiManager is the process governance layer — it defines how agents execute workflows, where quality gates are, and what the audit trail looks like. Neither of these is a routing layer in the network sense.

Otari sits in a different part of the architecture: the runtime routing layer that takes an incoming LLM request and decides where it goes, based on the policies defined elsewhere. This is complementary to what Kaigents does. Kaigents governs the agent workflows — the processes. Otari governs the LLM traffic — the inference routing. Both layers are necessary for a complete AI governance architecture. Neither replaces the other.

The emergence of Otari as an open-source project means that organizations building on Kaigents now have a community-supported option for the routing layer, rather than needing to build it from scratch or rely on a proprietary service.

## Agent Governance Is the New DevOps

I want to propose a framing that I think captures where we are. In the 2010s, DevOps was the discipline that emerged to govern the software delivery process — the practices, tools, and organizational structures that determined how software moved from developer to production. Before DevOps, this was ad hoc, inconsistent, and often chaotic. DevOps gave it structure.

Agent governance — AgOps, as I have been calling it — is the same discipline emerging for AI agent systems. The practices, tools, and organizational structures that determine how AI agents are deployed, how they operate, what they can do, and how they are monitored and audited. Before AgOps, this is ad hoc, inconsistent, and often chaotic. The tools are arriving — Omnigent, Atryum, AgentGateway, Otari, Kaigents — that make AgOps possible.

Otari's contribution to AgOps is the control plane: the centralized routing and governance layer that separates policy definition from policy execution, that gives organizations a single place to change routing decisions rather than hunting through application code. This is exactly the DevOps lesson applied to AI: centralize the policy, distribute the execution, and gain governance through visibility rather than through restriction.

## The Practical Starting Point

If your organization has more than two LLMs in use and more than one team writing applications on top of them, you have a control plane gap. The routing decisions are in the application code. The policies are inconsistent. The audit trail is incomplete.

Otari is a practical starting point for closing that gap. It is open-source, which means you can evaluate it without a procurement process. It is actively maintained by Mozilla.ai, which brings institutional backing to what might otherwise be a community project with uncertain longevity. And it addresses a problem that is only going to get more complex as your model portfolio and your agent deployment footprint grows.

The control plane for enterprise AI is the problem that defines the next three years of the space. The teams that solve it early — that centralize their routing logic, formalize their governance policies, and build the observability infrastructure to understand what their AI is doing — will operate at a fundamentally different level of capability and confidence than the teams that don't.

AgOps is the new DevOps. The tools are here. The work is starting.
