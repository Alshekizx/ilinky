import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS } from "../../../constants";
import Icon from "react-native-vector-icons/FontAwesome";
const UploadTextInput = ({ iconName, placeholderName }) => {
  return (
    <View style={{ marginTop: 15, justifyContent: "center" }}>
      <TextInput
        placeholder={placeholderName}
        style={{
          paddingHorizontal: 50,
          height: 55,
          width: 320,
          backgroundColor: COLORS.white,
          borderWidth: 2,
          borderColor: COLORS.primary,
          borderRadius: 16,
        }}
      />
      <Icon
        name={iconName}
        size={30}
        color={COLORS.primary}
        style={{
          position: "absolute",
          margin: 5,
        }}
      />
    </View>
  );
};

export default UploadTextInput;
