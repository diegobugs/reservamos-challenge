import { Card, Lottie } from "@atoms";
import { Header, WeatherCard } from "@molecules";
import { MainStackParamList } from "@navigator";
import { useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStoreType } from "@store";
import {
  CustomWeatherType,
  PlaceType,
  ThemeType,
  WeatherResponse,
} from "@utils";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { styles } from "./styles";

import { OW_URL, OW_API_KEY } from "@env";

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<MainStackParamList, "Home">;
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const theme = useTheme() as ThemeType;
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

  const renderItem = ({ item, index }: { item: PlaceType; index: number }) => {
    const weather = placeWeather.find((place) => place && place.id === item.id);

    return (
      <Card
        key={item.id}
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
          <ScrollView horizontal>
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
          </ScrollView>
        )}
      />
    );
  };

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
          {selectedPlaces.length > 0 ? (
            <FlatList
              data={selectedPlaces}
              renderItem={renderItem}
              contentContainerStyle={{
                paddingVertical: 16,
                paddingHorizontal: 16,
              }}
            />
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
