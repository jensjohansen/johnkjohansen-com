---
title: "The LLM Coding Proxy: Why We Built a Bridge to Local Reasoning"
subtitle: "Solving the connectivity gap between cloud-first agents and local-first sovereignty"
date: "2026-03-02"
description: "How a simple proxy unlocked the power of local reasoning models (GPT-OSS, Qwen3) for cloud-native AI agents like Zencoder.ai and Kilo Code."
tags: ["Self-Hosted AI", "LLM Proxy", "Zencoder", "Kilo Code", "Lemonade Server"]
featured: false
author: "John K. Johansen"
---

By early March 2026, our [Silicon Sovereignty](./amd-ryzen-ai-npu-enterprise-chip.md) experiment was a technical success. We had a six-node Kubernetes cluster running **GPT-OSS 20B** and **Qwen3 Coder 30B** on AMD NPUs, achieving inference speeds that rivaled mid-tier commercial APIs.

But we hit a frustrating wall: **Tool Fragmentation.**

Most of the leading AI coding agents—including the early 2026 versions of **Zencoder.ai**, **Kilo Code**, and **Continue.DEV**—were designed with a cloud-first bias. Even when they allowed custom endpoints, they often struggled with the specific handshake requirements of local inference servers like **Lemonade Server**. 

More importantly, we needed these agents to "see" our [Kaigents](./zero-dollar-infrastructure-stack.md) MCP (Model Context Protocol) tools, which were buried behind our firewall.

## The Solution: The llm-coding-proxy

To solve this, we didn't wait for the vendors to catch up. We built a bridge: the **llm-coding-proxy**.

The proxy is a lightweight service that acts as a standard OpenAI-compatible API endpoint. To the IDE extension or the autonomous agent, it looks like just another cloud provider. But under the hood, it performs three critical functions:

1.  **Protocol Translation**: It translates generic OpenAI requests into the optimized formats required by Lemonade Server for our local NPUs.
2.  **MCP Routing**: It bridges the gap between the agent's environment and our local Kaigents MCP tools, allowing a cloud-hosted agent to securely invoke local shell commands, database queries, and Kubernetes actions.
3.  **Intelligent Model Routing**: It allows us to swap models dynamically. For a simple refactor, it might use a fast local model. For a complex architectural decision, it can fail over to a cloud-hosted reasoning model.

## Why This Changed the Game

Once the proxy was live, the performance of our autonomous agents leaped.

### 1. Zencoder.ai Unlocked
The Zencoder VS Code extension could now use our **Qwen3 Coder 30B** reasoning model for complex implementation tasks. Because the proxy handled the MCP integration, Zencoder could suddenly "talk" to our local Kubernetes cluster to run smoke tests or check deployment logs—something it previously couldn't do without a messy VPN setup.

### 2. $0 Reasoning
We were no longer paying "token taxes" for every iteration of a coding task. By routing 80% of the reasoning load to our **GPT-OSS 20B** instance via the proxy, we dropped our monthly AI bill from $400 to nearly zero, without sacrificing the quality of the output.

### 3. Privacy by Default
Because the proxy was the only external-facing component, our source code and internal documentation stayed within our private network. The "Derived Intelligence" generated during our coding sessions never left our lab.

## The Venture Architect's Perspective

The lesson of the LLM Coding Proxy is a recurring one in my 40+ years of engineering: **When the platform becomes a bottleneck, build a shim.**

We are in a transitional era where the tools are ahead of the infrastructure. By building a custom bridge, we didn't just solve a connectivity issue; we reclaimed control over our cost, our privacy, and our technical strategy.

The proxy isn't just a piece of glue code. It’s the mechanism that allows us to treat AI as a commodity while maintaining our sovereignty as engineers.

---

*John K. Johansen is the architect of the llm-coding-proxy and a pioneer in self-hosted autonomous agent infrastructure.*
