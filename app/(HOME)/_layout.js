import { Stack } from "expo-router";
import React from "react";
import BottomNav from "../../src/components/BottomNav";
import Modal from "../../src/components/modal/Modal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CommentModal from "../../src/components/comment/CommentModal";
import CommentInput from "../../src/components/comment/CommentInput";

export default function Layout() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="profile" />
        </Stack>
      </GestureHandlerRootView>
    </>
  );
}
