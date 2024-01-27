import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import BottomNav from "../../src/components/BottomNav";

export default function Layout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="profile" />
      </Stack>
      <BottomNav />
    </>
  );
}
