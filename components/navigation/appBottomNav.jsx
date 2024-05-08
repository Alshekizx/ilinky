// AppBottomNav Component
import React from "react";
import { HomePage, AnnaliticsPage, ProfilePage } from "../indexComponent.jsx";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const AppBottomNav = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="HomePage" component={HomePage} />
        <Tab.Screen name="AnnaliticsPage" component={AnnaliticsPage} />
        <Tab.Screen
          name="ProfilePage"
          component={ProfilePage}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppBottomNav;
