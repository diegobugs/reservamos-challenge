import { Lottie, Text } from "@atoms";
import { Header } from "@molecules";
import { MainStackParamList } from "@navigator";
import { useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemeType } from "@utils";
import React, { useEffect } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<MainStackParamList, "Home">;
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const theme = useTheme() as ThemeType;

  return (
    <SafeAreaView style={styles.container(theme)} edges={["top"]}>
      <Header navigation={navigation} />
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}
      >
        <View style={{ flex: 1 }}>
          <Lottie lottie="empty" loop style={{ opacity: 0.5 }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
