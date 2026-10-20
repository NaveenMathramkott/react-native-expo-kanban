import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { CodeBlock } from "@/components/code-block";
import {
  Callout,
  DocSection,
  InlineCode,
  PageTitle,
} from "@/components/docs-components";
import { InstallCommand } from "@/components/install-command";
import { Button } from "@/components/ui/button";
import {
  babelConfig,
  installDependencies,
  minimalExample,
} from "@/lib/snippets";

export const metadata: Metadata = {
  title: "Installation",
  description:
    "Install react-native-expo-kanban, its peer dependencies, and configure Reanimated and Gesture Handler.",
};

const gestureRoot = `import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Your app */}
    </GestureHandlerRootView>
  );
}`;

const requirements = [
  "React Native with Expo (Expo Go or a development build)",
  "react-native-reanimated 3.x",
  "react-native-gesture-handler 2.x",
  "lodash 4.x",
  "TypeScript is optional but recommended",
];

export default function InstallationPage() {
  return (
    <article className="flex flex-col gap-10">
      <PageTitle
        eyebrow="Getting started"
        title="Installation"
        description="Add the package, install its peers, and wire up the two native dependencies it relies on."
      />

      <DocSection
        id="requirements"
        title="Requirements"
        description="The package itself is JavaScript only; the peers do the native work."
      >
        <ul className="flex flex-col gap-2">
          {requirements.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <Check className="text-success mt-1 size-3.5 shrink-0" />
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
        <Callout type="info" title="Version ranges">
          The published peer ranges are{" "}
          <InlineCode>react-native-reanimated ^3.x</InlineCode>,{" "}
          <InlineCode>react-native-gesture-handler ^2.x</InlineCode>, and{" "}
          <InlineCode>lodash ^4.x</InlineCode>.
        </Callout>
      </DocSection>

      <DocSection
        id="install-package"
        title="Install the package"
        description="Pick your package manager. The same command works inside an Expo project."
      >
        <InstallCommand />
        <CodeBlock
          code={installDependencies}
          language="bash"
          filename="terminal"
        />
        <p>
          Installing the peers separately keeps you in control of their versions,
          which matters because Reanimated must match your Expo SDK.
        </p>
      </DocSection>

      <DocSection
        id="peer-dependencies"
        title="Peer dependencies"
        description="Why each peer is required."
      >
        <div className="flex flex-col gap-2">
          {[
            {
              name: "react-native-reanimated",
              copy: "Drives the drag overlay, rotation, scale, and spring return.",
            },
            {
              name: "react-native-gesture-handler",
              copy: "Captures the long-press and pan gestures used to lift cards.",
            },
            {
              name: "lodash",
              copy: "Throttles column pagination so edge scrolling cannot fire in a loop.",
            },
          ].map((peer) => (
            <div
              key={peer.name}
              className="bg-card flex flex-col gap-0.5 rounded-lg border p-3"
            >
              <code className="text-foreground font-mono text-[12.5px] font-medium">
                {peer.name}
              </code>
              <span className="text-muted-foreground text-[13px] leading-6">
                {peer.copy}
              </span>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection
        id="reanimated-setup"
        title="Reanimated setup"
        description="Reanimated needs its Babel plugin. Newer Expo versions enable it automatically."
      >
        <p>
          On Expo SDK 50 and newer, <InlineCode>babel-preset-expo</InlineCode>{" "}
          already includes the Reanimated plugin. On older projects, add it as
          the last plugin in <InlineCode>babel.config.js</InlineCode>.
        </p>
        <CodeBlock
          code={babelConfig}
          language="javascript"
          filename="babel.config.js"
        />
        <Callout type="warning" title="Plugin order matters">
          The Reanimated plugin must be the last entry in the plugins array. If
          you change Babel config, clear the Metro cache with{" "}
          <InlineCode>npx expo start -c</InlineCode>.
        </Callout>
      </DocSection>

      <DocSection
        id="expo-setup"
        title="Expo setup"
        description="Gesture Handler needs a root view, and the board needs a parent with height."
      >
        <p>
          Wrap your application in{" "}
          <InlineCode>GestureHandlerRootView</InlineCode>. Without it, gestures
          will not reach the board on some platforms.
        </p>
        <CodeBlock
          code={gestureRoot}
          language="tsx"
          filename="App.tsx"
        />
        <p>
          The board uses a horizontal <InlineCode>FlatList</InlineCode>. Make
          sure the screen or parent view gives it height — for example with{" "}
          <InlineCode>flex: 1</InlineCode> on the screen container.
        </p>
      </DocSection>

      <DocSection
        id="verify"
        title="Verify"
        description="Render a tiny board to confirm everything is wired up."
      >
        <CodeBlock
          code={minimalExample}
          language="tsx"
          filename="SmokeTest.tsx"
        />
        <div className="flex items-center gap-2 rounded-lg border border-dashed p-3">
          <span className="bg-success/10 text-success flex size-6 items-center justify-center rounded-full">
            <Check className="size-3.5" />
          </span>
          <p className="text-muted-foreground text-[13px]">
            Long-press a card and drag it to the next column. If it moves, you
            are ready.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="sm">
            <Link href="/docs/usage">
              Next: Usage
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </DocSection>
    </article>
  );
}
