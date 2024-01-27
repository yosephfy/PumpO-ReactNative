import React from "react";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from "react-native";

export default function BackButton({ goBack }) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={goBack}>
        <Image
          style={styles.image}
          source={require("../../assets/arrow_back.png")}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10 + StatusBar.currentHeight,
    left: 0,
  },
  image: {
    width: 24,
    height: 24,
  },
});
