import { View, Pressable, TextInput } from "react-native";
import React, { useRef } from "react";
import { styles } from "./styles";
import { useTheme } from "@react-navigation/native";
import { ThemeType } from "@utils";
import { Icon } from "@atoms";

export type SearchbarProps = {
  onSearch: (q: string) => void;
  placeholder: string;
};

const Searchbar = ({ onSearch, placeholder }: SearchbarProps) => {
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
        <Icon
          icon="search"
          width={16}
          height={16}
          style={styles.icon}
          fill={"secondaryContrast"}
        />
      </Pressable>
      <TextInput
        ref={setRef}
        style={styles.textInput(theme)}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.border}
        onChangeText={handleSearch}
      />
    </View>
  );
};

export default Searchbar;
