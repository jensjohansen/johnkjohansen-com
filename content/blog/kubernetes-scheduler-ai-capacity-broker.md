---
title: "The Kubernetes Scheduler Is Becoming the AI Capacity Broker. Here Is What That Means for the Next Three Years."
subtitle: "Kubernetes v1.36 preview shows the scheduler evolving toward workload-aware AI job orchestration. The implications run further than the release notes suggest."
date: "2026-07-07"
excerpt: "Early previews of Kubernetes v1.36 show the scheduler evolving to treat AI jobs as topology-constrained, unified entities via PodGroups rather than individual pods. Combined with DRA GA in v1.35, HAMi reaching CNCF Incubating, and Google's one-million-accelerator GKE Hypercluster, a clear picture is forming: Kubernetes is becoming the AI capacity broker for the industry."
tags: ["Kubernetes", "AI Infrastructure", "GPU", "Scheduling", "Production AI", "K8S", "Venture Architecture"]
featured: true
author: "John K. Johansen"
heroImage: "/images/blog/kubernetes-scheduler-ai-capacity-broker-hero.png"
---

I have been watching the Kubernetes scheduler evolve for the past four years, and the trajectory that has emerged in the past six months is more significant than any individual release note suggests. Taken separately: DRA reaches GA, HAMi goes CNCF Incubating, KAITO ships a ProductionStack, the v1.36 preview shows workload-aware PodGroup scheduling. Taken together: Kubernetes is becoming the capacity broker for enterprise AI — the system that allocates scarce AI compute resources, enforces governance policies on that allocation, and optimizes utilization across competing workloads.

This is not a small thing. The system that brokers AI capacity is the system that defines the economics of AI infrastructure for every organization that runs it. Getting that system right — or choosing the right system — is one of the most consequential infrastructure decisions of the next decade.

## What the v1.36 Preview Shows

The Kubernetes v1.36 scheduler evolution centers on a concept that sounds technical but has profound operational implications: treating AI jobs as topology-constrained, unified entities rather than collections of individual pods.

The current scheduler model — even with DRA improvements — is fundamentally pod-centric. Each pod is a scheduling unit. Each pod has resource requirements. The scheduler places each pod individually, trying to satisfy each pod's constraints. For AI jobs that require multiple pods working in coordinated fashion — distributed training across four A100s, multi-node inference for a 70B parameter model, a pipeline of specialized models passing context between them — the pod-centric model breaks down.

**PodGroups in v1.36** treat these multi-pod AI jobs as atomic scheduling units. The scheduler understands that the four pods in a distributed training job need to be placed together, on hardware with the right topology (NVLink connectivity, NUMA locality, minimal network hops between the nodes), and started atomically. The concept is called gang scheduling, and it has existed in specialized AI infrastructure for years. What v1.36 does is bring it into the mainline Kubernetes scheduler as a standard primitive.

The consequence is that Kubernetes becomes capable of making scheduling decisions at the AI job level rather than the pod level — understanding that this distributed training run requires 4x A100s on adjacent nodes with NVLink, and placing the entire job accordingly, or rejecting it if the topology is unavailable. This is not pod scheduling. This is capacity brokering.

## The Google Hypercluster Signal

Google's announcement of GKE Hypercluster — a single Kubernetes control plane managing one million accelerators across 256,000 nodes — is simultaneously a product announcement and a statement about where the industry is going.

One million accelerators under a single Kubernetes control plane is not a number that maps to the clusters most organizations run today. But it is the number that matters for the trajectory. Google is not building Hypercluster for the median enterprise customer. They are building it because they anticipate — based on their own infrastructure trajectory and their customer demand signals — that AI compute will be managed at scales that require a fundamentally different control plane architecture than standard Kubernetes.

