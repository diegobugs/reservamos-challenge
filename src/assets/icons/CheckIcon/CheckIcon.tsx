import { useTheme } from "@react-navigation/native";
import { ThemeType } from "@utils";
import React from "react";
import { Path, Svg } from "react-native-svg";

export type CheckIconProps = {
  fill?: Exclude<keyof ThemeType["colors"], "opacity">;
};

const CheckIcon = ({ fill = "primary", ...props }: CheckIconProps) => {
  const theme = useTheme() as ThemeType;
  const color: string = theme.colors[fill];

  return (
    <Svg viewBox="0 0 330 330" {...props}>
      <Path
        fill={color}
        d="M165 0C74.019 0 0 74.019 0 165s74.019 165 165 165 165-74.019 165-165S255.981 0 165 0zm0 300c-74.44 0-135-60.561-135-135S90.56 30 165 30s135 60.561 135 135-60.561 135-135 135z"
      />
      <Path
        fill={color}
        d="M226.872 106.664l-84.854 84.853-38.89-38.891c-5.857-5.857-15.355-5.858-21.213-.001-5.858 5.858-5.858 15.355 0 21.213l49.496 49.498a15 15 0 0010.606 4.394h.001c3.978 0 7.793-1.581 10.606-4.393l95.461-95.459c5.858-5.858 5.858-15.355 0-21.213-5.858-5.858-15.355-5.859-21.213-.001z"
      />
    </Svg>
  );
};

export default CheckIcon;
