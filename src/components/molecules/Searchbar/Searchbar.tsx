import { View, Image, Pressable, TextInput } from "react-native";
import React, { useRef } from "react";
import { styles } from "./styles";
import { useTheme } from "@react-navigation/native";
import { ThemeType } from "@utils";
import { Icon } from "@atoms";

export type SearchbarProps = {
  onSearch: (q: string) => void;
};

const Searchbar = ({ onSearch }: SearchbarProps) => {
  const theme = useTheme() as ThemeType;
  let inputRef = useRef<TextInput>().current;

  const handleSearch = (q: string) => {
    if (typeof onSearch === "function") {
      onSearch(q);
    }
  };

  const handleIconPress = () => {
    if (inputRef) {
      inputRef.focus();
    }
  };

  const setRef = (ref: TextInput) => {
    inputRef = ref;
  };

  return (
    <View style={styles.header(theme)}>
      <Pressable onPress={handleIconPress}>
        <Icon icon="search" width={16} height={16} fill={"secondaryContrast"} />
      </Pressable>
      <TextInput
        ref={setRef}
        style={{
          width: "100%",
          height: 60,
          color: theme.colors.secondaryContrast,
        }}
      />
    </View>
  );
};

export default Searchbar;
