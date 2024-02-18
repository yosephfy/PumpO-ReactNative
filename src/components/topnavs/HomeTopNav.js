import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { theme } from "../../core/theme";
import Header from "../Header";
import Icon from "../icons/Icon";

export default function HomeTopNav() {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => router.navigate("/")}
      >
        <Header>PumpO</Header>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => router.navigate("(HOME)/messages")}
      >
        <Ionicons name="chatbubbles-outline" size={24} color="black" />
      </TouchableOpacity> */}
      <Icon
        type="Ionicons"
        name="chatbubbles-outline"
        size={24}
        color="black"
        onClick={() => router.navigate("(HOME)/messages")}
        style={styles.button}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.colors.background,
    top: 0,
    height: 100,
    justifyContent: "space-between",
  },
  button: {
    justifyContent: "center",
    alignContent: "center",
    marginRight: 10,
  },
  header: {
    justifyContent: "center",
    alignContent: "center",
    marginLeft: 10,
  },
});
