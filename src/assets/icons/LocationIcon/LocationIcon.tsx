import { useTheme } from "@react-navigation/native";
import { ThemeType } from "@utils";
import React from "react";
import { Path, Svg } from "react-native-svg";

export type LocationIconProps = {
  fill?: Exclude<keyof ThemeType["colors"], "opacity">;
};

const LocationIcon = ({ fill = "primary", ...props }: LocationIconProps) => {
  const theme = useTheme() as ThemeType;
  const color: string = theme.colors[fill];

  return (
    <Svg
      width={466.583}
      height={466.582}
      viewBox="0 0 466.583 466.582"
      {...props}
    >
      <Path
        fill={color}
        d="M233.292 0c-85.1 0-154.334 69.234-154.334 154.333 0 34.275 21.887 90.155 66.908 170.834 31.846 57.063 63.168 104.643 64.484 106.64l22.942 34.775 22.941-34.774c1.317-1.998 32.641-49.577 64.483-106.64 45.023-80.68 66.908-136.559 66.908-170.834C387.625 69.234 318.391 0 233.292 0zm0 233.291c-44.182 0-80-35.817-80-80s35.818-80 80-80 80 35.817 80 80-35.819 80-80 80z"
      />
    </Svg>
  );
};

export default LocationIcon;
