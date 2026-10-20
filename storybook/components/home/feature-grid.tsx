import {
  Boxes,
  Gauge,
  Layers,
  MoveHorizontal,
  Palette,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: MoveHorizontal,
    title: "Drag and drop",
    description:
      "Long-press a card, drag across columns, and drop. Edge pagination auto-scrolls the board while you move.",
  },
  {
    icon: Palette,
    title: "Custom rendering",
    description:
      "renderItem and renderHeader are fully controlled. Your cards, your typography, your design system.",
  },
  {
    icon: Gauge,
    title: "Built on Reanimated",
    description:
      "Gestures and drop animations run on the UI thread, keeping interactions fluid even with dense columns.",
  },
  {
    icon: Smartphone,
    title: "Made for Expo",
    description:
      "Works with Expo Go and development builds. The package has no native modules of its own.",
  },
  {
    icon: Layers,
    title: "Controlled data model",
    description:
      "Columns are a plain array. Move items in onDragEnd and the board re-renders from your state.",
  },
  {
    icon: Boxes,
    title: "TypeScript support",
    description:
      "Generic props keep item and header shapes type-safe across renderItem, renderHeader, and onDragEnd.",
  },
];

export function FeatureGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="flex flex-col gap-3 rounded-lg border p-5"
        >
          <feature.icon className="text-muted-foreground size-5" />
          <h3 className="text-sm font-semibold">{feature.title}</h3>
          <p className="text-muted-foreground text-sm leading-6">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}
