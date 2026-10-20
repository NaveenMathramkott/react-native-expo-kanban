import Link from "next/link";
import { ArrowUpRight, Download, Github } from "lucide-react";

import { docsNav, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t">
      <div className="mx-auto grid w-full max-w-screen-2xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5 text-sm font-semibold">
            React Native Expo Kanban
          </div>
          <p className="text-muted-foreground max-w-xs text-sm leading-6">
            A drag-and-drop kanban board for React Native and Expo apps, built
            on Reanimated and Gesture Handler.
          </p>
          <div className="text-muted-foreground flex items-center gap-4 text-sm">
            <Link
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground flex items-center gap-1.5 transition-colors"
            >
              <Github className="size-4" />
              GitHub
              <ArrowUpRight className="size-3" />
            </Link>
            <Link
              href={siteConfig.npm}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground flex items-center gap-1.5 transition-colors"
            >
              <Download className="size-4" />
              npm
              <ArrowUpRight className="size-3" />
            </Link>
          </div>
        </div>

        {docsNav.map((section) => (
          <div key={section.title} className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider">
              {section.title}
            </p>
            <ul className="flex flex-col gap-2">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t">
        <div className="text-muted-foreground mx-auto flex w-full max-w-screen-2xl flex-col gap-2 px-4 py-6 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            Built by{" "}
            <Link
              href={siteConfig.website}
              target="_blank"
              rel="noreferrer"
              className="text-foreground font-medium underline-offset-4 hover:underline"
            >
              Naveen Mathramkott
            </Link>
            . MIT licensed.
          </p>
          <p>
            Source indexed from the{" "}
            <span className="text-foreground font-mono">
              react-native-expo-kanban
            </span>{" "}
            package.
          </p>
        </div>
      </div>
    </footer>
  );
}
