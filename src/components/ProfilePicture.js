import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import backupPic from "../../assets/logo.png";
import { theme } from "../core/theme";

export default function ProfilePicture({ picture, size }) {
  const [finalPic, setFinalPic] = useState();
  useEffect(() => {
    if (picture) setFinalPic(picture);
    else setFinalPic(backupPic);
  }, [picture]);
  return (
    <View style={styles.container}>
      <Image
        style={[styles.image, { width: size ? size : 30 }]}
        src={finalPic}
      />
    </View>
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
