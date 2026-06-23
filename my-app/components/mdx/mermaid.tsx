import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { renderMermaidSVG } from "beautiful-mermaid";

export async function Mermaid({ chart }: { chart: string }) {
  try {
    const svg = renderMermaidSVG(chart, {
      bg: "transparent", // Let the parent container handle background coloring smoothly
      fg: "var(--color-fd-foreground)",
      interactive: true,
      transparent: true,
    });

    return (
      // Inside your Mermaid component container:
      <div
        className="group relative my-6 w-full overflow-x-auto rounded-xl bg-fd-card/50 transition-all duration-200 hover:bg-fd-card
  [&::-webkit-scrollbar]:h-2
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-fd-muted-foreground/20
  hover:[&::-webkit-scrollbar-thumb]:bg-fd-muted-foreground/40"
      >
        <div
          className="flex min-w-max items-center justify-center p-6 text-sm"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>
    );
  } catch {
    return (
      <CodeBlock title="Mermaid Error (Fallback)">
        <Pre>{chart}</Pre>
      </CodeBlock>
    );
  }
}
