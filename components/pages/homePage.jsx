import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { auth, db, storage } from "../../firebaseconfig";
import { Stack } from "expo-router";
import { ref, getDownloadURL } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
import { COLORS } from "../../constants";
import Icon from "react-native-vector-icons/FontAwesome";
import HomeSelectSection from "./commonPage/homeSelectSection";
import HomeCards from "./commonPage/homeCards";

const HomePage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const defaultProfileImage = require("../../assets/defaultProfileImage.jpg");

  const [profilePictureURI, setProfilePictureURI] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
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
    <View style={{ flex: 1, backgroundColor: COLORS.gray2 }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.gray2 },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                overflow: "hidden",
                borderRadius: 10,
                marginLeft: 16,
              }}
              onPress={() => navigation.navigate("ProfilePage")}
            >
              <View
                style={{
                  backgroundColor: "#888888",
                  position: "absolute",
                  height: 40,
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#bbbbbb",
                    top: 4,
                    height: 13,
                    width: 13,
                    borderRadius: 50,
                  }}
                ></View>
                <View
                  style={{
                    backgroundColor: "#bbbbbb",
                    top: 4,
                    marginTop: 1,
                    height: 20,
                    width: 25,
                    borderTopLeftRadius: 100, // Radius for top left corner
                    borderTopRightRadius: 100,
                  }}
                ></View>
              </View>
              <Image
                style={{ height: 40, width: 40 }}
                source={{ uri: profilePictureURI }} // Use profile picture URI from global state
              />
            </TouchableOpacity>
          ),

          headerRight: () => (
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                overflow: "hidden",
                borderRadius: 10,
                marginRight: 16,
              }}
            >
              <Icon name="gear" size={40} color={COLORS.primary} />
            </TouchableOpacity>
          ),

          headerTitle: "",
        }}
      />
      <ScrollView>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <View
            style={{
              width: "93%",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <TextInput
              style={{
                backgroundColor: COLORS.white,
                height: 50,
                width: "100%",
                borderRadius: 10,
                paddingHorizontal: 45,
              }}
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                paddingLeft: 10,
              }}
            >
              <Icon name="search" size={25} color={COLORS.gray} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <HomeSelectSection />
          <HomeCards />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomePage;
