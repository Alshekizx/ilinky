import React, { useState, useEffect } from "react";

import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  SafeAreaView,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Stack } from "expo-router";
import { COLORS } from "../../constants";
import Icon from "react-native-vector-icons/FontAwesome";
import SinglesAlbum from "./commonPage/singlesAlbum";
import ProfilePageCard from "./commonPage/profilePageCard";
import BottomNav from "./commonPage/bottomNav";
import { useNavigation } from "@react-navigation/native";
import UploadPage from "./uploadPage";
import * as ImagePicker from "expo-image-picker";
import { db, storage, auth } from "../../firebaseconfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { useProfilePictureURI } from "./commonPage/ProfilePictureContext";

const ProfilePage = () => {
  const route = useRoute();
  const { imageURI } = route.params || {};

  const defaultProfileImage = require("../../assets/defaultProfileImage.jpg");

  const navigation = useNavigation();
  const [profilePictureURI, setProfilePictureURI] = useState(null);
  const handleUploadPress = () => {
    navigation.navigate("UploadPage");
  };
  const handleProfileEdit = () => {
    navigation.navigate("ProfilePageEdit");
  };
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
          const storageRef = ref(
            storage,
            `/ProfilePicture/${user.email}/profilePicture.jpg`
          );
          const url = await getDownloadURL(storageRef);
          setProfilePictureURI(url);
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
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.gray2 }}>
      <ScrollView>
        <View>
          <View
            style={{
              backgroundColor: "#888888",
              position: "absolute",
              height: 330,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <View
              style={{
                backgroundColor: "#bbbbbb",

                height: 100,
                width: 100,
                borderRadius: 50,
              }}
            ></View>
            <View
              style={{
                backgroundColor: "#bbbbbb",
                marginTop: 10,
                height: 150,
                width: 170,
                borderTopLeftRadius: 100, // Radius for top left corner
                borderTopRightRadius: 100,
              }}
            ></View>
          </View>
          <Image
            source={{ uri: profilePictureURI }}
            style={{ position: "absolute", height: 330, width: "100%" }}
          />

          <TouchableOpacity>
            <Icon
              name="gear"
              size={40}
              color={COLORS.white}
              style={{ position: "absolute", right: "0%", margin: 10 }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            margin: 10,
            bottom: -230,
          }}
        >
          <Text style={{ color: COLORS.white, fontSize: 30 }}>{userName}</Text>
          <TouchableOpacity onPress={handleProfileEdit}>
            <Icon name="pencil" size={30} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.gray2,
            marginTop: 230,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",

              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <SinglesAlbum songGroup="Singles" />
            <SinglesAlbum songGroup="Album" />
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <ProfilePageCard
              albumPhoto={require("../../assets/images/alkizx4.png")}
              songName="First Song"
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          height: 50,
          width: 50,
          backgroundColor: COLORS.primary,
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: "7%",
          right: "7%",
        }}
        onPress={handleUploadPress}
      >
        <Icon name="plus" size={40} color={COLORS.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfilePage;
