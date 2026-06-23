"use client";

import { use, useEffect, useId, useState } from "react";
import { useTheme } from "next-themes";

export function Mermaid({ chart }: { chart: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid returning undefined
  return <MermaidContent chart={chart} />;
}

const cache = new Map<string, Promise<unknown>>();

function cachePromise<T>(
  key: string,
  setPromise: () => Promise<T>,
): Promise<T> {
  const cached = cache.get(key);
  if (cached) return cached as Promise<T>;

  const promise = setPromise();
  cache.set(key, promise);
  return promise;
}

function MermaidContent({ chart }: { chart: string }) {
  const id = useId();
  const { resolvedTheme } = useTheme();
  const { default: mermaid } = use(
    cachePromise("mermaid", () => import("mermaid")),
  );

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "loose",
    fontFamily: "inherit",
    themeCSS: "margin: 0 auto;", // Cleaned up margin to let Tailwind wrapper control spacing
    theme: resolvedTheme === "dark" ? "dark" : "default",
  });

  const { svg, bindFunctions } = use(
    cachePromise(`${chart}-${resolvedTheme}`, () => {
      return mermaid.render(id, chart.replaceAll("\\n", "\n"));
    }),
  );

  return (
    <div
      className="group relative my-6 w-full overflow-x-auto rounded-xl bg-fd-card/50 transition-all duration-200 hover:bg-fd-card
      [&::-webkit-scrollbar]:h-2
      [&::-webkit-scrollbar-track]:bg-transparent
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-fd-muted-foreground/20
      hover:[&::-webkit-scrollbar-thumb]:bg-fd-muted-foreground/40"
    >
      <div
        ref={(container) => {
          if (container) bindFunctions?.(container);
        }}
        className="flex min-w-max items-center justify-center p-6 text-sm"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
