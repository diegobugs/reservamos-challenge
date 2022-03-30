/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from "react";
import { Platform, StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "@navigator";
import { Theme } from "@utils";
import { Provider } from "react-redux";
import { store, persistor } from "@store";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  useEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor(Theme.colors.secondary);
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar hidden={false} barStyle="light-content" />
        <NavigationContainer theme={Theme}>
          <MainNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
