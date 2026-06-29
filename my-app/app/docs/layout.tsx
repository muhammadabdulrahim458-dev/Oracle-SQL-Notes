import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { appName, appIcon as Icon } from "@/lib/shared";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      nav={{
        title: (
          <div className="flex items-center gap-2 font-semibold">
            <Icon className="w-4 h-4 shrink-0" />
            <span>{appName}</span>
          </div>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}
