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

const SinglesAlbum = ({ songGroup }) => {
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        backgroundColor: COLORS.primary,
        margin: 10,
        borderRadius: 10,
      }}
    >
      <Text style={{ color: COLORS.white }}>{songGroup}</Text>
    </TouchableOpacity>
  );
};

export default SinglesAlbum;
