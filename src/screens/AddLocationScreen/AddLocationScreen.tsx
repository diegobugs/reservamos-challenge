import { Text } from "@atoms";
import { Searchbar } from "@molecules";
import { MainStackParamList } from "@navigator";
import { useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemeType } from "@utils";
import React from "react";
import { View } from "react-native";

import { styles } from "./styles";

interface AddLocationScreenProps {
  navigation: NativeStackNavigationProp<MainStackParamList, "AddLocation">;
}

const AddLocationScreen = ({ navigation }: AddLocationScreenProps) => {
  const theme = useTheme() as ThemeType;

  const handleSearch = (q: string) => {};

  return (
    <View style={styles.container(theme)}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}
      >
        <Searchbar onSearch={handleSearch} />
        <Text>Location App</Text>
      </View>
    </View>
  );
};

export default AddLocationScreen;
