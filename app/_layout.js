import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { AuthContextProvider } from "../src/context/AuthContext";

export default function Layout() {
  return (
    <AuthContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(HOME)" />
        <Stack.Screen name="(START)" />
      </Stack>
    </AuthContextProvider>
  );
}
