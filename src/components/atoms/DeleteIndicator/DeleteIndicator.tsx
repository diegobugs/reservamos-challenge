import React, { useContext } from "react";
import { Dimensions, Text, View } from "react-native";

import { styles } from "./styles";
import { Icon } from "@atoms";
import { DeleteIndicatorContext } from "@hooks";

export const DELETE_INDICATOR_X = Dimensions.get("window").width / 2;
export const DELETE_INDICATOR_Y = Dimensions.get("window").height - 84;
export const DELETE_INDICATOR_WIDTH = 32;
export const DELETE_INDICATOR_HEIGHT = 32;

const DeleteIndicator = () => {
  const { state } = useContext(DeleteIndicatorContext);

  if (state === "hidden") {
    return null;
  }

  return (
    <View
      style={styles.indicator(
        DELETE_INDICATOR_X,
        DELETE_INDICATOR_Y,
        DELETE_INDICATOR_WIDTH,
        DELETE_INDICATOR_HEIGHT
      )}
    >
      <Icon
        icon="delete"
        style={styles.icon}
        width={32}
        height={32}
        fill={state === "visible" ? "disabled" : "rejected"}
      />
    </View>
  );
};

export default DeleteIndicator;
