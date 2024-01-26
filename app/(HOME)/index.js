import { View, SafeAreaView, Text, Button } from "react-native";
import React, { useContext } from "react";
import { useRouter } from "expo-router";
import { AuthContext } from "../../src/context/AuthContext";

export default function index() {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  return (
    <SafeAreaView>
      <Text>HOME</Text>
      <Text>{JSON.stringify(currentUser)}</Text>
      <Button title="BUTTON" onPress={() => router.push("/(HOME)/profile")} />
    </SafeAreaView>
  );
}
