---
title: "Why I Run AI Agents on Kubernetes (And Why \"One Linux Machine Per Agent\" Is Solving the Wrong Problem)"
subtitle: "The state management, blast radius, and TCO arguments for K8s-native agent orchestration over VM-per-agent isolation"
date: "2026-06-20"
excerpt: "A founder recently told me his agent platform uses one Linux machine per agent for isolation. The concerns driving that decision are real. The solution is expensive and doesn't fix the actual problems. Here is what a K8s-native architecture with Temporal does instead."
tags: ["Kubernetes", "AI Agents", "Kaigents", "Temporal", "Infrastructure", "Architecture"]
featured: true
author: "John K. Johansen"
heroImage: "/images/blog/k8s-native-agents-vs-vm-per-agent-hero.png"
---

A few weeks ago I had a conversation with a founder building an agent execution platform. His architecture: one Linux machine per agent, using Incus system containers for isolation. His argument against Kubernetes was direct — K8s is designed for stateless, short-lived workloads, and AI agents are stateful, long-running, and sensitive to noisy neighbors. The right answer, in his view, was to give each agent its own OS-level isolation from the start.

It is a coherent argument. The concerns it addresses are real. And I think it is solving the wrong problem with an expensive tool.

I have been running AI agents on Kubernetes in production since early 2025. I built Kaigents — a K8s-native AI agent substrate — specifically to address the stateful, long-running, governance-heavy requirements of production agent teams. Here is how I think about the tradeoffs, and why I believe the VM-per-agent approach trades one set of problems for a harder one.

---

## The Legitimate Concerns

Let me start where the VM-per-agent advocates are right, because they are not wrong about the problems — they are wrong about the solution.

**Noisy neighbors are real.** An agent doing heavy computation or memory-intensive context loading can affect other pods on the same node. Kubernetes provides resource limits (CPU, memory, storage), but a pod that stays within its declared limits can still create cache pressure, NUMA contention, and kernel-level resource conflicts with its neighbors. On shared nodes, isolation is not absolute.

**Stateful, long-running workloads require different thinking.** A web server pod can be killed and replaced in seconds with no consequence. An agent pod that has been building context for 40 minutes, holding conversation history, maintaining a working memory of a complex project — killing that pod and restarting it is not a zero-cost operation. The consequences of eviction are different in kind, not just in degree.

**Blast radius matters.** If an agent is compromised or behaves unexpectedly, the question of what it can affect is not trivial. In a shared K8s cluster without rigorous network policy and RBAC, an agent with a compromised credential can potentially reach workloads it should never touch.

These concerns are real. Any honest K8s-native agent architecture has to address them. The question is whether the right response is OS-level isolation per agent, or K8s-native solutions to each concern.

---

## Why Durable Execution Is the State Management Answer

The most common objection to K8s for agent workloads is the statefulness problem. The response I hear is: "K8s is designed for stateless pods. Agents are not stateless."

This objection conflates two separate concerns: where state lives and how long a compute unit runs.

Kubernetes is perfectly capable of running long-lived processes. Stateful applications — databases, message queues, search engines — run in Kubernetes all the time. The concern is not longevity; it is state persistence across failures. And Kubernetes does not solve state persistence — it was never designed to. That is not a K8s limitation; it is a correct division of responsibility.

The answer is **Temporal** (or equivalent durable execution engines). Temporal persists every step of every workflow to durable storage as it executes. When an agent pod is evicted, rescheduled, or killed due to a node failure, the workflow state is intact in Temporal's database. The new pod picks up exactly where the previous one left off. From the agent workflow's perspective, the pod eviction did not happen.

This is not a workaround. This is the correct architecture. The agent's state belongs in a durable store, not in the memory of a running process. An agent that keeps its state in memory is one hardware failure away from losing it, whether it runs in a K8s pod or a dedicated VM. Temporal solves the actual problem: state durability across arbitrary failures.

The VM-per-agent approach does not solve this problem. It avoids the eviction scenario by making eviction less likely (a dedicated VM is less likely to be preempted), but it does not make state durable. If the VM fails, the agent state is still lost. The problem is deferred, not solved.

---

## Why K8s Network Policy Is the Blast Radius Answer

The blast radius concern — what an agent can affect if it behaves unexpectedly — is real. The K8s answer is network policy, combined with RBAC and namespace isolation.

In a well-configured K8s cluster, each agent persona (or class of agents) runs in a dedicated namespace with:

