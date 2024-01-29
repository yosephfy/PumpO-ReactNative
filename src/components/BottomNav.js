import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { dimensions, theme } from "../core/theme";

export default function BottomNav() {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.navigate("(HOME)")}>
        <Octicons name="home" size={26} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.navigate("(HOME)")}>
        <Ionicons name="search" size={26} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.navigate("(HOME)")}>
        <Ionicons name="add-circle-outline" size={26} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.navigate("(HOME)")}>
        <MaterialCommunityIcons
          name="play-box-multiple-outline"
          size={26}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.navigate("(HOME)/profile")}>
        <Image
          style={[
            styles.image,
            {
              borderRadius: 1000,
              borderColor: theme.colors.primary,
              borderWidth: 2,
            },
          ]}
          src={currentUser.profilePic}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.colors.background,
    bottom: 0,
    height: dimensions.bottomNavHeight,
    justifyContent: "space-around",
  },
  image: {
    top: 10,
    width: 30,
    height: 30,
  },
});
