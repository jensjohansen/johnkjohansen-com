---
title: "Colibrì: Running Huge Models on Tiny Machines"
subtitle: "How disk-streaming MoE architecture brings 744B-parameter models to a 25GB laptop"
date: "2026-07-25"
excerpt: "Colibrì is a lightweight, pure-C inference engine that keeps a small dense backbone in RAM and streams individual experts from NVMe on demand. It's slow—but it makes trillion-parameter-class models runnable on hardware you already own."
tags: ["AI Infrastructure", "Silicon Sovereignty", "MoE", "Inference", "Self-Hosted AI"]
featured: false
author: "John K. Johansen"
heroImage: "/images/blog/colibri-huge-models-tiny-machines-hero.png"
---

Throughout my career, I've watched the industry solve the same problem over and over: how do you run something bigger than the machine in front of you? Virtual memory did it for programs. Swap did it for RAM. Sharding did it for databases.

Now we have **Colibrì**, a lightweight, pure-C inference engine that applies the same old trick to the newest problem: running a 744-billion-parameter mixture-of-experts (MoE) model like GLM-5.2 on a machine with 25GB of RAM and no data-center GPU cluster in sight.

It's not fast. But it works, and that matters more than most benchmark charts suggest.

## The Problem With "Just Add More VRAM"

The default answer to "how do I run a huge model" has always been "buy more GPUs." A 744B-parameter model, even quantized, does not fit on a single consumer GPU, or even a well-equipped workstation with a few of them. The conventional path forces you into one of two outcomes: rent a cloud GPU cluster, or don't run the model at all.

For hobbyists, researchers, and sovereignty-minded engineers who don't want their workloads (or their data) leaving their own hardware, neither option is acceptable. Cloud clusters are expensive, dependent on a third party's uptime and pricing whims, and antithetical to the kind of control I've argued for elsewhere in the context of [air-gapped AI](./air-gapped-ai-ultimate-control.md). Buying enough GPUs to hold 744B parameters natively is simply not realistic for most individuals or small teams.

Colibrì takes a third path: don't hold the whole model in memory at all. Hold only what you need, when you need it.

## The Architecture: Dense Backbone in RAM, Experts on Disk

MoE models like GLM-5.2 are, by design, sparse at inference time. Even though the model has hundreds of billions of parameters, only a small subset of "expert" sub-networks activates for any given token. The rest sit idle. Traditional inference engines still load every expert into memory regardless, because random-access latency to disk is normally too slow to tolerate mid-inference.

Colibrì's insight is that this sparsity is precisely the thing that makes a different memory model viable. The architecture splits the model into two tiers:

1. **The dense backbone.** A roughly 17-billion-parameter subset of the model—the always-active layers and shared parameters—is kept resident in RAM. Quantized to int4, this backbone occupies approximately 10GB, leaving headroom on a machine with 25GB total memory for the OS, the runtime, and working buffers.

2. **The experts, streamed from NVMe.** The remaining hundreds of billions of parameters, organized as individual expert sub-networks, live on disk. When the router selects an expert for a given token, Colibrì reads that expert's weights directly from an NVMe SSD, uses them for the forward pass, and discards or caches them as memory pressure dictates.

This is, in effect, demand paging for neural network weights. Instead of treating the model as a monolithic blob that must be fully resident, Colibrì treats it as a set of pages backed by storage, fetched lazily and only as the routing decisions require.

```
┌─────────────────────────────┐
│   Dense Backbone (~10GB)    │   ← Always resident, int4
│   ~17B params, in RAM       │
└──────────────┬──────────────┘
               │ routes tokens to
               ▼
┌─────────────────────────────┐
│   Expert Pool (700B+ params) │   ← Streamed on demand
│   Stored on NVMe SSD         │
└─────────────────────────────┘
```

The engine itself is written in pure C, which keeps the runtime footprint small and avoids pulling in the dependency weight of a full Python/PyTorch stack. For a project whose entire premise is "run on constrained hardware," a minimal, self-contained binary is not a stylistic choice—it's a requirement.

It is worth noting that Colibrì is not the only player in this space. Projects like **PowerMoE** and early research into **expert-offloading via vLLM** have explored similar territory, though often with a focus on maximizing throughput across larger memory pools rather than absolute survival on a 24GB or 32GB consumer machine. Colibrì distinguishes itself by its extreme minimalism and its focus on the "dense backbone" separation that makes the disk-streaming feasible at such low RAM levels.

