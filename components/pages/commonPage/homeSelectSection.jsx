import { COLORS } from "../../../constants";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState } from "react";

const HomeSelectSection = ({ onPress }) => {
  const texts = ["Latest Release ", "Hiphop", "Afro", "R&B", "AmaPiano"];
  const [selectedName, setSelectedName] = useState(null);
  const handleNamePress = (text) => {
    setSelectedName(text);
  };
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {texts.map((text, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleNamePress(text)}
          style={[
            styles.button,
            selectedName === text && { backgroundColor: COLORS.primary },
          ]}
        >
          <Text
            style={[
              styles.text,
              selectedName === text && { color: COLORS.white },
            ]}
          >
            {text}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 10,
  },
  button: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 5,
    paddingHorizontal: 10,
    backgroundColor: "lightgray",
  },
  text: {
    color: "#000000",
    fontSize: 16,
  },
});

export default HomeSelectSection;
