---
title: "Bare Metal Is Back: What Microsoft AKS and vCluster Tell Us About the Next Phase of AI Infrastructure"
subtitle: "Virtualization added flexibility. AI workloads are demanding it back. The bare metal renaissance is not nostalgia — it is physics."
date: "2026-06-26"
excerpt: "Microsoft added bare metal provisioning to AKS. vCluster shipped bare-metal tools for sovereign cloud operators to maximize GPU efficiency. Two different companies, two different markets, the same conclusion: for serious AI workloads, you eventually hit the limits of the virtualization layer."
tags: ["Kubernetes", "Infrastructure", "GPU", "Sovereign AI", "AI Infrastructure", "Bare Metal", "vCluster"]
featured: true
author: "John K. Johansen"
heroImage: "/images/blog/bare-metal-aks-vcluster-ai-infrastructure-hero.png"
---

I have been running bare-metal Kubernetes since before it was fashionable to do so. My AMD Ryzen AI homelab — three nodes, no hypervisor layer, direct NPU and GPU access — was a deliberate architecture choice made in early 2025 when I concluded that the virtualization overhead was not acceptable for the inference workloads I needed to run.

At the time, most of the enterprise Kubernetes world was deeply virtualized. VMs on hypervisors running containers orchestrated by Kubernetes. The virtualization layer provided flexibility, multi-tenancy, and operational consistency. For general-purpose workloads, those benefits outweigh the overhead. For GPU inference workloads, the math is different.

Two announcements in the same week in late June 2026 suggest the enterprise has reached the same conclusion. Microsoft added bare metal provisioning to Azure Kubernetes Service. vCluster shipped bare-metal provisioning tools for sovereign cloud operators specifically to maximize GPU efficiency. Different companies, different markets, the same physics.

## Why Virtualization Struggles with GPU Workloads

The case for virtualization rests on abstraction: a hypervisor presents a normalized view of hardware to the VMs running above it. That normalization is the source of its value. A VM does not need to know which physical CPU it is running on, what memory topology is adjacent, or what storage controller handles its disks. The hypervisor handles translation.

For CPU and memory workloads, this abstraction costs relatively little — typically single-digit percentage overhead. For GPU inference workloads, the cost is higher and the reasons are structural.

**GPU throughput is sensitive to topology.** LLM inference distributes computation across VRAM, across GPU cores, and increasingly across multiple GPUs using NVLink or PCIe interconnects. The memory bandwidth and interconnect topology between GPUs is critical for multi-GPU inference jobs. A hypervisor that presents a virtualized view of GPU resources cannot guarantee that adjacent virtual GPUs are on adjacent physical hardware. The resulting topology mismatch degrades throughput in ways that are not visible until the workload is running.

**NUMA locality matters for inference latency.** Non-Uniform Memory Access — the architecture where memory access speed depends on which CPU socket owns the memory being accessed — creates performance cliffs when workloads are scheduled without awareness of the physical topology. Virtualization layers often obscure NUMA topology from the guest OS. For latency-sensitive inference workloads, this matters.

**Driver stack overhead compounds at inference rates.** LLM inference at production throughput generates I/O at rates that expose overhead that would be invisible in lighter workloads. Each additional layer of software between the model and the GPU adds latency that compounds when you are doing millions of inference operations per day.

Bare metal eliminates these issues by removing the virtualization layer entirely. The workload has direct, documented, predictable access to the hardware it is running on.

## What Microsoft's AKS Bare Metal Addition Signals

Microsoft adding bare metal provisioning to AKS is not a feature addition. It is a market signal. Microsoft does not add infrastructure primitives to managed Kubernetes without a substantial enterprise customer pull. The fact that bare metal is now a supported path in AKS means enterprise customers have been asking for it in sufficient numbers that Microsoft made it a product priority.

The fleet management additions that accompanied the bare metal provisioning are equally telling. Bare metal at scale requires different operational tooling than virtual machines. VM provisioning is fast and reversible — spin up a VM, test, discard. Bare metal provisioning is slower and more stateful — you are configuring physical hardware, managing firmware, tracking which physical machines are allocated to which workloads. Fleet management tooling that tracks bare metal nodes at scale is necessary infrastructure for organizations running serious AI workloads on AKS.

The AI infrastructure additions in the same release — enhanced GPU node support, AI workload scheduling primitives — complete the picture. Microsoft is building a bare metal, AI-optimized path through AKS for enterprise customers whose workloads have outgrown virtualization.

## What vCluster's Approach Reveals

vCluster takes a different but complementary approach to the bare metal problem. Rather than removing virtualization entirely, vCluster virtualizes at the Kubernetes layer rather than the hardware layer. A vCluster provides an isolated Kubernetes API — with its own namespaces, RBAC, and resource quotas — while sharing the underlying nodes and hardware with other vClusters.

For GPU efficiency, this is a meaningful distinction. The isolation that multi-tenancy requires — preventing one tenant's workload from observing or interfering with another's — does not need to happen at the hardware layer. It can happen at the Kubernetes layer, with proper namespace isolation, resource limits, and network policies. When isolation is handled at the K8s layer, the hardware layer can be bare metal. Each vCluster's GPU workloads see the physical GPU directly, without a hypervisor in between, while the K8s layer ensures they cannot interfere with each other.

vCluster's positioning for sovereign cloud operators is smart: organizations running sovereign AI infrastructure need both the isolation of multi-tenancy and the throughput of bare metal. vCluster offers both simultaneously, which is why sovereign cloud operators are a natural fit.

## What This Means for the Sovereign Stack

My bare-metal Kubernetes cluster on AMD Ryzen AI hardware has been running this architecture since early 2025. No hypervisor. Direct NPU access for Lemonade Server's inference workloads. Kubernetes for orchestration and workload isolation at the pod and namespace layer, not the hardware layer.

The AKS and vCluster announcements validate that this is the right architecture for AI-intensive Kubernetes deployments — not just for the homelab, but for enterprise at scale. The mainstream is arriving at bare metal for the same reasons I chose it: the physics of GPU inference demand it.

For teams currently running AI inference on fully virtualized infrastructure, the path forward is not necessarily an immediate migration. It starts with measurement: instrument your inference throughput, identify whether topology sensitivity is affecting your latency, and understand what the virtualization overhead is costing you per inference operation. If those numbers are uncomfortable, bare metal is available now in the AKS path that Microsoft just opened.

The bare metal renaissance is not nostalgia for an older era of infrastructure. It is the AI era's answer to the question that virtualization cannot answer: how do I give my inference workloads direct, predictable, topology-aware access to the silicon they need?

The answer is the same as it has always been. Remove the layers between the workload and the hardware.
