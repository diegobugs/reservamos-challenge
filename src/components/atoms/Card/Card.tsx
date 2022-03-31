import React, { FunctionComponent, useState } from "react";
import { Pressable, View, ViewProps } from "react-native";

import { ThemeType } from "@utils";
import { styles } from "./styles";
import { Icon, Text } from "@atoms";
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
  /**
   * Define si la tarjeta tiene bordes
   */
  borders?: boolean;
  /**
   * Define si la tarjeta tiene contenido collapsable o desplegable
   */
  collapsable?: boolean;
  CollapsedContent?: FunctionComponent;
  collapsableInitialState?: boolean;
  /**
   * Define si las tarjetas tienen un indicador de divisor
   */
  divider?: boolean;
  /**
   * Deshabilita el icono de acción
   */
  disableActionIcon?: boolean;
  /**
   * Habilita la funcionalidad de desplazar la tarjeta en pantalla
   */
  draggable?: boolean;
  /**
   * Define el icono a mostrar en el inicio de la tarjeta
   */
  icon?: IconsList;
  /**
   * Funcion a ejecutarse al presionar la tarjeta
   */
  onActionPress?: () => void;
  /**
   * Funcion a ejecutarse si se desplaza a la zona de useDeleteIndicator
   */
  onDragDelete?: () => void;
  /**
   * Componente a mostrar en la parte izquierda
   */
  left?: string | JSX.Element;
  /**
   * Componente a mostrar en la parte derecha
   */
  right?: string | JSX.Element;
  /**
   * Habilita sombras a la tarjeta
   */
  shadow?: boolean;
  /**
   * Texto principal de la tarjeta
   */
  text?: string;
  /**
   * Texto de titulo en la parte superior
   */
  title?: string;
};

type ComponentProps = {
  icon?: IconsList;
  render?: string | JSX.Element;
};

/**
 * Constante para definir el área válida para eliminar un elemento
 */
const HITSLOP_DELETE = 60;

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

  /**
   * Funcion que analiza si el numoer X está en el rango de min y max
   * Se utiliza esta función para verificar el área de toque para eliminar
   *
   * @param x
   * @param min
   * @param max
   * @returns
   */
  const numberInRange = (x: number, min: number, max: number) => {
    "worklet";
    return x >= min && x <= max;
  };

  /**
   * Controlador de deslizar las tarjetas
   */
  const panGesture = Gesture.Pan()
    .onStart(() => {
      /**
       * Si tiene la funcionalidad de deslizar
       */
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
      /**
       * Si tiene la funcionalidad de deslizar
       */
      if (draggable) {
        cardTranslateX.value = event.translationX + cardContext.value.x;
        cardTranslateY.value = event.translationY + cardContext.value.y;

        /**
         * Se verifica que el desplazamiento esté dentro del área de eliminar para activar el icono
         */
        if (
          numberInRange(
            event.absoluteX,
            DELETE_INDICATOR_X - HITSLOP_DELETE,
            DELETE_INDICATOR_X + HITSLOP_DELETE
          ) &&
          numberInRange(
            event.absoluteY,
            DELETE_INDICATOR_Y - HITSLOP_DELETE,
            DELETE_INDICATOR_Y + HITSLOP_DELETE
          )
        ) {
          // Si el area está dentro del los parametros el icono se vuelve en un color activo
          runOnJS(activeDeleteIndicator)();
        } else {
          // Si el area no está dentro de los parametros el icono se vuelve en su estado normal
          runOnJS(showDeleteIndicator)();
        }
      }
    })
    .onEnd((event) => {
      /**
       * Si tiene la funcionalidad de deslizar
       */
      if (draggable) {
        // Se esconde el icono de eliminar
        runOnJS(hideDeleteIndicator)();
        // Se informa que no se está deslizando la tarjeta
        isDragging.value = false;
        if (
          numberInRange(
            event.absoluteX,
            DELETE_INDICATOR_X - HITSLOP_DELETE,
            DELETE_INDICATOR_X + HITSLOP_DELETE
          ) &&
          numberInRange(
            event.absoluteY,
            DELETE_INDICATOR_Y - HITSLOP_DELETE,
            DELETE_INDICATOR_Y + HITSLOP_DELETE
          )
        ) {
          // Se ejecuta en el hilo de JS la funcion de eliminar un elemento
          if (typeof onDragDelete === "function") {
            runOnJS(onDragDelete)();
          }
        } else {
          cardTranslateX.value = 0;
          cardTranslateY.value = 0;
        }
      }
    });

  /**
   * Controlador de mantener presionado un elemento
   * Esto se utiliza para que RN obtenga la exclusividad de un gesto u otro
   * De lo contrario en Android siempre se ejecuta panGesture y se desactivan todos los demas
   * Esto hace que no funcione correctamente el ScrollView
   */
  const longPressGesture = Gesture.Tap();

  panGesture.config = {
    minDist: 60,
  };
  longPressGesture.config = {
    minDurationMs: 100,
    maxDist: 60,
  };

  // Se combinan los controladores y se da exclusividad solamente a uno cuando ocurran sus parametros de config
  const combinedGestures = Gesture.Exclusive(longPressGesture, panGesture);

  /*
   * Estilo animado para mover las tarjetas en pantalla
   */
  const dStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: cardTranslateX.value },
        { translateY: cardTranslateY.value },
      ],
      opacity: isDragging.value ? 0.8 : 1,
    };
  });

  /**
   * Controlador al presionar una tarjeta
   * Si es collapsable, se muestra el contenido de este
   */
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
    <GestureDetector gesture={combinedGestures}>
      <Animated.View style={dStyle} needsOffscreenAlphaCompositing>
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
            <Collapsible collapsed={collapsed}>
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
