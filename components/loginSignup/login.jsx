import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseconfig"; // Assuming this file contains your Firebase app initialization
import { Alert } from "react-native";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Switch,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../constants";
import { Stack, useRouter } from "expo-router";

const Login = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleSwitch = () => {
    setIsSwitchOn((previousState) => !previousState);
  };

  const handleLogin = async () => {
    try {
      setLoading(true);

      // Authenticate user with email and password
      await signInWithEmailAndPassword(auth, email, password);

      // Navigate to the Home page
      navigation.navigate("MainStack");
    } catch (error) {
      Alert.alert(
        "Login failed",
        error.message || "Login failed. Please try again."
      );
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
        <Stack.Screen options={{ headerShown: false }} />
        <View>
          <Image
            style={{
              position: "absolute",
              top: 300,
              left: -150,
              width: 500,
              height: 540,
              opacity: 0.3,
            }}
            source={require("../../assets/images/tree.png")}
          />
        </View>
        <ScrollView>
          <View
            style={{ width: "100%", alignItems: "center", marginBottom: 100 }}
          >
            <View>
              <Text
                style={{ color: COLORS.white, fontSize: 35, marginTop: 100 }}
              >
                Login
              </Text>
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
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
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
                placeholder="Enter password"
                secureTextEntry={!showPassword}
                onChangeText={(text) => setPassword(text)}
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "80%",
                position: "relative",
                left: -5,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Switch
                  value={isSwitchOn}
                  onValueChange={toggleSwitch}
                  thumbColor={isSwitchOn ? COLORS.green : COLORS.gray2}
                />
                <Text style={{ color: COLORS.white }}>Remember me</Text>
              </View>
              <TouchableOpacity>
                <Text
                  style={{
                    color: COLORS.gray2,
                    textDecorationLine: "underline",
                  }}
                >
                  forgot password?
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20 }}>
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
                onPress={handleLogin}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: COLORS.white,
                  }}
                >
                  Login
                </Text>
              </TouchableOpacity>
              {loading && (
                <ActivityIndicator size="large" color={COLORS.white} />
              )}
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
                Or Login With
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
                Don't have an account yet!
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text style={{ color: COLORS.green, paddingLeft: 5 }}>
                  Signup
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Login;
