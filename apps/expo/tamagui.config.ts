import { createAnimations } from "@tamagui/animations-react-native";
import { createInterFont } from "@tamagui/font-inter";
import { createMedia } from "@tamagui/react-native-media-driver";
import { shorthands } from "@tamagui/shorthands";
import { tokens } from "@tamagui/themes/v2";
import { themes } from "@tamagui/themes/v2-themes";
import { createTamagui } from "tamagui";

const headingFont = createInterFont({
  size: {
    6: 15,
  },
  transform: {
    6: "uppercase",
    7: "none",
  },
  weight: {
    6: "400",
    7: "700",
  },
  color: {
    6: "$colorFocus",
    7: "$color",
  },
  letterSpacing: {
    5: 2,
    6: 1,
    7: 0,
    8: -1,
    9: -2,
    10: -3,
    12: -4,
    14: -5,
    15: -6,
  },
  face: {
    700: { normal: "InterBold" },
  },
});

const bodyFont = createInterFont(
  {
    face: {
      700: { normal: "InterBold" },
    },
  },
  {
    sizeSize: (size) => Math.round(size * 1.1),
    sizeLineHeight: (size) => Math.round(size * 1.1 + (size > 20 ? 10 : 10)),
  }
);

const animations = createAnimations({
  bouncy: {
    damping: 9,
    mass: 0.9,
    stiffness: 150,
  },
  lazy: {
    damping: 18,
    stiffness: 50,
  },
});

export const config = createTamagui({
  defaultFont: "body",
  animations,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,

  // highly recommended to turn this on if you are using shorthands
  // to avoid having multiple valid style keys that do the same thing
  // we leave it off by default because it can be confusing as you onboard.
  onlyAllowShorthands: false,
  shorthands,

  fonts: {
    body: bodyFont,
    heading: headingFont,
  },
  settings: {
    allowedStyleValues: "somewhat-strict",
  },
  themes: {
    ...themes,
    // Locked brand accent — @miti/theme brand.primaryHex #4f46e5
    // Radius scale locked to 0.5rem (8px): card $4, rows $3.
    light_Button: {
      background: "#fff",
      backgroundFocus: "#424242",
      backgroundHover: "#a5a5a5",
      backgroundPress: "#a5a5a5",
      backgroundStrong: "#191919",
      backgroundTransparent: "#151515",
      color: "#000",
      colorFocus: "#a5a5a5",
      colorHover: "#a5a5a5",
      colorPress: "#fff",
      colorTransparent: "#a5a5a5",
      placeholderColor: "#424242",
    },
    light_brand: {
      background: "#4f46e5",
      backgroundHover: "#4338ca",
      backgroundPress: "#4338ca",
      backgroundFocus: "#6366f1",
      color: "#fff",
    },
    dark_brand: {
      background: "#4f46e5",
      backgroundHover: "#6366f1",
      backgroundPress: "#6366f1",
      backgroundFocus: "#818cf8",
      color: "#fff",
    },
  },
  tokens,
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: "none" },
    pointerCoarse: { pointer: "coarse" },
  }),
});

// for the compiler to find it
export default config;
