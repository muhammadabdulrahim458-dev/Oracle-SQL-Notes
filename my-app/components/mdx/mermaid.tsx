import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { renderMermaidSVG } from "beautiful-mermaid";

export async function Mermaid({ chart }: { chart: string }) {
  try {
    const svg = renderMermaidSVG(chart, {
      bg: "var(--color-fd-background)",
      fg: "var(--color-fd-foreground)",
      interactive: true,
      transparent: true,
    });

    return (
      <div className="my-4 w-full overflow-x-auto rounded-lg border">
        <div
          className="min-w-max p-4"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>
    );
  } catch {
    return (
      <CodeBlock title="Mermaid">
        <Pre>{chart}</Pre>
      </CodeBlock>
    );
  }
}
