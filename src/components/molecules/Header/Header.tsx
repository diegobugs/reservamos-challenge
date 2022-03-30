import { View, Image, Pressable } from "react-native";
import React from "react";
import { Icon } from "@atoms";
import { styles } from "./styles";
import { useTheme } from "@react-navigation/native";
import { ThemeType } from "@utils";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "@navigator";

type HeaderProps = {
  navigation: NativeStackNavigationProp<MainStackParamList, "Home">;
};

const Header = ({ navigation }: HeaderProps) => {
  const theme = useTheme() as ThemeType;

  const handleAddPress = () => {
    navigation.navigate("AddLocation");
  };

  return (
    <View style={styles.header(theme)}>
      <View style={styles.left}>
        <Image
          source={require("@assets/img/reservamos-logo-w.png")}
          width={100}
          height={100}
          style={{ width: 160, height: 40 }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.right}>
        <Pressable onPress={handleAddPress}>
          <Icon icon="plus" width={20} height={20} fill={"secondaryContrast"} />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;
