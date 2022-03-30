import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddLocationScreen, HomeScreen } from "@screens";
import { useTheme } from "@react-navigation/native";
import { ThemeType } from "@utils";

export type MainStackParamList = {
  Home: undefined;
  AddLocation: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  const theme = useTheme() as ThemeType;
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.secondary },
        headerTintColor: theme.colors.secondaryContrast,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddLocation"
        component={AddLocationScreen}
        options={{ title: "Destinos" }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
