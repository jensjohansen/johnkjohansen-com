---
title: "agents.md: The Secret to Managing Autonomous AI Teams"
subtitle: "Moving from static prompts to a 'Living Constitution' for your agents"
date: "2026-03-09"
description: "Why traditional system prompts fail for long-running tasks. How we use an agents.md file to maintain state, context, and governance across our autonomous team."
tags: ["AI Governance", "Zencoder", "Kilo Code", "Workflow Management", "Autonomous Agents"]
featured: false
author: "John K. Johansen"
---

In the early days of AI assistants, we spent our time perfecting the "System Prompt." We tried to pack every instruction, every coding standard, and every project goal into a single, massive block of text.

By March 2026, we’ve learned that this doesn't scale. 

As tasks become more complex and autonomous agents like **Zencoder.ai** and **Kilo Code** take on multi-hour refactors, they suffer from "Context Drift." They forget the secondary constraints. They start implementing in a style that doesn't match the rest of the project. They lose the "State" of the mission.

The solution we’ve adopted in our [Zero-Dollar Infrastructure](./zero-dollar-infrastructure-stack.md) lab is the **`agents.md`** file.

## The "Living Constitution"

Think of `agents.md` (sometimes called `custom-instructions.md`) as the "Living Constitution" of your repository. It is a persistent markdown file that sits in your root directory, and it is the first thing every autonomous agent reads before it takes a single action.

Unlike a system prompt, which is passed once at the start of a session, `agents.md` is a **Shared Memory Layer.**

### What Goes Inside?

We’ve structured our `agents.md` to cover four critical areas:

1.  **Project Context**: What is the core mission of this codebase? (e.g., "This is Kaigents, a production-grade substrate for AI agents.")
2.  **Engineering Standards**: What are our non-negotiables? (e.g., "Always use TypeScript," "Unit tests are required for all new logic," "No external APIs without a proxy.")
3.  **Active Mission State**: What are we working on *right now*? What are the known blockers? This is where the [Venture Architect](./ai-pair-programming-reflections.md) updates the goals for the next sprint.
4.  **Behavioral Guardrails**: Explicit instructions on tool use. (e.g., "Never delete files without a multi-step confirmation," "Always run `npm run lint` before completing a task.")

## The "Governor" Effect

By using `agents.md`, I am no longer "prompt engineering." I am **Governing.**

When I see an agent make a mistake—for example, forgetting to update a README after a feature change—I don't just tell it to fix it. I update the `agents.md` to include "Always update relevant documentation in the same PR as code changes."

The next time any agent—whether it’s Zencoder, Kilo Code, or a custom script—reads the file, they have that new "law" in their context.

## State Across Tools

The beauty of the `agents.md` pattern is that it is **Tool Agnostic.** 

In March 2026, we were experimenting with a suite of tools: **Zencoder.ai** for complex implementation, **Kilo Code** for rapid refactoring, and **Continue.DEV** for quick explanations. Because they all read from the same `agents.md`, they all operated with the same "Brain." I could switch tools halfway through a task, and the new tool would pick up right where the old one left off because the state was in the file, not the chat history.

## The "Hindsight" Insight

A well-maintained `agents.md` is the single most important document in an AI-accelerated repository. It is the bridge between the [Human Vision](./human-in-the-loop-design-feature.md) and the [AI Execution](./zencoder-leap-to-autonomy.md).

If you want to move from "playing with AI" to "running an AI team," stop obsessing over your system prompts. Start writing your project’s Constitution.

---

*John K. Johansen uses agents.md to manage the Kaigents and MindTheStore.ai repositories, achieving 10x engineering velocity through governed autonomy.*
