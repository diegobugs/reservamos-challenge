import { ThemeType } from "@utils";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

export interface Styles {
  indicator: (x: number, y: number, w: number, h: number) => ViewStyle;
  [key: string]: any;
}

export const styles: Styles = StyleSheet.create<Styles>({
  indicator: (x, y, w, h) => ({
    position: "absolute",
    left: x - w / 2,
    top: y,
    width: w,
    height: h,
    justifyContent: "center",
    alignItems: "center",
  }),
  icon: {
    width: 16,
    height: 16,
  },
});
