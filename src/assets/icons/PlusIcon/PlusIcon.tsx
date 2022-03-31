import { useTheme } from "@react-navigation/native";
import { ThemeType } from "@utils";
import React from "react";
import { Path, Svg } from "react-native-svg";

export type PlusIconProps = {
  fill?: Exclude<keyof ThemeType["colors"], "opacity">;
};

const PlusIcon = ({ fill = "primary", ...props }: PlusIconProps) => {
  const theme = useTheme() as ThemeType;
  const color: string = theme.colors[fill];

  return (
    <Svg viewBox="0 0 330 330" {...props}>
      <Path
        fill={color}
        d="M281.672 48.328C250.508 17.163 209.073 0 164.999 0 120.927 0 79.492 17.163 48.328 48.328c-64.333 64.334-64.333 169.011 0 233.345C79.492 312.837 120.927 330 165 330c44.073 0 85.508-17.163 116.672-48.328 64.333-64.333 64.333-169.011 0-233.344zM260.46 260.46C234.961 285.957 201.06 300 165 300c-36.06 0-69.961-14.043-95.46-39.54-52.636-52.637-52.636-138.282 0-190.919C95.039 44.042 128.94 30 164.999 30c36.06 0 69.961 14.042 95.46 39.54 52.636 52.637 52.636 138.283.001 190.92z"
      />
      <Path
        fill={color}
        d="M254.999 150H180V75c0-8.284-6.716-15-15-15s-15 6.716-15 15v75H75c-8.284 0-15 6.716-15 15s6.716 15 15 15h75v75c0 8.284 6.716 15 15 15s15-6.716 15-15v-75h74.999c8.284 0 15-6.716 15-15s-6.715-15-15-15z"
      />
    </Svg>
  );
};

export default PlusIcon;
