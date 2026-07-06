---
title: "KAITO's ProductionStack Changes the Inference Deployment Equation for Small Teams"
subtitle: "Turnkey LLM inference on Kubernetes is now a release artifact, not a weekend project. Here is what KAITO v0.11.0 actually delivers."
date: "2026-07-03"
excerpt: "KAITO v0.11.0 shipped in early July 2026 with Karpenter-based GPU node provisioning, model weight streaming, and the new KAITO ProductionStack — a turnkey inference deployment for small teams. For anyone who has spent a weekend wrestling with GPU node setup and model loading on Kubernetes, this release is worth understanding."
tags: ["Kubernetes", "AI Inference", "KAITO", "Self-Hosted AI", "GPU", "Production AI", "Open Source"]
featured: true
author: "John K. Johansen"
heroImage: "/images/blog/kaito-production-stack-inference-hero.png"
---

Getting an LLM running on Kubernetes has been a multi-day project for most teams, and not because the component parts are unavailable. The components — GPU drivers, inference servers, model weight management, autoscaling configuration, health checks, observability hooks — have existed in various states of maturity for over a year. What has been missing is someone making principled choices about how to assemble them, testing those choices against production workloads, and publishing the result as a deployable artifact.

KAITO v0.11.0, released in early July 2026, takes a significant step toward filling that gap. The headline addition is the KAITO ProductionStack — an opinionated, complete deployment configuration for LLM inference on Kubernetes. The supporting features — Karpenter-based GPU node provisioning and model weight streaming — address the two most common friction points that teams hit before they even reach the inference configuration question.

The combination is meaningful. Each piece solves a real problem. Together, they reduce time-to-first-production-inference by a day or more for teams starting from a working Kubernetes cluster.

## The Three Pieces and Why They Matter Together

**Karpenter-based GPU node provisioning** solves a resource planning problem. GPU nodes are expensive — $2-3/hour on cloud providers for a serious inference GPU — and pre-provisioning them "in case" is wasteful. But provisioning them on demand when a workload arrives creates cold start delays of 5-10 minutes for node startup alone, before any model loading.

KAITO's Karpenter integration makes GPU provisioning reactive and policy-driven. When an inference workload is scheduled, KAITO triggers Karpenter to provision the appropriate GPU node type based on the workload's requirements. When the workload terminates, the node can be deprovisioned. For development and test workloads where inference happens in bursts with long idle periods, this eliminates the wasted cost of persistent GPU nodes without sacrificing availability when inference is needed.

**Model weight streaming** addresses the cold start problem that remains even after the node is available. Traditional Kubernetes LLM deployments require model weights to be present on the node before inference can start. For a 30B parameter model, that means either: (a) pre-loading weights onto every potential inference node (expensive, operationally complex), or (b) downloading weights on pod startup (5-20 minutes of startup latency, depending on model size and network speed).

Weight streaming lets inference start before the weights are fully loaded. The inference server begins serving requests with the weights that have been streamed so far, progressively improving as more weights arrive. For many workload types — particularly those with short, independent queries rather than long-context operations — this is acceptable. The first request's latency is higher; subsequent requests normalize as the weights complete streaming. For teams where cold start latency has been a barrier to on-demand GPU provisioning, weight streaming changes the calculus.

**The ProductionStack** is the assembly layer that connects node provisioning, weight management, inference serving, autoscaling, health checking, and observability into a single deployable configuration. It represents KAITO's opinionated answer to "what does a production LLM inference deployment on Kubernetes look like?" — with the opinions backed by production deployments rather than theoretical design.

## What "Opinionated" Means in Practice

The ProductionStack is opinionated, and understanding the opinions helps you evaluate whether it fits your situation.

The inference backend is vLLM-based. vLLM is a strong choice for NVIDIA GPU deployments with CUDA — it has excellent continuous batching, PagedAttention for memory efficiency, and broad model format support. For teams running NVIDIA hardware, the default is sensible. For teams running AMD ROCm (including the Sovereign Stack), vLLM has ROCm support that is improving but not yet at feature parity with the CUDA path. Evaluation against your specific hardware is warranted.

The scaling model is Kubernetes HPA-based, triggered by GPU utilization and request queue depth metrics. This is appropriate for bursty inference traffic where scaling decisions are straightforward. Teams with more complex scaling requirements — spot instance management, cross-region failover, cost-aware scheduling — will need to extend beyond the ProductionStack defaults.

The model format assumption is Hugging Face-compatible. This covers the vast majority of open-weight models in current use — Llama, Qwen, Mistral, GPT-OSS, and their derivatives — but custom model formats or GGUF quantizations may require additional configuration.

These opinions are not bugs. They are the cost of having a productionized default. The ProductionStack is not trying to be all things. It is trying to be the right thing for the most common case — a team with a standard open-weight model, NVIDIA GPU infrastructure, and a need to serve inference traffic with reasonable operational complexity.

## Where Lemonade Server Fits

My Sovereign Stack uses Lemonade Server rather than vLLM for inference, because Lemonade Server has been purpose-built for AMD hardware from the beginning — with first-class NPU support and the MCP integration that I need for Kaigents.

The KAITO ProductionStack does not currently offer a Lemonade Server backend. But the architectural patterns KAITO establishes — dynamic GPU provisioning via Karpenter, weight streaming from object storage, structured deployment manifests with defined lifecycle hooks — are the right patterns regardless of the inference backend. Teams on AMD hardware can apply the same design to Lemonade Server deployments. KAITO's contribution is demonstrating at production scale that these patterns work and how to implement them correctly.

The convergence will happen. The KAITO project has a plugin architecture for inference backends. As AMD ROCm and Lemonade Server mature and AMD hardware becomes more common in production Kubernetes clusters, the backend support will follow. In the meantime, the architectural knowledge KAITO encodes is broadly applicable.

## The Time-to-First-Inference Trajectory

I track time-to-first-inference as an informal metric for the state of the self-hosted LLM deployment ecosystem — how long does it take a competent engineer starting with a working Kubernetes cluster to produce a serving endpoint for a standard open-weight model?

In 2024: approximately 3-5 days of engineering effort to assemble the pieces from scratch.

In early 2026 (pre-KAITO ProductionStack): approximately 1-2 days, using available components but requiring assembly judgment.

With KAITO v0.11.0 ProductionStack, for teams matching the standard case (NVIDIA GPU, standard open-weight model, Hugging Face format): potentially a few hours.

This trajectory matters because it determines who can afford to self-host. When the deployment complexity is measured in days, it is only accessible to teams with dedicated infrastructure engineers. When it is measured in hours, it is accessible to any team with Kubernetes experience. The ProductionStack moves self-hosted inference further down the accessibility curve.

If you have been deferring self-hosted inference because the setup looked daunting, KAITO v0.11.0 is the right release to re-evaluate. The barriers that stopped you may have been removed.
