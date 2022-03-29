import { DefaultTheme } from "@react-navigation/native";

import { ThemeType } from "./types";

const opacity = {
  10: "1A",
  20: 33,
  30: "4D",
  40: 66,
  50: 80,
  60: 90,
  70: "AA",
  80: "CC",
  90: "DD",
  100: "FF",
};

const Theme: ThemeType = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#ce348b",
    background: "#ffffff",
    text: "#1a1a1a",
    border: "#d6ddf4",
    disabled: "#909090",
    disabledContrast: "#FFFFFF",
    error: "#e0a0a0",
    primaryContrast: "#FFFFFF",
    rejected: "#e0a0a0",
    rejectedContrast: "#FFFFFF",
    secondary: "#012674",
    secondaryContrast: "#353535",
    success: "#b3e7dd",
    successContrast: "#FFFFFF",
    opacity,
    warning: "#f0951c",
  },
};

export { Theme };
