import { View, Pressable, Image } from "react-native";
import React, { useCallback } from "react";
import { styles } from "./styles";
import { useTheme } from "@react-navigation/native";
import { getTempColor, ThemeType } from "@utils";
import { Text } from "@atoms";
import moment from "moment";

export type WeatherCardProps = {
  date: Date;
  max: number;
  min: number;
  weather: string;
};

// Configuracion de moment para días en formato deseado
moment.updateLocale("es", {
  calendar: {
    sameDay: "[hoy]",
    nextDay: "[mañana]",
    nextWeek: "dddd",
    sameElse: (m) => {
      return `[${moment(m).format("dddd")}]`;
    },
  },
});

const WeatherCard = ({ date, max, min, weather }: WeatherCardProps) => {
  const theme = useTheme() as ThemeType;

  const isToday = (date: Date) => {
    return moment().startOf("day").isSame(moment(date).startOf("day"));
  };

  return (
    <View style={styles.card(theme, isToday(date))}>
      <View style={styles.header(theme, isToday(date))}>
        <Text color={isToday(date) ? "primaryContrast" : "text"}>
          {moment(date).calendar()}
        </Text>
        <Text
          color={isToday(date) ? "primaryContrast" : "text"}
          style={styles.dateText}
        >
          {moment(date).format("D/MM")}
        </Text>
      </View>
      <View style={styles.tempContainer}>
        <Text style={styles.tempText(theme, getTempColor(max))}>{max}º</Text>
        <View style={styles.divider(theme)} />
        <Text style={styles.tempText(theme, getTempColor(min))}>{min}º</Text>
      </View>
    </View>
  );
};

export default WeatherCard;
