import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { appName, appIcon as Icon } from "@/lib/shared"; // Adjust this path to your actual config file location
import type { LayoutProps } from "fumadocs-ui/layouts/docs";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      nav={{
        title: (
          <div className="flex items-center gap-2 font-semibold">
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span>{appName}</span>
          </div>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}
