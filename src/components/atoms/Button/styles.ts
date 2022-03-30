import { ThemeType } from "@utils";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

export interface Styles {
  fullWidth: ViewStyle;
  pressable_common: ViewStyle;

  pressable_contained: (theme: ThemeType) => ViewStyle;
  pressable_contained_disabled: (theme: ThemeType) => ViewStyle;
  pressable_contained_pressed: (theme: ThemeType) => ViewStyle;

  pressable_text: (theme: ThemeType) => ViewStyle;
  pressable_text_disabled: (theme: ThemeType) => ViewStyle;
  pressable_text_pressed: (theme: ThemeType) => ViewStyle;

  text_contained: (theme: ThemeType) => TextStyle;
  text_contained_disabled: (theme: ThemeType) => TextStyle;
  text_contained_pressed: (theme: ThemeType) => TextStyle;

  text_text: (theme: ThemeType) => TextStyle;
  text_text_disabled: (theme: ThemeType) => TextStyle;
  text_text_pressed: (theme: ThemeType) => TextStyle;
  [key: string]: any;
}

export const styles: Styles = StyleSheet.create<Styles>({
  fullWidth: {
    width: "100%",
  },
  pressable_common: {
    alignContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    height: 50,
    minWidth: 48,
    justifyContent: "center",
  },

  pressable_contained: (theme: ThemeType) => ({
    backgroundColor: theme.colors.primary,
  }),
  pressable_contained_shadow: (theme: ThemeType) => ({
    shadowColor: theme.colors.primary,
  }),
  pressable_contained_disabled: (theme: ThemeType) => ({
    backgroundColor: theme.colors.disabled,
  }),
  pressable_contained_disabled_shadow: (theme: ThemeType) => ({
    shadowColor: theme.colors.disabled,
  }),
  pressable_contained_pressed: (theme: ThemeType) => ({
    opacity: 0.6,
    backgroundColor: theme.colors.primary,
  }),
  pressable_text: (theme: ThemeType) => ({}),
  pressable_text_shadow: (theme: ThemeType) => ({
    shadowColor: theme.colors.primary,
  }),
  pressable_text_disabled: (theme: ThemeType) => ({}),
  pressable_text_disabled_shadow: (theme: ThemeType) => ({
    shadowColor: theme.colors.disabled,
  }),
  pressable_text_pressed: (theme: ThemeType) => ({
    opacity: 0.5,
  }),
  text_contained: (theme: ThemeType) => ({
    color: theme.colors.primaryContrast,
  }),
  text_contained_disabled: (theme: ThemeType) => ({
    color: theme.colors.disabledContrast,
  }),
  text_contained_pressed: (theme: ThemeType) => ({
    color: theme.colors.primaryContrast,
  }),
  text_common: {
    flex: 1,
  },
  text_text: (theme: ThemeType) => ({
    color: theme.colors.primary,
  }),
  text_text_disabled: (theme: ThemeType) => ({
    color: theme.colors.disabled,
  }),
  text_text_pressed: (theme: ThemeType) => ({
    opacity: 0.5,
  }),
  shadow: {
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,

    // Android
    elevation: 5,
  },
});
