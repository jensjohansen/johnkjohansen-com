"use client";

import { useEffect, useRef } from "react";

interface Props {
  html: string;
  className?: string;
}

export function MermaidContent({ html, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    let cancelled = false;

    async function renderDiagrams() {
      const mermaid = (await import("mermaid")).default;

      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          primaryColor: "#1e1e2e",
          primaryTextColor: "#ffffff",
          primaryBorderColor: "#eab308",
          lineColor: "#a1a1aa",
          secondaryColor: "#12121a",
          tertiaryColor: "#12121a",
          mainBkg: "#12121a",
          nodeBorder: "#2e2e3e",
          clusterBkg: "#0f0f15",
          titleColor: "#eab308",
          edgeLabelBackground: "#12121a",
          fontFamily: "inherit",
          fontSize: "14px",
        },
      });

      if (!ref.current || cancelled) return;

      const nodes = ref.current.querySelectorAll("pre code.language-mermaid");

      for (let i = 0; i < nodes.length; i++) {
        if (cancelled) break;
        const node = nodes[i];
        const code = node.textContent ?? "";
        const id = `mermaid-diagram-${Date.now()}-${i}`;
        const container = document.createElement("div");
        container.className = "mermaid-diagram";
        try {
          const { svg } = await mermaid.render(id, code);
          container.innerHTML = svg;
          node.closest("pre")?.replaceWith(container);
        } catch (err) {
          console.error("Mermaid render error:", err);
          container.textContent = code;
          node.closest("pre")?.replaceWith(container);
        }
      }
    }

    renderDiagrams();

    return () => {
      cancelled = true;
    };
  }, [html]);

  return (
    <div
      ref={ref}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
