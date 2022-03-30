import { Theme, ThemeType } from "@utils";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Styles {
  card: (theme: ThemeType, selected: boolean) => ViewStyle;
  dateText: TextStyle;
  divider: (theme: ThemeType) => ViewStyle;
  header: (theme: ThemeType, selected: boolean) => ViewStyle;
  image: ImageStyle;
  tempContainer: ViewStyle;
  tempText: (theme: ThemeType, color: string) => TextStyle;

  [key: string]: any;
}

export const styles: Styles = StyleSheet.create<Styles>({
  card: (theme, selected) => ({
    backgroundColor: selected ? theme.colors.card : theme.colors.background,
    paddingHorizontal: 8,
    width: 80,
  }),
  dateText: {
    fontSize: 12,
  },
  divider: (theme) => ({
    borderWidth: 1,
    borderColor: theme.colors.border,
    width: "100%",
  }),
  header: (theme, selected) => ({
    backgroundColor: selected ? theme.colors.primary : theme.colors.background,
    alignItems: "center",
  }),
  image: {
    width: 40,
    height: 40,
  },
  tempContainer: {
    alignItems: "center",
    marginVertical: 8,
  },
  tempText: (theme, color) => ({
    fontSize: 16,
    color: color ?? theme.colors.text,
    fontWeight: "bold",
  }),
});
