---
title: "Cost Optimization on Kubernetes: The Changes That Actually Move the Needle"
subtitle: "Getting your infrastructure bill as close to zero as possible"
date: "2026-04-21"
description: "Why most Kubernetes 'cost tools' are a waste of time. The three architectural changes that dramatically reduced our TCO."
tags: ["Kubernetes", "Cost Optimization", "Infrastructure", "TCO", "Startups"]
featured: false
author: "John K. Johansen"
---

When I talk to startup CTOs about [Kubernetes](./kubernetes-for-startups.md), their biggest complaint is almost always **Cost.** They move to the cloud to "save money" and end up with a $5,000 monthly bill for a handful of microservices.

In our lab, we’ve taken the opposite path. We run an enterprise-grade stack for the cost of a home internet connection and a bit of electricity. 

If you want to achieve a [$0 Infrastructure Stack](./zero-dollar-infrastructure-stack.md), stop looking at "cost visualization" dashboards and start making these three architectural changes. They are the only ones that actually move the needle.

## 1. Embrace the NPU-First World
If you are running AI workloads on GPUs in the cloud, you are hemorrhaging money. GPUs are power-hungry and expensive to rent. 

In our lab, we offload 90% of our inference to the **AMD Ryzen AI NPU**.
-   **The Change**: Use [Lemonade Server](./model-serving-2-lemonade-server.md) to target the NPU for your [reasoning models](./reasoning-models-shoestring-gpt-oss-qwen3.md).
-   **The Result**: Near-zero inference costs and a massive reduction in electricity consumption.

## 2. Right-Size with Resource Requests (The "Goldilocks" Rule)
Most teams either set no limits (leading to "noisy neighbor" crashes) or set them way too high (leading to massive waste). 

In our lab, we use our [HTAP observability stack](./clickhouse-for-startups.md) to monitor the *actual* usage of every pod over a 30-day period. 
-   **The Change**: Set your resource `requests` to the 95th percentile of actual usage, and your `limits` to 2x that amount. 
-   **The Result**: You can pack 3x more pods onto the same [mini-PC node](./high-availability-on-a-shoestring.md).

## 3. Kill the Cloud Egress (The Ceph Strategy)
If you are using AWS S3 or a similar service, your biggest hidden cost is **Egress.** You pay every time an agent or a user reads a file.

-   **The Change**: Deploy **Rook-Ceph** on your local cluster to create a sovereign, S3-compatible object store.
-   **The Result**: Egress fees drop to zero. You can store petabytes of training data and [agent audit trails](./ai-agent-observability.md) for the cost of a raw hard drive.

## The Venture Architect's Perspective

Cost optimization isn't about finding a cheaper vendor; it's about **Architectural Sovereignty.** 

When you own the hardware and use open-source orchestration, you break the correlation between your business growth and your vendor's revenue. You create an **Infinite Runway** that allows you to experiment, fail, and eventually win.

Efficiency is the ultimate competitive advantage. Build it into your foundation.

---

*John K. Johansen is an infrastructure strategist and the architect of the Kaigents Zero-Dollar Stack.*
