import { NavigationContainer } from "@react-navigation/native";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Redirect, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/MaterialIcons";

export default function Page() {
  const router = useRouter();
  return <Redirect href="/(START)" />;
  /* return (
    <SafeAreaView>
      <Text>INDEX</Text>
      <Ionicons name="home" />

      <Button title="BUTTON" onPress={() => router.push("/(LOGIN)")} />
    </SafeAreaView>
  ); */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
