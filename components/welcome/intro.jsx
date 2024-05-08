import { View, Text, Image } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "../../constants";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";

const Intro = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Welcome");
    }, 3000); // Adjust the delay (in milliseconds) as needed

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient colors={[COLORS.primary, COLORS.gray]} style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          flex: 1,
        }}
      >
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: COLORS.primary },
            headerShadowVisible: false,
            headerTitle: "",
          }}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("../../assets/logos/logo3.png")}
            style={{ width: 200, height: 200 }}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Intro;
