---
title: "AgentGateway and the Data Plane Problem: Why Every Enterprise Needs a Single Governance Surface"
subtitle: "You cannot govern what you cannot see. One data plane for every agent, tool, and LLM is not an optimization — it is a prerequisite."
date: "2026-06-25"
excerpt: "AgentGateway debuted in late June 2026 as a single data plane to govern every AI agent, tool, and LLM in an enterprise environment. The problem it solves is not new. Any organization that has deployed more than one agent framework already has this problem — they just haven't named it yet."
tags: ["AI Governance", "AI Agents", "Enterprise AI", "KaiCatalog", "Security", "AgOps", "MCP"]
featured: true
author: "John K. Johansen"
heroImage: "/images/blog/agentgateway-data-plane-governance-hero.png"
---

The CISO at a mid-sized financial services firm asked me a question a few months ago that has stayed with me. Her organization had been deploying AI agents for about eighteen months — different teams, different frameworks, different models. She had just been asked by her board to provide a complete inventory of all AI tools in use and what data each one was touching.

She could not produce it.

Not because she was careless. Because the information did not exist in any single place. Each team had their own records. Each framework had its own logs. Each model integration had its own auth. The aggregate picture — what tools exist, what data they touch, what they cost, whether they are behaving according to policy — was assembled from partial records and engineering judgment, not a system.

AgentGateway, which debuted in late June 2026, is the product response to that problem. It proposes a single data plane through which all agent traffic flows — every tool call, every LLM request, every routing decision — observable, policy-governed, and cost-attributed from a single surface.

## The Data Plane Problem, Named

Infrastructure problems get solved faster once they have a name. "The data plane problem" is the state that any enterprise reaches after deploying more than one AI agent framework without a unified observability and governance layer. It looks like this:

Team A built their customer service agent in LangChain connected to GPT-5. Team B built their code review agent in Kaigents connected to local Qwen3. Team C has a custom Python integration that calls Claude for document summarization. Team D uses a SaaS AI product that manages its own model connections internally. Each of these is a separate stream of agent traffic. Each has separate logging, separate cost accounting, separate security controls.

When something goes wrong — a data leak, an unexpected cost spike, a policy violation — the investigation starts with "which system was it?" before it can start with "what happened?" The lack of a unified data plane is not just an operational inconvenience. It is a governance failure waiting to manifest as an incident.

The data plane problem is distinct from the management layer problem I wrote about yesterday. The management layer (Omnigent, Atryum, Kaigents) governs what agents are allowed to do. The data plane (AgentGateway) provides the observability and routing infrastructure through which that governance is enforced. Both are necessary. The management layer without the data plane cannot see what it is supposed to govern. The data plane without the management layer can observe traffic but cannot enforce policy.

## Why Agent Traffic Is Different

Traditional API gateway solutions do not solve the data plane problem for agents, because agent traffic is fundamentally different from human-initiated API traffic.

**Agent traffic is non-deterministic in volume and timing.** A human makes a request; an agent makes however many requests the current task requires, at whatever frequency it judges appropriate. An API gateway sized for human traffic patterns will be routinely overwhelmed or overprovisioned for agent traffic.

**Agent traffic is nested and chained.** A single agent task may trigger tool calls that trigger other tool calls that trigger LLM requests. The "request" is not an atomic unit — it is a workflow with multiple steps, each of which may generate observable traffic. A gateway that logs individual HTTP requests loses the workflow context that makes those logs interpretable.

**Agent traffic requires context-aware routing.** Traditional gateways route based on the request itself. An intelligent agent data plane needs to route based on the agent's current task, current cost budget, current policy context, and the characteristics of the available tools. That is a different routing problem.

AgentGateway is designed for this traffic pattern. It understands agent workflows as units, not just individual requests. It routes tool calls intelligently based on policy and availability. It attributes costs at the workflow level, not the request level.

## The Three Things a Real Governance Data Plane Must Do

Having thought about this problem for two years — both in building KaiCatalog, which solves the catalog side of the tool governance problem, and in observing how Kaigents manages agent traffic — I have arrived at three non-negotiable requirements for an agent data plane.

**Unified routing through a single observable chokepoint.** Every agent call to every tool and every LLM must pass through the governance layer. This sounds obvious, but it is difficult in practice because it means all existing integrations — including the legacy custom code that nobody wants to touch — must be rerouted. Organizations that grandfather existing integrations out of the governance layer have a governance surface with holes in it. The CISO asking for an inventory cannot get a complete answer from a governance layer with holes.

**Policy enforcement at the action level, not just the authentication level.** The governance layer must be able to intercept a tool call and evaluate whether it should proceed, based on the policy context — the agent's current task, the data classification of the resource being accessed, the current risk environment, the cost budget remaining. Authentication tells you who is asking. Policy tells you whether asking right now is appropriate.

**Cost attribution per agent, per tool, per team.** AI compute is not free, and AI compute without attribution becomes ungovernable. When nobody can answer "how much did the customer service agent cost last month, and which tools drove that cost?" — nobody is making rational infrastructure investment decisions. The data plane is the right place to capture and attribute these costs, because it sees every transaction.

## Where KaiCatalog Fits

KaiCatalog, the MCP server registry I have been building as part of the Kaigents platform, solves a related but distinct problem: which tools are approved for which agents to use, and what is the metadata that the governance layer needs to make enforcement decisions?

The catalog and the data plane are complementary. The catalog defines the approved tool inventory and the policies associated with each tool. The data plane enforces those policies in real time as agent traffic flows through it. AgentGateway needs something like KaiCatalog to know what tools exist and what their governance requirements are. KaiCatalog needs something like AgentGateway to enforce the governance it defines.

This is the architecture that enterprise AI governance is converging on: a tool catalog that defines what is approved and why, and a data plane that enforces that definition on live traffic.

## The Question for Your Organization

If your enterprise is running more than one AI agent and more than one LLM, the data plane problem exists in your environment. The question is whether you have addressed it or whether you are waiting for an incident to make it urgent.

The CISO who asked me that question about the AI inventory is not alone. Most organizations in her position could not produce a complete answer either. AgentGateway, KaiCatalog, and the broader governance tooling that has emerged in the past few months make the complete answer achievable.

The harder work is organizational: someone needs to own the data plane, define the policies it enforces, and be responsible for the completeness of the inventory. That is not an engineering problem. It is a governance problem. And governance problems require a human owner.
