import React, { useRef } from "react";
import { GestureResponderEvent, Pressable } from "react-native";

import { useTheme } from "@react-navigation/native";

import Text from "../Text";
import { styles } from "./styles";
import { ButtonProps } from "./types";
import { ThemeType } from "@utils";

const Button = ({
  children,
  disabled,
  disableDisabledStyle,
  disableSafeTouch = false,
  fullWidth,
  startIcon,
  shadowStyle,
  style,
  TextStyle,
  variant = "contained",
  onPress,
  ...props
}: ButtonProps) => {
  const theme = useTheme() as ThemeType;
  const _style = ({ pressed }: { pressed: boolean }) => [
    styles.pressable_common,
    pressed
      ? styles[`pressable_${variant}_pressed`](theme)
      : styles[
          `pressable_${variant}${
            disabled && !disableDisabledStyle ? "_disabled" : ""
          }`
        ](theme),
    fullWidth ? styles.fullWidth : null,
    style,
  ];
  const isTouched = useRef(false);

  const handleOnPress = (e: GestureResponderEvent) => {
    if (isTouched.current && !disableSafeTouch) {
      return;
    }
    isTouched.current = true;
    setTimeout(() => {
      isTouched.current = false;
    }, 350);

    if (typeof onPress === "function") {
      onPress(e);
    }
  };

  return (
    <Pressable
      //@ts-ignore
      style={_style}
      disabled={disabled}
      onPress={handleOnPress}
      {...props}
    >
      {({ pressed }) =>
        typeof children === "string" ? (
          <>
            <Text
              align="center"
              style={[
                styles.text_common,
                pressed
                  ? styles[`text_${variant}_pressed`](theme)
                  : styles[
                      `text_${variant}${
                        disabled && !disableDisabledStyle ? "_disabled" : ""
                      }`
                    ](theme),
                TextStyle,
              ]}
            >
              {children as string}
            </Text>
          </>
        ) : (
          children
        )
      }
    </Pressable>
  );
};

export default Button;
