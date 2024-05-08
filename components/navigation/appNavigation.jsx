import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import {
  Intro,
  Welcome,
  Login,
  Signup,
  HomePage,
  AnnaliticsPage,
  ProfilePage,
  UploadPage,
  DisplayPage,
  ProfilePageEdit,
} from "../indexComponent.jsx";
import { COLORS } from "../../constants/theme.js";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppBottomNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomePage"
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: COLORS.gray2, borderWidth: 0 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomePage") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "AnnaliticsPage") {
            iconName = focused ? "analytics" : "analytics-outline";
          } else if (route.name === "ProfilePage") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: () => null, // Hides the tab labels
      })}
      tabBarOptions={{
        activeTintColor: COLORS.primary,
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="HomePage" component={HomePage} />
      <Tab.Screen name="AnnaliticsPage" component={AnnaliticsPage} />
      <Tab.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Intro">
      <Stack.Screen
        name="Intro"
        component={Intro}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="AppBottomNav">
      <Stack.Screen
        name="AppBottomNav"
        component={AppBottomNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="UploadPage" component={UploadPage} />
      <Stack.Screen name="DisplayPage" component={DisplayPage} />
      <Stack.Screen name="ProfilePageEdit" component={ProfilePageEdit} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="AuthStack"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainStack"
          component={MainStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
