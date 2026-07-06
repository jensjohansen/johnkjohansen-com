---
title: "HAMi Goes CNCF Incubating: GPU Virtualization Is Now a First-Class Kubernetes Citizen"
subtitle: "Fractional GPU allocation and multi-tenant GPU sharing are no longer research projects. CNCF Incubating status means the community has decided this is infrastructure."
date: "2026-07-02"
excerpt: "HAMi — the Hardware Accelerator Manager for Kubernetes — achieved CNCF Incubating status in early July 2026. HAMi provides GPU virtualization and fractional scheduling: the ability to share a single GPU across multiple workloads with guaranteed isolation and resource limits. This is not a niche feature. For anyone running multi-tenant AI inference, it is the difference between viable unit economics and unprofitable infrastructure."
tags: ["Kubernetes", "GPU", "AI Infrastructure", "CNCF", "Multi-Tenant AI", "Cost Optimization", "Production AI"]
featured: true
author: "John K. Johansen"
heroImage: "/images/blog/hami-cncf-gpu-virtualization-hero.png"
---

GPU utilization on Kubernetes has been embarrassingly poor for the entire history of the platform. The reason is structural: the original Kubernetes device plugin model treats GPUs as atomic resources. You allocate a GPU to a pod; that pod owns the GPU exclusively until the pod terminates. No sharing. No partial allocation. The GPU is either 100% reserved or 100% available.

For research workloads that use the full GPU continuously, this is not a problem. For inference workloads — which burst to high utilization when a request arrives and idle between requests — this is an economic catastrophe. An H100 that sits at 8% average utilization because your inference workload only activates in bursts is costing you $2-3 per hour for the privilege of reserving silicon you are not using.

HAMi achieving CNCF Incubating status in early July 2026 is the community's announcement that the fractional GPU allocation solution is production-ready. Not experimental. Not maintained by a single company with a private roadmap. Infrastructure, with community governance, production users, and a security disclosure process.

## The GPU Utilization Problem, Made Concrete

Let me put some numbers on this before discussing the solution, because the utilization argument is often made in the abstract and the concrete version is more compelling.

A modern LLM inference serving setup for a 30B parameter model on a single high-end GPU (A100 80GB, for example) handles perhaps 20-50 requests per second at full load. At typical enterprise traffic patterns — business hours peak, evening trough, weekend low — that GPU will run at or near capacity for perhaps 6-8 hours per day and at 10-20% for the remaining 16-18 hours.

If you are paying $2.50/hour for that GPU, you are spending $60/day for 8 hours of productive compute and 16 hours of reserved idle silicon. That is $22,000/year to serve a workload that productively uses $7,300/year of compute. The remainder — $14,700 — is the cost of atomic GPU allocation.

At a small scale, this is irritating. At scale — 10, 20, 100 inference pods across a cluster — it becomes a significant fraction of your infrastructure budget. The organizations that have figured out multi-tenant GPU sharing are operating with fundamentally different unit economics than those that haven't.

## What HAMi Actually Does

HAMi (Hardware Accelerator Manager for Kubernetes) provides two related capabilities: GPU virtualization and fractional scheduling.

**GPU virtualization** creates an isolation boundary between workloads sharing a physical GPU. Without isolation, multiple inference processes on the same GPU can observe each other's memory, interfere with each other's compute access, and create unpredictable performance interactions. HAMi's virtualization layer prevents this: each virtual GPU slice has guaranteed memory allocation and compute limits that HAMi enforces independently of whatever other workloads are sharing the physical device.

**Fractional scheduling** integrates with Kubernetes resource management to express GPU shares in the standard resource model. A pod can request `30% GPU compute, 8GB VRAM` using HAMi's extended resource types, and the scheduler will allocate it from the appropriate physical GPU based on current utilization. This is complementary to DRA (which I covered in yesterday's article) — DRA provides the structured claim API, HAMi provides the fractional device management that makes fractional claims meaningful.

**Hardware-agnostic design** is HAMi's important architectural choice. The project supports NVIDIA CUDA, AMD ROCm, and other accelerator types through a plugin architecture. This means sovereign stack operators running AMD hardware — including my own AMD Ryzen AI cluster — have a path to HAMi-based GPU sharing that does not require NVIDIA-specific infrastructure. The Sovereign Stack uses AMD because of the open-source driver story and the XDNA NPU capabilities; HAMi's AMD support means fractional scheduling is available without compromising the hardware choice.

## Why CNCF Incubating Matters

CNCF has a defined graduation process: Sandbox, Incubating, Graduated. Each level requires meeting increasingly stringent criteria around production users, governance, security practices, and community health. Incubating specifically requires:

- A documented governance model with defined roles
- Evidence of production usage at multiple organizations
- A security disclosure and patching process
- Ongoing community activity beyond the founding contributors
- A clear path to Graduated status

When a project meets these criteria, enterprise security and operations teams can treat it differently than they treat experimental code. A CNCF Sandbox project is interesting; a CNCF Incubating project is something you can build a production dependency on and explain to a security team.

For GPU virtualization specifically, this removes a significant adoption barrier. Organizations that have been reluctant to depend on HAMi because of governance uncertainty now have the CNCF framework's endorsement. The fractional GPU allocation use case is not waiting for the technology to mature — the technology is mature. What was missing was the community endorsement that CNCF Incubating provides.

## The Unit Economics Argument for Smaller Teams

I want to be direct about why this matters specifically for the audience I write for: startups, founding teams, and technical advisors building AI infrastructure on constrained budgets.

The enterprises running hundreds of GPU nodes can absorb poor GPU utilization because they have the budget and the operational scale to manage it. The two-person startup with a three-node Kubernetes cluster absolutely cannot. If your cluster has two GPUs and your inference workload is idle 70% of the time, you are paying twice what you need to for your compute if you cannot share those GPUs across workloads.

HAMi makes GPU sharing production-grade on the cluster scale that matters for small teams. You can run your inference workload on one GPU slice, your data processing on another slice, and your development environment on a third — all on the same physical GPU — with isolation guarantees that prevent them from interfering with each other. This is not a theoretical efficiency. It is a real reduction in the compute cost of building AI products on a small budget.

For the Sovereign Stack specifically — where the hardware investment is sunk and the operational cost is electricity — GPU sharing does not reduce cloud bills. It reduces the number of physical GPUs required to run a given set of workloads, which is the hardware investment question. Fewer GPUs to buy. Fewer GPUs consuming power. The same productive AI capability.

## The Next Step

HAMi reaching CNCF Incubating is a milestone, not a finish line. The next work is integration depth: tighter integration with DRA (the Kubernetes-native resource claim API that reached GA this week), improved scheduling quality for topology-sensitive workloads, and expanded hardware support for the emerging accelerator landscape.

If you are running Kubernetes and have not evaluated HAMi for your inference workloads, now is the time to look at it with fresh eyes. The CNCF Incubating status changes the risk calculus. GPU utilization has been an embarrassing weakness in the Kubernetes AI stack for too long. The community has decided to fix it. The fix is available now.
