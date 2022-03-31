import { ThemeType } from "@utils";
import { ImageStyle, StyleSheet, ViewStyle } from "react-native";

interface Styles {
  header: (theme: ThemeType) => ViewStyle;
  image: ImageStyle;
  left: ViewStyle;
  right: ViewStyle;
  [key: string]: any;
}

export const styles: Styles = StyleSheet.create<Styles>({
  header: (theme) => ({
    backgroundColor: theme.colors.secondary,
    flexDirection: "row",
    paddingHorizontal: 16,
    alignItems: "center",
    height: 60,
  }),
  image: { width: 160, height: 40 },
  left: {
    flex: 1,
  },
  right: {
    flex: 1,
    alignItems: "flex-end",
  },
});
