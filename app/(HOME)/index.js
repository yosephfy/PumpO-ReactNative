import { View, SafeAreaView, Text, Button } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function index() {
  const router = useRouter();
  return (
    <SafeAreaView>
      <Text>HOME</Text>
      <Button title="BUTTON" onPress={() => router.push("/(HOME)/profile")} />
    </SafeAreaView>
  );
}
