import { ThemeType } from "@utils";
import { StyleSheet, ViewStyle } from "react-native";

interface Styles {
  card: (theme: ThemeType, borders: boolean, shadow: boolean) => ViewStyle;
  cardContainer: ViewStyle;
  divider: (theme: ThemeType) => ViewStyle;
  leftContainer: ViewStyle;
  rightContainer: ViewStyle;
  textContainer: ViewStyle;
  [key: string]: any;
}
export const styles = StyleSheet.create<Styles>({
  card: (theme, borders, shadow) => ({
    backgroundColor: theme.colors.background,
    padding: 8,
    ...(borders && {
      borderWidth: 1,
      borderRadius: 8,
      borderColor: theme.colors.border,
    }),
    ...(shadow && {
      shadowColor: theme.colors.text,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 3,

      // Android
      elevation: 5,
    }),
  }),
  cardContainer: { flexDirection: "row", alignItems: "center" },
  divider: (theme) => ({
    borderWidth: 1,
    borderColor: theme.colors.border,
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
  }),
  leftContainer: {
    paddingHorizontal: 16,
  },
  rightContainer: {
    paddingHorizontal: 24,
  },
  textContainer: {
    flex: 1,
  },
});
