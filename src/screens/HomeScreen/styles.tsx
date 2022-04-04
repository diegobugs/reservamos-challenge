import { ThemeType } from "@utils";
import { StyleSheet, ViewStyle } from "react-native";

interface Styles {
  background: (theme: ThemeType) => ViewStyle;
  container: (theme: ThemeType) => ViewStyle;
  opacity: ViewStyle;
  flatListContainer: ViewStyle;
  flex: ViewStyle;
  [key: string]: any;
}

export const styles = StyleSheet.create<Styles>({
  background: (theme) => ({
    backgroundColor: theme.colors.background,
  }),
  container: (theme) => ({
    flex: 1,
    backgroundColor: theme.colors.secondary,
  }),
  opacity: { opacity: 0.5 },
  flex: { flex: 1 },
  flatListContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
});
