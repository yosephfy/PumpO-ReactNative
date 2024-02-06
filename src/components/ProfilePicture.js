import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import backupPic from "../../assets/logo.png";
import { theme } from "../core/theme";
import { router } from "expo-router";

export default function ProfilePicture({ user, size }) {
  const { profilePic, userId, id } = user;
  const [finalPic, setFinalPic] = useState();
  useEffect(() => {
    if (profilePic) setFinalPic(profilePic);
    else setFinalPic(backupPic);
  }, [profilePic]);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        router.push({
          pathname: "(HOME)/profile",
          params: { userId: userId ? userId : id },
        });
      }}
    >
      <Image
        style={[styles.image, { width: size ? size : 30 }]}
        src={finalPic}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 30,
    aspectRatio: 1,
    borderRadius: 1000,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    marginHorizontal: 5,
  },
});
