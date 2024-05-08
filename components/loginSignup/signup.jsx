import { collection, addDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { Alert } from "react-native";

import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebaseconfig"; // Assuming this file contains your Firebase app initialization

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { COLORS } from "../../constants";
import { LinearGradient } from "expo-linear-gradient";

const Signup = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignup = async () => {
    try {
      setLoading(true);
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = response.user;
      // Update user profile with name
      await updateProfile(user, { displayName: userName });

      // Store user information in Firestore with email as document ID
      await setDoc(doc(db, "signupInfo", email), {
        userName: userName,
        email: email,
        password: password,
      });

      const userId = user.uid; // Retrieve the user ID (UID) from the user object
      console.log("User ID:", userId);

      navigation.navigate("MainStack", {
        user: { userName, email: user.email },
      });
    } catch (error) {
      setError(error.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={[COLORS.primary, COLORS.gray]} style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",

          position: "relative",
          backgroundColor: "#00000040",
        }}
      >
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <View>
          <Image
            style={{
              position: "absolute",
              top: 200,
              right: -100,
              width: 500,
              height: 540,
              opacity: 0.3,
            }}
            source={require("../../assets/images/tree.png")}
          />
        </View>
        <ScrollView>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginBottom: 100,
            }}
          >
            <View>
              <Text
                style={{ color: COLORS.white, fontSize: 35, marginTop: 20 }}
              >
                Signup
              </Text>
            </View>
            <View style={{ marginTop: 50 }}>
              <Text style={{ color: COLORS.white }}>User name</Text>
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
                placeholder="Enter your user name"
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{ color: COLORS.white }}>Email</Text>
              <TextInput
                style={{
                  width: 300,
                  height: 50,
                  backgroundColor: COLORS.lightWhite,
                  borderRadius: 10,
                  paddingHorizontal: 25,
                  marginTop: 5,
                }}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Enter your email"
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{ color: COLORS.white }}>Password</Text>
              <TextInput
                style={{
                  width: 300,
                  height: 50,
                  backgroundColor: COLORS.lightWhite,
                  borderRadius: 10,
                  paddingHorizontal: 25,
                  marginTop: 5,
                }}
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{
                  padding: 10,
                  position: "absolute",
                  right: 0,
                  top: 27,
                }}
              >
                <Icon
                  name={showPassword ? "eye" : "eye-slash"}
                  size={20}
                  color={COLORS.secondary}
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{ color: COLORS.white }}>Confirm Password</Text>
              <TextInput
                style={{
                  width: 300,
                  height: 50,
                  backgroundColor: COLORS.lightWhite,
                  borderRadius: 10,
                  paddingHorizontal: 25,
                  marginTop: 5,
                }}
                placeholder="Re-enter password"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{
                  padding: 10,
                  position: "absolute",
                  right: 0,
                  top: 27,
                }}
              >
                <Icon
                  name={showPassword ? "eye" : "eye-slash"}
                  size={20}
                  color={COLORS.secondary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 300,
                  height: 50,
                  backgroundColor: COLORS.green,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 30,
                }}
                onPress={handleSignup}
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
                  Signup
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 35,
              }}
            >
              <View
                style={{
                  backgroundColor: COLORS.lightWhite,
                  height: 2,
                  width: "29%",
                  top: 9,
                }}
              ></View>
              <Text
                style={{
                  color: COLORS.white,
                  fontWeight: "bold",
                  marginHorizontal: 10,
                }}
              >
                Or Signup With
              </Text>
              <View
                style={{
                  backgroundColor: COLORS.lightWhite,
                  height: 2,
                  width: "29%",
                  top: 9,
                }}
              ></View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                marginVertical: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  height: 55,
                  width: "26%",
                  backgroundColor: COLORS.secondary,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 10,
                }}
              >
                <Icon name="google" size={30} color={COLORS.white} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 55,
                  width: "26%",
                  backgroundColor: COLORS.secondary,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 10,
                }}
              >
                <Icon name="apple" size={30} color={COLORS.white} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 55,
                  width: "26%",
                  backgroundColor: COLORS.secondary,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 10,
                }}
              >
                <Icon name="facebook" size={30} color={COLORS.white} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Text style={{ color: COLORS.white }}>
                Already have an account!
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={{ color: COLORS.green, paddingLeft: 5 }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Signup;
