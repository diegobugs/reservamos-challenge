import React from "react";
import { View, ViewStyle } from "react-native";

import Icons, { IconsList } from "../../../assets/icons";
import { ThemeType } from "@utils";
import { styles } from "./styles";

export type SvgType = {
  fill?: Exclude<keyof ThemeType["colors"], "opacity">;
  fillContrast?: Exclude<keyof ThemeType["colors"], "opacity">;
};

export type IconType = { [key: string]: React.FC };

export type IconProps = SvgType & {
  height?: number;
  /** Nombre del ícono a ser renderizado */
  icon: IconsList;
  rotate?: number;
  style?: ViewStyle | (ViewStyle | null | undefined)[];
  width?: number;
};

const Icon = ({ icon, rotate = 0, style, ...props }: IconProps) => {
  const Component = Icons[icon];
  return (
    <View style={[style, styles.rotate(rotate)]}>
      <Component {...props} />
    </View>
  );
};
export default Icon;
