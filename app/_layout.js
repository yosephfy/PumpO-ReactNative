import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { AuthContextProvider } from "../src/context/AuthContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export default function Layout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(HOME)" />
          <Stack.Screen name="(START)" />
        </Stack>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
