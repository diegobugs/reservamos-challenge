import { Button, Card, Icon, Lottie } from "@atoms";
import { Searchbar } from "@molecules";
import { MainStackParamList } from "@navigator";
import { useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { placesActions, RootStoreType } from "@store";
import { PlaceType, PlacesResponse, ThemeType } from "@utils";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";

import { styles } from "./styles";

interface AddLocationScreenProps {
  navigation: NativeStackNavigationProp<MainStackParamList, "AddLocation">;
}

const AddLocationScreen = ({ navigation }: AddLocationScreenProps) => {
  const theme = useTheme() as ThemeType;
  const [text, setText] = useState("");
  const [searchText] = useDebounce(text, 250);
  const [places, setPlaces] = useState<PlacesResponse>([]);
  const reduxSelected = useSelector(
    (state: RootStoreType) => state.places.selected
  );
  const [selectedPlaces, setSelectedPlaces] = useState<PlacesResponse>([]);
  const dispatch = useDispatch();

  const onSearchChange = (q: string) => {
    setText(q);
  };

  useEffect(() => {
    if (searchText) {
      handleSearch();
    } else {
      setPlaces([]);
    }
  }, [searchText]);

  const handleSearch = async () => {
    try {
      setPlaces([]);
      const response = await fetch(
        `https://search.reservamos.mx/api/v2/places?q=${searchText}`
      );
      if (response.ok) {
        const data: PlacesResponse = await response.json();
        const cities = data.filter((place) => place.result_type === "city");
        if (cities.length > 0) {
          setPlaces([
            ...cities.filter(
              (current) =>
                !reduxSelected.find(
                  (reduxPlace) => reduxPlace.id === current.id
                )
            ),
          ]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlacePress = (place: PlaceType) => {
    if (isSelected(place.id)) {
      setSelectedPlaces((prev) => [
        ...prev.filter((current) => current.id !== place.id),
      ]);
    } else {
      setSelectedPlaces((prev) => [...prev, { ...place }]);
    }
  };

  const isSelected = (id: PlaceType["id"]) => {
    return selectedPlaces.find((p) => p.id === id);
  };

  const addSelectedPlaces = () => {
    dispatch(placesActions.addPlaces(selectedPlaces));
    navigation.goBack();
  };

  const renderItem = ({ item }: { item: PlaceType }) => {
    return (
      <Card
        key={item.id}
        icon="location"
        title={"CIUDAD"}
        text={`${item.city_name}, ${item.state}`}
        right={
          <Icon
            icon="check"
            style={{ width: 16, height: 16 }}
            fill={isSelected(item.id) ? "success" : "disabled"}
          />
        }
        onActionPress={() => handlePlacePress(item)}
        disableActionIcon
      />
    );
  };

  return (
    <SafeAreaView style={styles.container(theme)} edges={["bottom"]}>
      <View style={styles.fullContent(theme)}>
        <Searchbar onSearch={onSearchChange} placeholder={"Buscar destinos"} />
        <View style={styles.content}>
          {places.length > 0 ? (
            <FlatList data={places} renderItem={renderItem} scrollEnabled />
          ) : (
            <Lottie autoPlay lottie="bus" loop style={styles.lottie} />
          )}
        </View>
        {selectedPlaces.length > 0 ? (
          <Button onPress={addSelectedPlaces}>Añadir</Button>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default AddLocationScreen;
