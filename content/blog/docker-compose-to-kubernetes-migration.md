---
title: "From Docker Compose to Kubernetes: A Pragmatic Migration Path"
subtitle: "Scaling from a single machine to a production-grade 'AI Lab' on a shoestring"
date: "2026-05-19"
excerpt: "Docker Compose is great for a demo. But when you're running autonomous AI agent teams, you need the durability and orchestration of Kubernetes. Here is the pragmatic migration path for small teams."
tags: ["Kubernetes", "Docker", "DevOps", "AI Infrastructure", "AgOps"]
featured: false
author: "John K. Johansen"
heroImage: "/images/blog/default-blog-hero.png"
---

I’ve spent 40+ years watching infrastructure evolve. I’ve seen the pendulum swing from the centralized bare-metal mainframes of the 1980s to the decentralized client-server architectures of the 90s, the virtual machines of the 2000s, and the cloud-native microservices of today. 

Over those decades, one rule has remained completely constant: **the tool you use to "Build the Demo" is rarely the tool you should use to "Run the Business."**

In May 2026, the vast majority of AI startups and internal enterprise labs are built on **Docker Compose**. It’s incredibly simple, fast, and lets a single developer boot up an entire stack of containers with a single command. 

But when your business begins to depend on [orchestrated AI agent teams](./ai-agent-teams-vs-individual-assistants.md) running 24/7 to handle critical workflows, the operational limitations of Docker Compose shift from a minor developer annoyance to a critical structural risk. 

To run a reliable, automated business, you need more than simple container orchestration; you need a durable, self-healing substrate. You need **Kubernetes**.

## Why Kubernetes for AI Teams?

The move to **Kubernetes (K8s)** is often criticized by startup purists as over-engineering. They see it as a complex behemoth that drains developer focus. 

But when your primary workforce consists of autonomous AI agents executing complex, long-running processes, Kubernetes is no longer an optional enterprise luxury—it is a core prerequisite for durability and sovereignty:

### 1. Durable Context and Long-Running Workflows

AI agents do not just handle simple, stateless HTTP request-response cycles. They execute complex, multi-hour workflows—refactoring files, running test suites, analyzing data pipelines. 

If your host machine experiences a memory spike or physical disk failure while using Docker Compose, the host crashes and your agent loses its entire running execution context. 

K8s provides the stable, self-healing network and stateful substrate required for durable execution systems (such as Temporal) to ensure your agents never "lose the thread" of their long-running tasks.

### 2. Silicon Sovereignty

To protect your defensible IP, you must run [Air-Gapped AI](./air-gapped-ai-ultimate-control.md). This means hosting your own models on local hardware. 

Kubernetes allows you to manage local physical silicon—like [AMD Ryzen AI NPUs](./amd-ryzen-ai-npu-enterprise-chip.md) or private GPU nodes—as part of a unified, abstract cluster resource pool. K8s schedules model execution directly onto the nodes with the available physical compute, maximizing your hardware utilization.

### 3. Governance at Scale

Kubernetes allows you to enforce [Behavioral Guidance](./beyond-system-prompt-behavioral-guidance.md) and tool scoping across your entire fleet of agents from a single, unified control plane. You can use namespaces, network policies, and role-based access control (RBAC) to ensure an autonomous agent has access to exactly what it needs, and nothing more.

```mermaid
flowchart TD
    subgraph Development Namespace
        A[QA Agent] -->|Tool Access| B(Local Repo Mock)
    end
    subgraph Production Namespace
        C[Production Agent] -->|Tool Access| D(Live Database Replica)
    end
    DevSecOps[Network Policies] -->|Isolate| Development Namespace
    DevSecOps -->|Isolate| Production Namespace
```

## The Pragmatic Migration Path

You do not need a massive, expensive DevOps team to run Kubernetes in 2026. The ecosystem has matured, offering lightweight distributions that run beautifully on small budgets. Here are my three pragmatic insights for migrating from Compose to K8s:

### 1. Start Small: The Three-Node Cluster

Do not jump straight into the administrative complexity and high cost of managed cloud offerings like Google GKE or Amazon EKS. 

Instead, start with a lightweight, bare-metal or virtualized distribution like **k3s** or **Talos Linux**. A [three-node cluster](./three-node-k8s-minimum-viable-production.md) is the absolute "sweet spot" for small teams. It provides true high availability, automatic failover, and self-healing, without the multi-thousand-dollar monthly cloud infrastructure bill.

### 2. Namespace Your Sovereignty

Do not co-mingle your web frontend, public APIs, and [AI Lab](./self-hosted-ai-2026.md) in the same logical environment. 

Use Kubernetes namespaces to enforce strict security boundaries. This ensures that even if an autonomous agent’s tool access or runtime container is compromised by an external prompt injection attack, the blast radius is strictly contained within that namespace, leaving your core application and customer database completely secure.

### 3. Orchestrate the Workflow, Not Just the Container

Do not fall into the trap of simply copy-pasting your Docker Compose file into K8s yaml. Migrate your **Processes**. 

Use Kubernetes to construct a robust [AgOps substrate](./ai-agent-governance-over-tools.md) where your human engineers and AI teams run in parallel, using Kubernetes events and services to trigger automated audits, deployments, and testing gates.

## The Venture Architect's Conclusion

Do not build your company's future on an infrastructure foundation that cannot scale or self-heal. Docker Compose is an excellent tool for local experimentation and lab research; Kubernetes is the tool for the actual market. 

By migrating to a pragmatic, lightweight K8s architecture early, you ensure that your [Startup That Runs on AI Agents](./startup-that-runs-on-ai-agents.md) is built on a defensible, durable, and highly secure substrate.

---

*I help startups design and implement pragmatic Kubernetes architectures that power their AI transitions.*
