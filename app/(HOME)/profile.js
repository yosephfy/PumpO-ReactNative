import { useGlobalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView, Text } from "react-native";
import ProfilePage from "../../src/components/profile/ProfilePage";
import BottomNav from "../../src/components/BottomNav";

export default function profile() {
  const { userId } = useGlobalSearchParams();
  return (
    <>
      <SafeAreaView style={{ height: "auto" }}>
        <ProfilePage id={userId} />
      </SafeAreaView>
    </>
  );
}
