---
title: "The Sovereign Stack: Building a Private AI Department on AMD and Kubernetes"
subtitle: "A practical how-to for entrepreneurs tired of paying per token and giving away their IP"
date: "2026-06-06"
excerpt: "If your business intelligence depends entirely on OpenAI, Claude, or Gemini, you are building on rented land. This guide walks through the implementation of a production-grade private AI stack built on AMD Ryzen AI NPUs, Kubernetes, and a vetted suite of open-source pillars."
tags: ["Self-Hosted AI", "Kubernetes", "AMD", "Ryzen AI", "IP Protection", "Silicon Sovereignty", "Open Source"]
featured: true
author: "John K. Johansen"
---

For the modern entrepreneur, the greatest threat to your "moat" isn't a competitor—it's your landlord. If your business intelligence depends entirely on OpenAI, Claude, or Gemini, you are building on rented land. Worse, you are paying your landlord in data, allowing them to train their next-generation models on your proprietary workflows.

To reclaim your digital sovereignty, you need to own the metal. This guide walks you through the implementation of the **Sovereign Stack**: a production-grade AI infrastructure built on **AMD Ryzen AI NPUs**, **Kubernetes (K8s)**, and a vetted suite of **Open Source** pillars.

*This article is the synthesis of two earlier pieces in our series: [Self-Hosted AI in 2026: The Case Has Never Been Stronger](https://johnkjohansen.com/blog/self-hosted-ai-2026), which established the business case for sovereign AI, and [AMD Ryzen AI NPU: The Enterprise AI Chip Hiding in Plain Sight](https://johnkjohansen.com/blog/amd-ryzen-ai-npu-enterprise-chip), which made the hardware argument. If the "why" is still an open question for you, start there. This article starts where those left off — with the implementation.*

---

## The Strategic Tier: Separating the Brain from the Body

The common mistake in AI infrastructure is treating every workload the same. An LLM doing deep reasoning has fundamentally different hardware needs than the orchestration layer that routes work to it. Mixing them on the same machines means either over-spending on inference hardware or starving your agents of the stability they need.

For a production-grade autonomous agent team, we must separate the **Inference Engine** (the heavy reasoning) from the **Agent Substrate** (the orchestration and memory). This separation also means a model upgrade or a cluster maintenance window never takes your entire AI department offline at once.

### Tier 1: The Brain (Bare-Metal MAX 395+ Hosts)

We host our primary LLMs (**GPT-OSS 20B** for reasoning and **Qwen3 Coder 30B** for implementation) on dedicated bare-metal nodes, completely outside the Kubernetes cluster.

- **Hardware**: 2x **AMD Ryzen AI Max+ 395** with **128GB RAM**.

- **OS: Ubuntu 25.10+** — and this is a mandate, not a preference. AMD achieves their NPU optimizations through Linux kernel modules that they co-develop with Canonical and ship directly inside new Ubuntu releases. The business implication is stark: if you choose any other Linux distribution, or fall behind on Ubuntu releases, you are essentially volunteering your team to act as kernel engineers — building, signing, and maintaining custom driver packages. That is a full-time job. Staying current with Ubuntu is the only practical path.

- **Inference: Lemonade Server** (installed via **Snap**, not as a K8s pod). AMD's support partnership is with Canonical's Snap ecosystem, not with Kubernetes container runtimes. Running Lemonade in a pod sacrifices direct hardware access to the NPU — which is the entire point. Snap gives Lemonade Server the low-level system access it needs to use the NPU rather than falling back to the GPU. This delivers approximately **5x the power efficiency** of a GPU-based inference setup for supported models.

- **The 128GB Advantage**: Moving from 64GB to 128GB RAM is a direct business investment in **agent concurrency**. With 64GB, your agents must use small context windows, which forces you to architect every workflow around context limitations — a design constraint that shapes every business process you automate. With 128GB, you can hold large project architectures in memory simultaneously, allow multiple agents to share the same model concurrently, and stop making business decisions based on hardware limitations.

### Tier 2: The Body (The Distributed Substrate)

The orchestration, vector memory, and utility models (rerankers, embeddings) live in a high-availability Kubernetes cluster.

- **Hardware**: 4 to 6 **AMD HX 370** Mini-PCs.

- **Why 4–6 Nodes, Not 1 or 2**: This number isn't about raw compute — it's about the minimum viable resilience for a production system. Kubernetes distributed storage (Rook-Ceph) requires at minimum 3 nodes to maintain data quorums: if you have 3 replicas across 3 nodes and one fails, you still have 2 copies and the system heals itself. Add nodes for rolling updates (upgrading one node at a time without downtime), for hardware failure tolerance (RAM partially fails, a thermal event shuts a node down), and for the operational reality that commodity hardware *will* have issues. Four to six nodes gives you a system where a single failure is a non-event rather than an emergency.

- **The "Node-a-Year" Economic Model**: Mini-PCs are commodity hardware. Budget to replace approximately one per year as a cost of operations, not as a crisis. This is fundamentally different from enterprise server economics, where a failure is a catastrophic, unplanned expense. At ~$1,500–$2,000 per HX 370 node (with RAM and SSD), this is a predictable line item, not a fire drill.

- **Distributed Resilience via Rook-Ceph**: When a node goes down, Kubernetes automatically reschedules your **Kaigents** workers and **Temporal** workers to healthy nodes. But the critical piece is *data* — your vector database, agent memories, and model caches cannot live on a single disk. Rook-Ceph shards and replicates this data across the physical disks of all cluster nodes, so a node failure is invisible to your running agents.

---

## The Sovereign OSS Stack: Your Technical Shopping List

A private cluster is only as good as the software that governs it. Every tool below was chosen for a specific business reason. Here is the stack we use, and — critically — *why* we use it:

### 1. Orchestration: Kubernetes (K8s) v1.31+ — Full, Not Lite

We use full upstream Kubernetes, not the popular lightweight alternative K3s.

**Why this matters to your business**: This is actually three separate guarantees converging on the same answer.

First, **OSS compatibility guarantees**: The enterprise tools in this stack — Rook-Ceph, MetalLB, Envoy Gateway, Harbor — publish their support matrices against full K8s. Rook-Ceph in particular has historically not certified K3s. When something breaks in production and you open a support issue, "we're running K3s" ends that conversation. Running full K8s means you are always within the tested, supported envelope of every tool you depend on.

Second, **AMD's kernel module guarantee**: AMD only certifies their NPU kernel modules against full Kubernetes. The modules are what give Lemonade Server its NPU access — they are the foundation of the efficiency story. AMD's support commitment stops at the K8s boundary.

Third — and this is the insight that makes the whole debate largely academic — **AMD's kernel modules ship pre-built inside Ubuntu releases**. You do not install them; they are already there. This is the result of AMD's co-development partnership with Canonical. The implication is that your "driver management" strategy is simply: keep Ubuntu current. Full K8s running on Ubuntu means every layer of the stack — OS, kernel modules, NPU drivers, enterprise OSS — is within a supported, tested boundary. K3s would introduce a gap into that chain at the one point where AMD's guarantee lives.

### 2. Inference: Lemonade Server (AMD-optimized)

Lemonade Server is the software layer that translates your LLM inference calls into instructions the AMD NPU actually understands. Without it, your inference runs on the GPU — which works, but forfeits the primary efficiency advantage of AMD silicon. The NPU was purpose-built for AI matrix operations and runs them with a fraction of the power draw of a GPU doing the same work.

**A critical nuance**: Not every model is NPU-optimized. Lemonade Server currently has a curated subset of models (GPT-OSS 20B, Qwen3 Coder 30B, and others) with full NPU quantization. For image generation (ComfyUI), video models, and some reasoning models, the GPU remains the execution target — you still get the benefit of AMD's efficient GPU architecture, just not the NPU's additional efficiency layer. This is not a reason to avoid the stack; it is context for setting realistic expectations on power costs per workload type.

### 3. Storage: Rook-Ceph

Rook-Ceph is your distributed storage layer. It turns the individual SSDs across your cluster nodes into a single, shared, self-healing storage pool that your agents use like a reliable hard drive.

**The business case**: Your agents' intelligence lives in storage — their vector memories, the Qdrant database, the indexed versions of your proprietary documents. A traditional single-point NAS gives your AI department amnesia when it fails. Rook-Ceph replicates data across at minimum 3 physical nodes, so the storage system survives a node failure automatically, without human intervention, and without data loss. It also provides an S3-compatible object storage interface, meaning the same tools your team uses with AWS S3 work identically against your private cluster.

### 4. Networking & Discovery

#### Bind 9 — Installed on Bare Metal, Not in Kubernetes

Bind 9 is our internal DNS server, hosting the `ai-agent.private` domain that all cluster services and bare-metal hosts use to find each other.

**Why bare-metal, not a K8s pod?** If DNS lives inside the Kubernetes cluster and the cluster has a problem — a failed upgrade, a networking misconfiguration, a botched certificate rotation — you can't resolve hostnames to fix it. You're locked out of your own house with no key under the mat. Installing Bind on the Ubuntu OS of two dedicated nodes means the DNS "phone book" for your entire infrastructure is always reachable, even when K8s is unhealthy. It also allows non-K8s devices (dev laptops, NAS units, bare-metal LLM hosts) to use the same internal DNS seamlessly.

#### External-DNS — Automated DNS Record Management

External-DNS watches your Kubernetes cluster for new services and automatically creates the corresponding DNS records in Bind 9.

**Why this matters operationally**: Without External-DNS, every time your team deploys a new agent service, someone must manually log into Bind and add a DNS record. At scale — when you're running 20, 30, or 50 different agent services — this becomes a full-time maintenance burden and a constant source of human error. External-DNS turns DNS record management from a manual chore into an automatic consequence of deployment.

#### MetalLB — Load Balancer for Bare Metal

MetalLB gives your cluster the ability to assign stable IP addresses to services that need to be reachable from outside the cluster.

**Why you need it**: In a cloud environment (AWS, GCP, Azure), when you create a Kubernetes LoadBalancer service, the cloud provider automatically assigns a public IP from their pool. On bare metal, there is no cloud provider. Without MetalLB, your LoadBalancer services stay in a permanent "pending" state — they request an IP that no one ever assigns. MetalLB fills that role, managing a pool of your local IP addresses and assigning them automatically, giving your internal services stable, reachable addresses exactly as they would have in a cloud environment.

#### Squid — Installed on Bare Metal, Not in Kubernetes

Squid is an HTTP proxy. We use it to route internet traffic for cluster nodes that have unreliable WiFi connectivity.

**The honest story**: Some commodity mini-PC manufacturers (GMKTec, in particular) use Intel WiFi chipsets that have intermittent driver issues under Ubuntu's generic kernel. Rather than returning hardware or waiting for driver fixes, we designate one node with a solid Ethernet connection as a "gateway" and install Squid on its Ubuntu OS. All other nodes route their package downloads and container pulls through the Squid proxy. The fix costs zero dollars and takes about 20 minutes. Like Bind 9, installing it on bare-metal Ubuntu (rather than as a K8s pod) means it remains available even when Kubernetes is being serviced, and it serves any device on the network — not just cluster nodes.

### 5. Gateway: Envoy Gateway — Not Nginx

Envoy Gateway is the front door to your cluster: it routes external requests (from your team's browsers, API clients, or agent calls) to the right internal services.

**Why Nginx Ingress is no longer an option**: As of April 2025, Nginx Ingress Controller was officially deprecated and removed from Kubernetes. This was not a quiet sunset — it was a lifecycle decision that means Nginx Ingress receives no further Kubernetes-native updates, compatibility patches, or security fixes. Building your private AI infrastructure on deprecated ingress software is equivalent to building your office on a lease that was just cancelled: it works today, but every month that passes increases your exposure. Envoy Gateway is the CNCF-graduated successor with active Kubernetes SIG backing, a roadmap aligned with the K8s Gateway API standard, and production-grade support for the traffic shaping and security policies a multi-agent system requires.

### 6. Registry: Harbor — Your Private Container Vault

Harbor is a self-hosted container image registry — think of it as your own private Docker Hub, running inside your cluster.

**Why not just use Docker Hub?** Two reasons. First, Docker Hub rate-limits anonymous image pulls, which can silently cause your cluster to fail to pull images during deployments — a frustrating operational problem that is trivially solved by hosting your own registry. Second, and more importantly for a sovereign stack: your container images may contain proprietary model configurations, fine-tuning weights, or custom agent code. Every image pushed to a public registry is a potential IP leak. Harbor keeps everything inside your perimeter. It also provides image vulnerability scanning, so you know immediately when a base image has a security issue before it enters your cluster.

### 7. Durable Execution: Temporal + Kaigents

Temporal is a workflow orchestration engine. Kaigents is our AI agent framework that runs on top of Temporal to coordinate multi-agent tasks.

**Why "durable execution" is a business requirement**: Consider an agent that has been running a complex multi-step task for 45 minutes — researching competitors, drafting a report, querying your internal knowledge base. Without Temporal, that agent's state lives in memory on a single pod. If that pod's node fails, all 45 minutes of work is lost. The agent starts over, consuming more tokens, more time, and producing inconsistency in outputs. Temporal persists every step of every workflow to durable storage as it happens, so when the pod is rescheduled to a healthy node, the agent picks up exactly where it left off. For a 24/7 autonomous AI department, this is the difference between a reliable team member and one who randomly loses their work.

### 8. Vector Store: Qdrant

Qdrant is your agents' long-term memory — a database optimized for storing and searching vector embeddings, which are the numerical representations of your documents, code, and business knowledge.

**The sovereignty angle**: Your agents need to "know" your proprietary content: your code patterns, your customer data, your internal SOPs. RAG (Retrieval-Augmented Generation) is the mechanism by which they do this — the agent queries Qdrant for relevant context before responding, giving it access to your institutional knowledge without baking that knowledge into the model itself. Running Qdrant inside your cluster means this entire knowledge retrieval loop happens on your hardware. Your proprietary documents are never sent to an external embedding API for indexing, and your queries never leave your perimeter. The model that answers remains a public open-source model; what makes it relevant to your business stays private.

---

## Practical How-To: Implementation Highlights

### 1. The "Anchor" Services Pattern

The pattern of running Bind 9 and Squid on bare-metal Ubuntu (rather than as K8s pods) is worth naming explicitly, because it applies as a general principle: any service whose failure would prevent you from *fixing* the cluster must not live inside the cluster. We call these "anchor" services. They are the stable foundation on which everything else depends. Bind and Squid are our two anchors — they run on the Ubuntu OS of two dedicated nodes, survive cluster re-initializations, and serve any device on the network, including dev laptops and the bare-metal LLM hosts that sit outside K8s entirely.

### 2. The "Inference Bridge" (ExternalService)

Since our heavy LLMs live on bare-metal MAX 395+ hosts (for NPU performance) but our agents live in K8s, we create a Kubernetes `ExternalName` service to bridge the two worlds. This allows agent pods to call `lemonade-brain-01.ai-models.svc.cluster.local` using standard Kubernetes service discovery, while the actual request is routed to the bare-metal host by name.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: lemonade-brain-01
  namespace: ai-models
spec:
  type: ExternalName
  externalName: max395-node-01.ai-agent.private
```

This pattern is important because it means you can replace or add bare-metal inference hosts without changing a single line of agent code — you update the DNS record, not the application.

### 3. Keeping Ubuntu Current on LLM Hosts

Plan a quarterly maintenance window to upgrade the Ubuntu version on your MAX 395+ bare-metal hosts. This is non-negotiable if you want to stay on the current AMD kernel modules. The process: bring the Lemonade Server down, run the Ubuntu upgrade, verify the NPU kernel modules loaded correctly, bring Lemonade back up. This typically takes 30–45 minutes per host. Stagger the two hosts so you always have one available during the maintenance window.

---

## The Hidden Cost: Skills and People

The hardware and software costs above are the easy part to budget. The honest cost that most "build your own AI lab" articles skip is **human capital** — the skills required to build this stack and keep it running.

This is not a weekend project for a non-technical founder. It requires competence across three disciplines that are each a career in their own right:

**Infrastructure and Hardware**
Someone needs to rack the nodes, configure the network switch, set up VLANs, and troubleshoot hardware failures at 3am. The **CompTIA A+** certification covers the hardware fundamentals, and **CompTIA Network+** covers the networking layer — subnets, switching, the concepts behind MetalLB's IP pool management. These are the baseline literacy requirements for anyone running physical infrastructure. If you are hiring for this role, these certs signal the right foundation.

**Linux Administration**
Every node in this stack runs Ubuntu. The NPU kernel module story, Snap package management, and Kubernetes node configuration all live at the Linux OS layer. **CompTIA Linux+** is a solid credential for this — it's not glamorous, but it maps directly to the day-to-day work of keeping Ubuntu nodes healthy, managing system services, and debugging kernel-level issues when an NPU driver behaves unexpectedly after an OS upgrade.

**Kubernetes Operations**
This is the deepest skill requirement. Setting up a full K8s cluster with Rook-Ceph, MetalLB, Envoy Gateway, Harbor, and External-DNS is not a tutorial exercise — it requires genuine operational experience. The **CNCF Certified Kubernetes Administrator (CKA)** is the right credential here: it's a hands-on, performance-based exam (not multiple choice) that tests exactly the skills needed to administer a production cluster. At $445, it is expensive for a certification exam — but it is from the same body that governs Kubernetes itself, and it is the credential that signals genuine operational depth rather than theoretical familiarity.

**Your Options as an Entrepreneur**

You have three realistic paths:

1. **Develop the skills yourself** — viable if you have an engineering background and 6–12 months to invest. The certifications above give you a structured learning path.
2. **Hire a DevOps/Platform engineer** — a mid-level hire with K8s experience and Linux background runs $90,000–$130,000/year in most markets, or $100–$150/hour as a contractor for the initial build.
3. **Use a managed bare-metal Kubernetes provider** — the subject of Part 2 in this series, which trades the NPU efficiency advantage for a dramatically lower skills requirement. You still need Linux and K8s literacy, but the hardware layer disappears.

The skills cost is real, and it belongs in your total cost of ownership calculation. It is also a one-time investment in organizational capability — once your team has these skills, they apply to every infrastructure project you build, not just this one.

---

## The Economics: ROI for the Sovereign Entrepreneur

| Metric | Cloud (API-First) | Sovereign (Hardware-First) |
| :--- | :--- | :--- |
| **Token Cost** | $0.01 - $0.15 per 1k tokens | **$0.00 (Infinite)** |
| **Data Privacy** | Subject to TOS / Training | **Physical Isolation** |
| **CAPEX** | $0 | ~$12,000–$19,000 (One-time, scales with node count) |
| **OPEX** | $500+/month | $20–$40/month (Electricity) |
| **Model Access** | Vendor-controlled | Any open model, any time |
| **IP Exposure** | Structural | Zero |

**The Bottom Line**: For a startup processing high-volume agent workflows, the Sovereign Stack pays for itself in under 6 months. After that, you are not just saving money — you are building a proprietary infrastructure asset with a defensible operational moat: your competitors cannot replicate your workflows even if they wanted to, because your workflows never left your building.
