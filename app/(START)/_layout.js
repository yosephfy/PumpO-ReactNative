import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useNavigation } from "@react-navigation/native";

export default function Layout() {
  const { navigate } = useNavigation();
  return (
    <Stack
      initialRouteName="StartScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="LoginScreen" />
      <Stack.Screen name="RegisterScreen" />
      <Stack.Screen name="ResetPasswordScreen" />
      <Stack.Screen name="StartScreen" />
    </Stack>
  );
}
