import React, { useState, useEffect } from "react";
import { updateEmail, updateProfile } from "firebase/auth";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  FlatList,
  ActivityIndicator,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { COLORS } from "../../constants";
import Icon from "react-native-vector-icons/FontAwesome";
import UploadTextInput from "./commonPage/uploadTextInput";
import { useRoute, useNavigation } from "@react-navigation/native";
import ProfilePage from "./profilePage";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import * as ImagePicker from "expo-image-picker";
import { collection, addDoc } from "firebase/firestore";
import { Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../../firebaseconfig";
import { AntDesign } from "@expo/vector-icons";
import { useProfilePictureURI } from "./commonPage/ProfilePictureContext";
import { doc, getDoc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";

const ProfilePageEdit = () => {
  const route = useRoute();
  const { params } = route;
  const defaultImageURI = require("../../assets/defaultProfileImage.jpg");
  const imageURI = params ? params.imageURI : null;
  const navigation = useNavigation();

  const [profilePictureURI, setProfilePictureURI] = useState(null);

  const handleProfilePress = () => {
    navigation.navigate("ProfilePage");
  };
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleProfileEditUpdate = async () => {
    try {
      setLoading(true);

      const user = auth.currentUser;
      if (user) {
        // Update user's email in Authentication
        await updateEmail(user, email);

        // Update user's displayName in Authentication
        await updateProfile(user, {
          displayName: userName,
        });

        const userDocRef = doc(db, "signupInfo", user.email);
        await setDoc(
          userDocRef,
          {
            userName: userName,
            email: email,
          },
          { merge: true }
        );

        // Set success message or navigate to another screen
        Alert.alert("Success", "Profile updated successfully");
        navigation.navigate("ProfilePage");
      } else {
        // No user is signed in.
        Alert.alert("Error", "No user is signed in");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
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

          // Set email from Authentication
          setEmail(user.email);

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

  const [modalVisible, setModalVisible] = useState(false);

  const [image, setImage] = useState(null);
  const pickImage = async () => {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (result.cancelled) {
        // User canceled the image selection
        return;
      }

      const selectedImageURI = result.uri;

      // Convert the URI to a Blob
      const response = await fetch(selectedImageURI);
      const blob = await response.blob();

      // Specify the MIME type based on the file extension (e.g., 'image/jpeg' for JPEG images)
      const metadata = {
        contentType: "image/jpeg", // Adjust the MIME type according to the image format
      };

      // Upload the file to Firebase Storage with the specified MIME type
      const storageRef = ref(
        storage,
        `/ProfilePicture/${email}/profilePicture.jpg`
      );
      await uploadBytesResumable(storageRef, blob, metadata);

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(storageRef);

      // Update profile picture URI in global state
      setProfilePictureURI(downloadURL);
      navigation.navigate("ProfilePageEdit", {
        imageURI: downloadURL,
      });
    } catch (error) {
      console.error("Error picking image and uploading:", error);
      // Handle error
      Alert.alert(
        "Error",
        "Failed to pick image and upload. Please try again."
      );
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.gray2 }}>
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

          headerTitle: "",
        }}
      />
      <ScrollView>
        <View
          style={{
            flexDirection: "column",
            marginHorizontal: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              borderRadius: 50,
              marginTop: 30,
              alignItems: "center",
              justifyContent: "center",
              width: 250,
              height: 250,
              borderRadius: 200,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                backgroundColor: "#888888",
                position: "absolute",
                height: 330,
                width: "100%",

                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <View
                style={{
                  backgroundColor: "#bbbbbb",
                  position: "relative",
                  top: 60,
                  height: 90,
                  width: 90,
                  borderRadius: 50,
                }}
              ></View>
              <View
                style={{
                  backgroundColor: "#bbbbbb",
                  position: "relative",
                  top: 60,
                  marginTop: 10,
                  height: 130,
                  width: 160,
                  borderTopLeftRadius: 100, // Radius for top left corner
                  borderTopRightRadius: 100,
                }}
              ></View>
            </View>
            <Image
              style={{ width: 250, height: 250, borderRadius: 200 }}
              source={{ uri: profilePictureURI }}
            />

            <TouchableOpacity
              style={{
                position: "absolute",
              }}
              onPress={() => setModalVisible(true)}
            >
              <Icon
                name="camera"
                size={50}
                color={COLORS.primary}
                opacity={0.8}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ marginTop: 50 }}>
              <Text style={{ color: COLORS.primary }}>User name</Text>
              <TextInput
                style={{
                  width: 300,
                  height: 50,
                  backgroundColor: COLORS.lightWhite,
                  borderRadius: 10,
                  paddingHorizontal: 25,
                  marginTop: 5,
                }}
                value={userName}
                onChangeText={(text) => setUserName(text)}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{ color: COLORS.primary }}>Email</Text>
              <View
                style={{
                  width: 300,
                  height: 50,
                  backgroundColor: COLORS.lightWhite,
                  borderRadius: 10,
                  paddingHorizontal: 25,
                  marginTop: 5,
                  justifyContent: "center",
                }}
              >
                <Text>{email}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                width: 200,
                height: 50,
                backgroundColor: COLORS.primary,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 50,
              }}
              onPress={handleProfileEditUpdate}
              disabled={loading}
              accessible={true}
              accessibilityLabel="Signup Button"
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: COLORS.white,
                }}
              >
                Update
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View
            style={{
              flex: 1,

              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                padding: 25,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: 250,
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    /* Handle option 1 */
                  }}
                >
                  <AntDesign name="camera" size={30} color={COLORS.primary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={pickImage}>
                  <AntDesign name="picture" size={30} color={COLORS.primary} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    /* Handle option 3 */
                  }}
                >
                  <AntDesign name="delete" size={30} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={{ marginTop: 25, color: COLORS.primary }}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePageEdit;