For the organizations reading this, the relevant insight is not "we need to run one million accelerators." It is: the Kubernetes community, informed by Google's scale experience, is building a scheduler that understands AI workloads at the job level, manages accelerators with topology awareness, and operates at scales previously reserved for custom HPC schedulers. That capability is entering the mainline, community-supported codebase. It will be available to organizations running three-node clusters and three-hundred-node clusters alike.

The technology flows from hyperscaler scale to community Kubernetes to production at every scale. This is how the CNCF ecosystem has always worked. The trajectory is clear.

## The Managed Lustre KV Cache Story

Alongside the scheduler developments, Google highlighted their Managed Lustre integration for KV cache offloading in LLM inference. This is worth explaining because it illustrates the direction AI infrastructure optimization is taking.

The KV cache — the key-value attention cache in a transformer model — is the memory-intensive component of LLM inference for long-context requests. During inference, the model computes attention over all previous tokens. For long contexts, this cache is large. If the cache fits in GPU VRAM, inference is fast. If it does not fit and must be moved to CPU RAM or disk, inference slows significantly.

KV cache offloading to a high-performance distributed filesystem (Lustre in this case) allows the inference server to handle longer contexts than fit in VRAM, by streaming the cache from fast external storage. Google's implementation reportedly improved throughput and reduced GPU-hour requirements for long-context inference — meaning more inference output per unit of GPU compute.

This is the kind of optimization that emerges when the infrastructure layer becomes sophisticated enough to understand the specific access patterns of AI workloads. Kubernetes scheduling that understands PodGroups. Storage that understands KV cache access patterns. GPU management that understands fractional allocation and topology. The stack is developing AI-specific intelligence at every layer.

## What This Means for How You Think About Infrastructure

The framing that is most useful for thinking about the next three years of Kubernetes AI infrastructure is this: Kubernetes is becoming the capacity broker for AI compute, and the quality of that brokering — how efficiently it allocates resources, how effectively it enforces governance policies on allocation, how intelligently it optimizes utilization — will determine the economics of running AI at scale.

For organizations building on the Sovereign Stack — on-premise hardware, self-hosted inference, Kubernetes orchestration — this is good news. The scheduler capabilities that are reaching mainline Kubernetes make the on-premise path more operationally viable. Workload-aware scheduling, topology-aware placement, fractional GPU allocation, gang scheduling for distributed jobs — these are the capabilities that have historically required custom HPC schedulers or hyperscaler-managed AI infrastructure. They are entering the community Kubernetes codebase.

For organizations running on cloud-managed Kubernetes (AKS, EKS, GKE), the same capabilities are available in the managed layer. The cloud versions will have additional integrations specific to each provider's hardware. The community versions will have the full capability without the cloud dependency. Both paths converge on the same scheduler primitives.

The three-year question is not whether Kubernetes will be the AI capacity broker. It is whether your organization will be sophisticated enough in how you express your workloads' requirements to benefit from the brokering capabilities the scheduler is developing.

## The Workload Expression Gap

Here is the practical challenge I am watching emerge in organizations deploying AI on Kubernetes. The scheduler is developing the capability to make sophisticated, topology-aware, workload-aware placement decisions. But those decisions are only as good as the requirements expressed by the workloads being scheduled.

If your inference deployment requests `nvidia.com/gpu: 1` and nothing else, DRA and PodGroup scheduling cannot help you — they have no requirements to optimize against. If your distributed training job does not specify its topology constraints in PodGroup terms, the scheduler cannot gang-schedule it correctly. The capabilities are present; the workload definitions have not caught up.

The next engineering discipline that matters for Kubernetes AI infrastructure is workload expression: knowing how to specify what your AI jobs actually need in terms that the scheduler can act on. Topology requirements, VRAM floors, interconnect preferences, gang scheduling constraints, fractional allocation boundaries. Getting these right is the difference between a cluster that the scheduler optimizes intelligently and one that the scheduler treats as a bag of generic resource requests.

The capacity broker is ready. The question is whether your workloads are ready to be brokered properly.
