import { useGlobalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView, Text } from "react-native";
import ProfilePage from "../../src/components/profile/ProfilePage";

export default function profile() {
  const { userId } = useGlobalSearchParams();
  return (
    <SafeAreaView>
      <ProfilePage id={userId} />
    </SafeAreaView>
  );
}
