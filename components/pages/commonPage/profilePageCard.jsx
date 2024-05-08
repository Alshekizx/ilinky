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
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { db, storage, auth } from "../../../firebaseconfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
const ProfilePageCard = ({ albumPhoto, songName }) => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          // Use user's email to construct the document ID
          const docRef = doc(db, "signupInfo", user.email);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserName(userData.userName);
          } else {
            console.log("No such document!");
          }
        } else {
          // No user is signed in.
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        height: 120,
        width: "95%",
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View>
          <Image
            source={albumPhoto}
            style={{
              height: 100,
              width: 100,
              borderRadius: 16,
              marginHorizontal: 10,
            }}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: COLORS.secondary,
            }}
          >
            {songName}
          </Text>
          <Text style={{ fontSize: 16, color: COLORS.secondary }}>
            {userName}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={{ marginHorizontal: 10 }}>
        <Icon name="angle-double-right" size={40} color={COLORS.gray2} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePageCard;
