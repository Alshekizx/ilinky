import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS } from "../../constants";
import Icon from "react-native-vector-icons/FontAwesome";
import UploadTextInput from "./commonPage/uploadTextInput";
import { useRoute, useNavigation } from "@react-navigation/native";
import ProfilePage from "./profilePage";
import { db, storage, auth } from "../../firebaseconfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { useProfilePictureURI } from "./commonPage/ProfilePictureContext";

const UploadPage = () => {
  const route = useRoute(); // Use useRoute to access the route object
  const navigation = useNavigation(); // Use useNavigation to get the navigation object
  const { imageURI } = route.params || {};
  const [userName, setUserName] = useState("");
  const defaultProfileImage = require("../../assets/defaultProfileImage.jpg");
  const [profilePictureURI, setProfilePictureURI] = useState(null);
  const handleProfilePress = () => {
    navigation.navigate("ProfilePage");
  };
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
              onPress={handleProfilePress}
            >
              <Icon name="angle-left" size={40} color={COLORS.primary} />
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
              <Icon name="upload" size={40} color={COLORS.primary} />
            </TouchableOpacity>
          ),

          headerTitle: "",
        }}
      />
      <ScrollView>
        <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
          <View style={{ width: 150, height: 150, borderRadius: 20 }}>
            <Image
              style={{ width: 150, height: 150, borderRadius: 20 }}
              source={require("../../assets/images/alkizx4.png")}
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 10, bottom: 10 }}
            >
              <Icon
                name="pencil"
                size={30}
                color={COLORS.white}
                opacity={0.5}
              />
            </TouchableOpacity>
          </View>
          <View style={{ top: 85, marginLeft: 15 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  color: COLORS.secondary,
                }}
              >
                Music Name
              </Text>
              <TouchableOpacity>
                <Icon
                  name="pencil"
                  size={20}
                  color={COLORS.secondary}
                  opacity={0.5}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 20, color: COLORS.secondary }}
                opacity={0.5}
              >
                {userName}
              </Text>
              <View
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 50,
                  marginLeft: 5,
                  overflow: "hidden",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#888888",
                    position: "absolute",
                    height: 30,
                    width: 30,
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
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 50,
                    marginLeft: 5,
                    position: "absolute",
                  }}
                  source={{ uri: profilePictureURI }}
                />
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            margin: 10,
          }}
        >
          <View
            style={{
              height: 40,
              width: 90,
              backgroundColor: COLORS.primary,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 16 }}>
              Enter Links
            </Text>
          </View>
          <UploadTextInput iconName="spotify" placeholderName="Spotify Link" />
          <UploadTextInput iconName="music" placeholderName="Music Link" />
          <UploadTextInput iconName="youtube" placeholderName="Youtube Link" />
          <UploadTextInput
            iconName="soundcloud"
            placeholderName="soundcloud Link"
          />
          <UploadTextInput
            iconName="headphones"
            placeholderName="AudioMack Link"
          />
          <UploadTextInput iconName="headphones" placeholderName="Beatstars" />
          <TouchableOpacity
            style={{
              fontSize: 16,
              backgroundColor: COLORS.primary,
              height: 40,
              width: 60,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 16 }}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default UploadPage;
