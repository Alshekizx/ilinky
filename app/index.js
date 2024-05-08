// Index Component
import React from "react";
import AppNavigator from "../components/navigation/appNavigation.jsx";
import AppBottomNav from "../components/navigation/appBottomNav.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { ProfilePictureProvider } from "../components/pages/commonPage/ProfilePictureContext.jsx";
import { ProfilePageEdit } from "../components/indexComponent.jsx.js";
import PopupWithIcons from "./testEsp.jsx";

function Index() {
  return (
    <ProfilePictureProvider style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ flex: 1 }}>
        <AppNavigator />
      </View>
    </ProfilePictureProvider>
  );
}

export default Index;
