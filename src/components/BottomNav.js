import React, { useContext } from "react";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from "react-native";
import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { theme } from "../core/theme";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "expo-router";

export default function BottomNav({ goBack }) {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.replace("(HOME)")}>
        <Octicons name="home" size={26} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("(HOME)")}>
        <Ionicons name="search" size={26} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("(HOME)")}>
        <Ionicons name="add-circle-outline" size={26} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("(HOME)")}>
        <MaterialCommunityIcons
          name="play-box-multiple-outline"
          size={26}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("(HOME)/profile")}>
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
    height: 80,
    justifyContent: "space-around",
  },
  image: {
    top: 10,
    width: 30,
    height: 30,
  },
});
