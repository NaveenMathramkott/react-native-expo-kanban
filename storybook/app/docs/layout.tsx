import type { ReactNode } from "react";

import { DocsMobileToc, DocsToc } from "@/components/docs-toc";
import { DocsPager } from "@/components/docs-pager";
import { DocsSidebar } from "@/components/docs-sidebar";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-1">
      <aside className="scrollbar-thin sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 overflow-y-auto border-r px-4 py-8 lg:block">
        <DocsSidebar />
      </aside>

      <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <DocsMobileToc />
          {children}
          <DocsPager />
        </div>
      </main>

      <aside className="scrollbar-thin sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto px-4 py-8 xl:block">
        <DocsToc />
      </aside>
    </div>
  );
}
