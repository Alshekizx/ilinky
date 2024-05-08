import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../../../constants";
import AppNavigator from "../../navigation/appNavigation";
import HomePage from "../homePage";
import AnnaliticsPage from "../annaliticsPage";
import ProfilePage from "../profilePage";
import { useNavigation } from "@react-navigation/native";

const BottomNav = ({ homeColor, analyticColor, ProfileColor }) => {
  const navigation = useNavigation();
  const handleHomePress = () => {
    navigation.navigate("HomePage");
  };
  const handleAnalyticPress = () => {
    navigation.navigate("AnnaliticsPage");
  };
  const handleProfilePress = () => {
    navigation.navigate("ProfilePage");
  };
  return (
    <View
      style={{
        width: "100%",
        height: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: COLORS.gray2,
        position: "absolute",
        bottom: "0%",
        elevation: 5,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}
    >
      <TouchableOpacity onPress={handleHomePress}>
        <Icon name="home" size={25} color={homeColor} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon
          name="analytics"
          onPress={handleAnalyticPress}
          size={25}
          color={analyticColor}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon
          name="person"
          onPress={handleProfilePress}
          size={25}
          color={ProfileColor}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNav;
