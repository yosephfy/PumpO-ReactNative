import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { dimensions, theme } from "../core/theme";
import ProfilePicture from "./ProfilePicture";
import Icon from "./icons/Icon";

export default function BottomNav() {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabs}>
        <Icon
          type="Octicons"
          name="home"
          size={28}
          style={styles.image}
          onClick={() => router.navigate("(HOME)")}
        />
        <Icon
          type="Ionicons"
          name="search"
          size={28}
          style={styles.image}
          onClick={() => router.navigate("(HOME)")}
        />
        <Icon
          type="Ionicons"
          name="add-circle-outline"
          size={28}
          style={styles.image}
          onClick={() => router.navigate("(HOME)")}
        />
        <Icon
          type="MaterialCommunityIcons"
          name="play-box-multiple-outline"
          size={28}
          style={styles.image}
          onClick={() => router.navigate("(HOME)")}
        />

        <TouchableOpacity
          style={styles.image}
          onPress={() => router.navigate("(HOME)/profile")}
        >
          <ProfilePicture user={currentUser} size={30} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: theme.colors.background,
    height: dimensions.bottomNavHeight,
    position: "absolute",
    bottom: 100,
    width: "100%",
  },
  tabs: { flexDirection: "row", justifyContent: "space-around", top: 10 },
});
