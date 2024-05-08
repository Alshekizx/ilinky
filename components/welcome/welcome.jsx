import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { COLORS, FONT, SIZES, SHADOWS } from "../../constants";
import { LinearGradient } from "expo-linear-gradient";

const Welcome = ({ navigation }) => {
  return (
    <LinearGradient colors={[COLORS.primary, COLORS.gray]} style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: COLORS.primary },
            headerShadowVisible: false,
            headerTitle: "",
          }}
        />
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            top: 50,
          }}
        >
          <Image
            source={require("../../assets/logos/logo3.png")}
            style={{ position: "relative", width: 200, height: 200 }}
          />
          <Text
            style={{
              position: "relative",
              bottom: 40,
              fontSize: 16,
              color: COLORS.white,
            }}
          >
            Get Connected in One Click
          </Text>
          <Text style={{ fontSize: 30, color: COLORS.white, marginTop: 30 }}>
            {" "}
            Welcome{" "}
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: COLORS.lightWhite,
              height: 45,
              width: 250,
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
            }}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: COLORS.primary,
              }}
            >
              Signup
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.green,
              height: 45,
              width: 250,
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 25,
            }}
            onPress={() => navigation.navigate("Login")}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: COLORS.white,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Welcome;
