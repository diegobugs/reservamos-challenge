import { ThemeType } from "@utils";
import { StyleSheet, ViewStyle } from "react-native";

interface Styles {
  container: (theme: ThemeType) => ViewStyle;
  content: ViewStyle;
  fullContent: (theme: ThemeType) => ViewStyle;
  lottie: ViewStyle;
  [key: string]: any;
}

export const styles = StyleSheet.create<Styles>({
  container: (theme) => ({
    flex: 1,
    backgroundColor: theme.colors.background,
  }),
  content: {
    paddingVertical: 16,
    flex: 1,
  },
  fullContent: (theme) => ({
    flex: 1,
    backgroundColor: theme.colors.background,
  }),
  lottie: { opacity: 0.5 },
});
