import { Card, Lottie } from "@atoms";
import { Header, WeatherCard } from "@molecules";
import { MainStackParamList } from "@navigator";
import { useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { placesActions, RootStoreType } from "@store";
import {
  CustomWeatherType,
  PlaceType,
  ThemeType,
  WeatherResponse,
} from "@utils";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "./styles";

import { OW_URL, OW_API_KEY } from "@env";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<MainStackParamList, "Home">;
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const theme = useTheme() as ThemeType;
  const dispatch = useDispatch();
  const selectedPlaces = useSelector(
    (store: RootStoreType) => store.places.selected
  );
  const [placeWeather, setPlaceWeather] = useState<
    Array<CustomWeatherType | undefined>
  >([]);

  useEffect(() => {
    if (selectedPlaces.length > 0) {
      fetchDataAsync();
    }
  }, [selectedPlaces]);

  const fetchDataAsync = async () => {
    const requests = selectedPlaces.map((place) => fetchWeatherData(place));
    const allResponse = await Promise.all(requests);
    setPlaceWeather(allResponse);
  };

  const fetchWeatherData = async (place: PlaceType) => {
    try {
      const response = await fetch(
        `${OW_URL}?lat=${place.lat}&lon=${place.long}&exclude=minutely,hourly,alerts&units=metric&lang=es&appid=${OW_API_KEY}`
      );
      if (response.ok) {
        const data: WeatherResponse = await response.json();

        const currentTemp = Math.round(data.current.temp);
        const daily = [
          ...data.daily.map((day) => {
            return {
              temp: {
                max: Math.round(day.temp.max),
                min: Math.round(day.temp.min),
              },
              weather: {
                ...day.weather[0],
              },
            };
          }),
        ];
        return {
          id: place.id,
          currentTemp: currentTemp,
          daily: daily,
        };
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removePlace = (id: PlaceType["id"]) => {
    dispatch(placesActions.removePlace(id));
  };

  const renderItem = ({ item, index }: { item: PlaceType; index: number }) => {
    const weather = placeWeather.find((place) => place && place.id === item.id);
    return (
      <Card
        key={item.id}
        draggable
        onDragDelete={() => removePlace(item.id)}
        borders
        icon="location"
        title="CIUDAD"
        text={`${item.city_name}, ${item.state}`}
        right={
          weather ? (
            `${weather.currentTemp}º`
          ) : (
            <Lottie loop lottie="skeleton" style={{ height: 18 }} />
          )
        }
        style={{ marginBottom: 8 }}
        shadow
        collapsable
        collapsableInitialState={index !== 0 || typeof weather === "undefined"}
        CollapsedContent={() => (
          <Animated.ScrollView horizontal>
            {[0, 1, 2, 3, 4, 5, 6].map((a) => {
              const daily = weather?.daily[a];

              return (
                <WeatherCard
                  key={a}
                  date={moment().add(a, "day").toDate()}
                  max={daily?.temp.max}
                  min={daily?.temp.min}
                  webIcon={daily?.weather.icon}
                />
              );
            })}
          </Animated.ScrollView>
        )}
      />
    );
  };

  return (
    <GestureHandlerRootView style={StyleSheet.absoluteFill}>
      <SafeAreaView style={styles.container(theme)} edges={["top"]}>
        <Header navigation={navigation} />
        <View style={[styles.flex, styles.background(theme)]}>
          <View style={styles.flex}>
            <Lottie lottie="empty" loop style={styles.opacity} />
            {selectedPlaces.length > 0 ? (
              <Animated.FlatList
                data={selectedPlaces}
                renderItem={renderItem}
                contentContainerStyle={styles.flatListContainer}
              />
            ) : null}
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
