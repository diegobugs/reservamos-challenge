import { StyleSheet, ViewStyle } from "react-native";

interface Styles {
  rotate: (rotation: number) => ViewStyle;
  [key: string]: any;
}
export const styles = StyleSheet.create<Styles>({
  rotate: (rotation: number) => ({
    transform: [{ rotate: `${rotation}deg` }],
  }),
});