## Hardware Matters: RAM, NPU, and Tmpfs

While the baseline performance on a standard NVMe drive is slow, the hardware environment can significantly change the math. In my own testing on **AMD Ryzen AI** and **Intel Ultra** architectures, two specific optimizations move the needle:

1.  **Soldered LPDDR5/LPDDR5x Memory**: Machines using high-frequency soldered memory (like the 7500MT/s or 8533MT/s pools in newer Ryzen AI laptops) provide a massive bandwidth advantage for the dense backbone's operations. Even though the experts are still streaming, the faster access to the resident 17B-parameter backbone and KV-cache helps stabilize the pipeline and improves the floor of the token generation speed.
2.  **Tmpfs and NVMe RAID**: If you have a machine with 64GB or 128GB of RAM—still "tiny" compared to the hundreds of gigabytes usually required for a 744B model—you can mount a portion of the expert pool into a **tmpfs** (RAM disk). Streaming experts from a RAM-backed tmpfs or even a high-speed NVMe RAID array can push that 0.1 tokens/sec figure significantly higher, sometimes reaching a level that is actually usable for reading along in real-time.

## The Bottleneck Is Exactly Where You'd Expect

There's no getting around the physics here: NVMe SSDs are fast relative to spinning disks, but they are orders of magnitude slower than RAM, and RAM is orders of magnitude slower than VRAM sitting next to a GPU's compute cores. Every time the router picks an expert that isn't already cached, Colibrì has to stall the forward pass and wait on an I/O read.

The measured result is blunt: **0.05 to 0.1 tokens per second.** That's roughly one token every 10 to 20 seconds. For comparison, a comfortable interactive chat experience usually wants something in the range of 10-50 tokens per second. Colibrì is running two to three orders of magnitude slower than that.

This is not a hidden cost or an engineering oversight—it's the explicit tradeoff the architecture makes. Colibrì is not trying to compete with a cloud-hosted, GPU-backed deployment of the same model on latency. It's trying to make the model *runnable at all* on hardware that would otherwise have no path to running it. Those are different design goals, and it's important not to confuse them.

## Why Slow Is Still a Win: The Sovereignty Argument

It would be easy to dismiss 0.1 tokens/second as impractical. For a live customer-facing chatbot, it is. But that's not the use case Colibrì is built for.

Consider what this architecture actually unlocks:

- **No cloud dependency.** The model runs entirely on hardware you own, with no API keys, no per-token billing, and no risk of a provider changing terms, deprecating a model, or logging your prompts.
- **No GPU cluster capital expense.** A 744B-parameter model that would otherwise require multiple high-end GPUs (each costing tens of thousands of dollars) instead runs on a machine built around consumer RAM and a consumer NVMe drive.
- **Batch and offline workloads become viable.** Overnight document analysis, research queries, code review passes, or any workload that doesn't need a human staring at a spinner—these can tolerate multi-second-per-token latency in exchange for zero incremental cost and full data control.
- **Access for the resource-constrained.** Researchers, students, and engineers in regions or organizations without access to institutional GPU budgets get a genuine path to experimenting with frontier-scale open-weight models.

This is the same argument I've made about [air-gapped AI](./air-gapped-ai-ultimate-control.md) and [silicon sovereignty](./ai-layoff-regret-sovereign-economics.md) more broadly: control over your compute is a strategic asset, not just an operational convenience. Colibrì extends that sovereignty to a class of models that, until now, were assumed to require infrastructure most people simply don't have.

Slow and sovereign beats fast and rented, for a meaningful set of workloads.

## The Takeaway

Colibrì won't replace a properly provisioned GPU cluster for production inference, and it doesn't try to. What it does is prove that the assumption "you need a data center to run a trillion-parameter-class model" is not a law of nature—it's a consequence of architectural choices that can be revisited.

By keeping a small dense backbone in RAM and treating the rest of the model as pageable state on NVMe, Colibrì turns a 744B-parameter model from "impossible on this machine" into "possible, if you're patient." For a growing number of engineers who value control over convenience, that tradeoff is worth making.

---

*John K. Johansen is a Venture Architect and the creator of Kaigents, an open-source platform designed to bring Silicon Sovereignty to the enterprise.*
