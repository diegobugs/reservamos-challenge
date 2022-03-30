import { ThemeType } from "@utils";
import { StyleSheet, ViewStyle } from "react-native";

interface Styles {
  header: (theme: ThemeType) => ViewStyle;
  textInput: (theme: ThemeType) => ViewStyle;
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
  textInput: (theme) => ({
    width: "100%",
    height: 60,
    color: theme.colors.secondaryContrast,
  }),
});
