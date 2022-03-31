import React, { FunctionComponent, useState } from "react";
import { Dimensions, Pressable, View, ViewProps } from "react-native";

import { ThemeType } from "@utils";
import { styles } from "./styles";
import { DeleteIndicator, Icon, Text } from "@atoms";
import { IconsList } from "../../../assets/icons";
import { useTheme } from "@react-navigation/native";
import Collapsible from "react-native-collapsible";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useDeleteIndicator } from "@hooks";
import { DELETE_INDICATOR_X, DELETE_INDICATOR_Y } from "../DeleteIndicator";

export type CardProps = ViewProps & {
  borders?: boolean;
  collapsable?: boolean;
  CollapsedContent?: FunctionComponent;
  collapsableInitialState?: boolean;
  divider?: boolean;
  disableActionIcon?: boolean;
  draggable?: boolean;
  icon?: IconsList;
  onActionPress?: () => void;
  onDragDelete?: () => void;
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
  collapsableInitialState = false,
  collapsable = false,
  CollapsedContent,
  divider = false,
  draggable = false,
  icon,
  left,
  onActionPress,
  onDragDelete,
  disableActionIcon = false,
  right,
  shadow = false,
  text,
  title,
  ...props
}: CardProps) => {
  const theme = useTheme() as ThemeType;
  const [collapsed, setCollapsed] = useState(collapsableInitialState);
  const cardTranslateX = useSharedValue(0);
  const cardTranslateY = useSharedValue(0);
  const cardContext = useSharedValue({ x: 0, y: 0 });
  const isDragging = useSharedValue(false);
  const { showDeleteIndicator, hideDeleteIndicator, activeDeleteIndicator } =
    useDeleteIndicator();

  const numberInRange = (x: number, min: number, max: number) => {
    "worklet";
    return x >= min && x <= max;
  };

  const gesture = Gesture.Pan()
    .onStart(() => {
      if (draggable) {
        cardContext.value = {
          x: cardTranslateX.value,
          y: cardTranslateY.value,
        };
        isDragging.value = true;
        runOnJS(showDeleteIndicator)();
      }
    })
    .onUpdate((event) => {
      if (draggable) {
        cardTranslateX.value = event.translationX + cardContext.value.x;
        cardTranslateY.value = event.translationY + cardContext.value.y;

        if (
          numberInRange(
            event.absoluteX,
            DELETE_INDICATOR_X - 20,
            DELETE_INDICATOR_X + 20
          ) &&
          numberInRange(
            event.absoluteY,
            DELETE_INDICATOR_Y - 20,
            DELETE_INDICATOR_Y + 20
          )
        ) {
          runOnJS(activeDeleteIndicator)();
        } else {
          runOnJS(showDeleteIndicator)();
        }
      }
    })
    .onEnd((event) => {
      if (draggable) {
        runOnJS(hideDeleteIndicator)();
        isDragging.value = false;
        if (
          numberInRange(
            event.absoluteX,
            DELETE_INDICATOR_X - 20,
            DELETE_INDICATOR_X + 20
          ) &&
          numberInRange(
            event.absoluteY,
            DELETE_INDICATOR_Y - 20,
            DELETE_INDICATOR_Y + 20
          )
        ) {
          if (typeof onDragDelete === "function") {
            runOnJS(onDragDelete)();
          }
        } else {
          cardTranslateX.value = 0;
          cardTranslateY.value = 0;
        }
      }
    });

  const dStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: cardTranslateX.value },
        { translateY: cardTranslateY.value },
      ],
      opacity: isDragging.value ? 0.8 : 1,
    };
  });

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
    <GestureDetector gesture={gesture}>
      <Animated.View style={dStyle}>
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
            {onActionPress && !disableActionIcon ? (
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
      </Animated.View>
    </GestureDetector>
  );
};
export default Card;
