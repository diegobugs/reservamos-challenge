import { Card, Lottie, Text } from "@atoms";
import { Header, WeatherCard } from "@molecules";
import { MainStackParamList } from "@navigator";
import { useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemeType } from "@utils";
import moment from "moment";
import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
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
        <View style={{ flex: 1, paddingHorizontal: 16 }}>
          <Lottie lottie="empty" loop style={{ opacity: 0.5 }} />
          <Card
            borders
            icon="location"
            title="CIUDAD"
            text="Juarez, Juarez"
            right={"24º"}
            style={{ marginBottom: 8 }}
            shadow
            collapsable
            CollapsedContent={() => (
              <ScrollView horizontal>
                {[0, 1, 2, 3, 4, 5, 6].map((a, index) => {
                  return (
                    <WeatherCard
                      key={index}
                      date={moment().add(a, "day").toDate()}
                      max={22}
                      min={16}
                      weather={"rainy"}
                    />
                  );
                })}
              </ScrollView>
            )}
          />
          <Card
            borders
            icon="location"
            title="CIUDAD"
            text="Ciudad de México, México Federal"
            right={"36º"}
            style={{ marginBottom: 8 }}
            shadow
          />
          <Card
            borders
            icon="location"
            title="CIUDAD"
            text="Nuevo Mexico, México"
            right={"38º"}
            style={{ marginBottom: 8 }}
            shadow
          />
          <Card
            borders
            icon="location"
            title="CIUDAD"
            text="Ciudad de México, México Federal"
            right={"41º"}
            style={{ marginBottom: 8 }}
            shadow
          />
          <Card
            borders
            icon="location"
            title="CIUDAD"
            text="Ciudad de México, México Federal"
            right={"18º"}
            style={{ marginBottom: 8 }}
            shadow
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