- **Network policies** that explicitly define which services the agent can reach. An agent persona that needs access to a CRM API and a vector database gets a network policy that permits exactly those destinations and denies everything else by default.
- **RBAC** that limits what Kubernetes APIs the agent's service account can call.
- **Resource quotas** that bound the agent's compute and memory consumption at the namespace level, preventing runaway resource usage from affecting cluster-wide stability.

This is not absolute isolation. But for most threat models, it is sufficient, and it is far cheaper to operate than a VM per agent.

The VM-per-agent model provides stronger isolation — OS-level boundary, separate kernel, separate network stack. If your threat model requires that level of isolation (you are running agents that execute untrusted user-provided code, for example), the cost may be justified. But for the vast majority of enterprise agent use cases — agents that call APIs, read databases, generate text, run structured workflows — namespace-level K8s isolation with strict network policies is the right level of protection at a fraction of the infrastructure cost.

---

## The TCO Argument That Will Surface in Every Investor Conversation

Here is the number that concerns me most about the VM-per-agent architecture: **cost per concurrent agent**.

A system container (Incus LXD) is lighter than a full VM but heavier than a K8s pod. A system container requires its own kernel namespace, its own init system, its own network stack. The memory overhead per container is measured in hundreds of megabytes to gigabytes depending on what runs inside it. If you are targeting 1,000 concurrent agents, you are carrying gigabytes of overhead just for isolation infrastructure that adds no value to the agent's actual work.

A K8s pod, by contrast, shares the host kernel and the node's namespace infrastructure. The per-pod overhead is measured in megabytes. At 1,000 concurrent agents, the K8s overhead is an order of magnitude lower.

The difference does not matter when you are running 10 agents. It matters enormously when you are trying to operate a platform at scale. And the investor question — "what does it cost to serve 10,000 concurrent agents?" — has a very different answer depending on which architecture you chose.

At pre-seed, infrastructure cost seems abstract. At Series A, when you are trying to demonstrate unit economics, the per-agent cost of your isolation model becomes a real number in a deck that is being scrutinized by people who have seen a lot of infrastructure cost structures.

The VM-per-agent answer to the TCO question requires one of the following:
1. Agent sessions are infrequent and short, so the per-container overhead amortizes well.
2. The security requirements genuinely demand OS-level isolation and the cost is justified.
3. You accept that the architecture will need to change as you scale.

None of these are inherently wrong. But they need to be explicit decisions, not defaults.

---

## What Kaigents Actually Does

Kaigents runs on Kubernetes. Each agent persona is defined in a Kubernetes Custom Resource (CRD). Temporal handles durable execution — every workflow step is persisted, every failure is recoverable, every state transition is auditable.

Agent personas run in dedicated namespaces. Network policies are generated from the persona spec: this persona can reach these MCP tool endpoints, this database, this API, and nothing else. RBAC is bounded to the service account for that persona. Resource limits are set from the persona spec.

When an agent is running a complex task and the underlying node fails, Temporal detects the workflow worker is gone, waits for a new worker to register in the rescheduled pod, and resumes execution from the last persisted checkpoint. The agent's task continues. The node failure is an infrastructure event, not a data loss event.

The governance layer — what KaiManager provides on top of this — audits every tool call, enforces quality gates on outputs, and provides the escalation paths that production agent governance requires. These concerns sit above the infrastructure layer; they are workflow and policy concerns, not isolation concerns.

---

## The Right Question Is Not "K8s or VMs"

The right question is: what does your threat model actually require?

If you are building a general-purpose code execution sandbox where arbitrary user-provided code runs inside the agent, OS-level isolation is appropriate. The security requirements are genuine.

If you are building an enterprise AI agent platform where agents call structured APIs, read governed data sources, and produce outputs reviewed by humans — K8s namespace isolation with network policies, RBAC, and Temporal-backed durable execution is the right architecture. It is cheaper, more operationally mature (K8s has a decade of production tooling behind it), and scales without the linear cost growth of per-agent system containers.

The "one Linux machine per agent" instinct comes from a reasonable place: a desire to make isolation simple and absolute. I understand the appeal. But simple and absolute isolation is expensive, and the problems it is solving — statefulness, blast radius — have K8s-native answers that are cheaper and scale better.

Build for your actual threat model. Instrument everything. Use Temporal for state durability, not VM persistence. Let Kubernetes do what it is genuinely excellent at.

The architecture that can serve 10 agents well is not necessarily the one that can serve 10,000 agents profitably. That is worth thinking about before the investor asks.
