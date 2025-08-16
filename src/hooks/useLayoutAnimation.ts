import { useRef } from "react";
import { LayoutAnimation, Platform, UIManager } from "react-native";
import { enableLayoutAnimations } from "react-native-reanimated";

const DEFAULT_DURATION = 200;

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface Options {
  /**
   * default: 'opacitiy'
   */
  effectType?: "linear" | "spring" | "easeInEaseOut" | "opacitiy";
  /**
   * default: 200
   */
  duration?: number;
}

export function useLayoutAnimation(value: any, options?: Options) {
  const prevValue = useRef(value);

  if (value !== prevValue.current) {
    // **
    // This workaround is needed in order for animations to work on Android
    // For more context see: https://github.com/software-mansion/react-native-reanimated/issues/3734#issuecomment-1989241991
    // */
    enableLayoutAnimations(false);

    prevValue.current = value;

    const duration = options?.duration ?? DEFAULT_DURATION;

    switch (options?.effectType) {
      case "linear":
        LayoutAnimation.configureNext({
          ...LayoutAnimation.Presets.linear,
          duration,
        });
        break;
      case "easeInEaseOut":
        LayoutAnimation.configureNext({
          ...LayoutAnimation.Presets.easeInEaseOut,
          duration,
        });
        break;
      case "spring":
        LayoutAnimation.configureNext({
          ...LayoutAnimation.Presets.spring,
          duration,
        });
        break;
      default: {
        LayoutAnimation.configureNext({
          create: {
            property: "opacity",
            type: "easeIn",
            delay: duration * 0.8,
          },
          duration,
          update: { type: "easeInEaseOut" },
        });
      }
    }

    setTimeout(() => enableLayoutAnimations(true), 250);
  }
}
