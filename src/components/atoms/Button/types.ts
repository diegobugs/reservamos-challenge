import { PressableProps, StyleProp, TextStyle, ViewStyle } from "react-native";

export type ButtonProps = PressableProps & {
  /** Texto o nodo a ser renderizado en el boton */
  // DEPRECATED borrar si no crea poblemas en la app
  // children: string | React.ReactNode;
  /** Desactiva los estilos del boton disabled. Es posible agregar estilos propios cuando el boton esta deshabilitado.
   * En principio se creo esta propiedad para que el IconButton no tenga un estilo raro al estar deshabilitado */
  disableDisabledStyle?: boolean;
  disableSafeTouch?: boolean;
  disableShadow?: boolean;
  /** Ocupar todo el ancho posible */
  fullWidth?: boolean;
  startIcon?: React.ReactElement;
  shadowStyle?: StyleProp<ViewStyle>;
  /** Estilos para el texto del boton */
  TextStyle?: TextStyle;
  /** Variante del boton
   * @default contained
   */
  variant?: "contained" | "text";
};
