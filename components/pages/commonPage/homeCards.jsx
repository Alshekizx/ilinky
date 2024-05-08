import { COLORS } from "../../../constants";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const HomeCards = ({ onPress, imageSource, headText, subText }) => {
  return (
    <View>
      <View style={styles.imgView}>
        <Image
          style={styles.img}
          source={require("../../../assets/images/wizi1.jpg")}
        />
        <View style={styles.detailView}>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: COLORS.secondary,
              }}
            >
              Diamonds
            </Text>
            <Text
              style={{ fontSize: 16, color: COLORS.secondary, opacity: 0.6 }}
            >
              Wizkid
            </Text>
          </View>
          <TouchableOpacity>
            <Icon
              name="angle-double-right"
              size={45}
              color={COLORS.secondary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ratioWidth = 330 / windowWidth;
const ratioHeight = 240 / windowHeight;

const styles = StyleSheet.create({
  img: {
    width: windowWidth * ratioWidth,
    height: windowHeight * ratioHeight,
  },
  imgView: {
    width: windowWidth * ratioWidth,
    height: windowHeight * ratioHeight,
    overflow: "hidden",
    borderRadius: 16,
    marginVertical: 10,
  },
  detailView: {
    backgroundColor: COLORS.lightWhite,
    height: "30%",
    width: "100%",
    position: "absolute",
    bottom: "0%",
    borderRadius: 16,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 25,
  },
});

export default HomeCards;
