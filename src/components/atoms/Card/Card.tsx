import React, { FunctionComponent, useState } from "react";
import { Pressable, View, ViewProps } from "react-native";

import { ThemeType } from "@utils";
import { styles } from "./styles";
import { Icon, Text } from "@atoms";
import { IconsList } from "../../../assets/icons";
import { useTheme } from "@react-navigation/native";
import Collapsible from "react-native-collapsible";

export type CardProps = ViewProps & {
  borders?: boolean;
  collapsable?: boolean;
  CollapsedContent?: FunctionComponent;
  divider?: boolean;
  icon?: IconsList;
  onActionPress?: () => void;
  left?: string | JSX.Element;
  right?: string | JSX.Element;
  shadow?: boolean;
  text?: string;
  title?: string;
};

type ComponentProps = {
  icon?: IconsList;
  render?: string | JSX.Element;
};

const Component = ({ icon, render }: ComponentProps) => {
  if (icon) {
    return <Icon icon={icon} width={18} height={18} fill="secondary" />;
  }

  if (render) {
    if (typeof render === "string") {
      return <Text color="text">{render}</Text>;
    } else {
      return render;
    }
  }

  return null;
};

const Card = ({
  borders = false,
  collapsable = false,
  CollapsedContent,
  divider = false,
  icon,
  left,
  onActionPress,
  right,
  shadow = false,
  text,
  title,
  ...props
}: CardProps) => {
  const theme = useTheme() as ThemeType;
  const [collapsed, setCollapsed] = useState(false);

  const handleOnPress = () => {
    if (collapsable && typeof onActionPress === "function") {
      console.warn(
        "Collapsable y onActionPress tienen comportamiento diferente juntos"
      );
    }

    if (collapsable) {
      setCollapsed((collapse) => !collapse);
    } else {
      if (typeof onActionPress === "function") {
        onActionPress();
      }
    }
  };

  return (
    <View>
      <View
        {...props}
        style={[styles.card(theme, borders, shadow), props?.style]}
      >
        <Pressable style={styles.cardContainer} onPress={handleOnPress}>
          <View style={styles.leftContainer}>
            <Component icon={icon} render={left} />
          </View>
          <View style={styles.textContainer}>
            {title && <Text color="text">{title}</Text>}
            {text && (
              <Text color="text" numberOfLines={1}>
                {text}
              </Text>
            )}
          </View>
          <View style={styles.rightContainer}>
            <Component render={right} />
          </View>
          {onActionPress ? (
            <Icon
              icon="arrow"
              width={16}
              height={16}
              fill="primary"
              rotate={90}
            />
          ) : null}
        </Pressable>
        {collapsable && CollapsedContent ? (
          <Collapsible collapsed={collapsed} enablePointerEvents>
            <CollapsedContent />
          </Collapsible>
        ) : null}
        {divider && <View style={styles.divider(theme)} />}
      </View>
    </View>
  );
};
export default Card;
