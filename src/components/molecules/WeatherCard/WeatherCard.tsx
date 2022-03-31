import { View, Image } from "react-native";
import React from "react";
import { styles } from "./styles";
import { useTheme } from "@react-navigation/native";
import { getTempColor, ThemeType } from "@utils";
import { Lottie, Text } from "@atoms";
import moment from "moment";
import { OW_IMG_URL } from "@env";

export type WeatherCardProps = {
  date: Date;
  max?: number;
  min?: number;
  webIcon?: string;
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

const WeatherCard = ({ date, max, min, webIcon }: WeatherCardProps) => {
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
        {max ? (
          <Text style={styles.tempText(theme, getTempColor(max))}>{max}º</Text>
        ) : (
          <Lottie loop lottie="skeleton" style={styles.skeleton} />
        )}
        <View style={styles.divider(theme)} />
        {min ? (
          <Text style={styles.tempText(theme, getTempColor(min))}>{min}º</Text>
        ) : (
          <Lottie loop lottie="skeleton" style={styles.skeleton} />
        )}
      </View>
      {webIcon ? (
        <Image
          source={{
            uri: `${OW_IMG_URL}/${webIcon}@2x.png`,
          }}
          resizeMode="contain"
          style={styles.image}
        />
      ) : null}
    </View>
  );
};

export default WeatherCard;
