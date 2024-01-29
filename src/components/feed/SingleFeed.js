import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../core/theme";
import Interactions from "./Interactions";

export default function SingleFeed({ feed }) {
  const [viewCaption, setViewCaption] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image style={[styles.image]} src={feed.profilePic} />
          <Text style={styles.title}>@{feed.username}</Text>
        </View>

        <Ionicons
          name="ellipsis-vertical-outline"
          size={20}
          style={styles.more}
        />
      </View>
      <View style={styles.middle}>
        <Image src={feed.img} style={styles.media} />
      </View>
      <View style={styles.bottom}>
        <Interactions
          interactions={{
            likedByUser: true,
            usersLiked: 9,
            comments: 8,
            saved: false,
          }}
        />
        <Text
          textBreakStrategy="balanced"
          numberOfLines={viewCaption ? null : 1}
          style={styles.caption}
          onPress={() => setViewCaption((prev) => !prev)}
        >
          {feed.desc}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 2,
    minHeight: 250,
    flexDirection: "column",
  },
  title: { fontSize: 15, marginLeft: 5, color: theme.colors.text },
  more: {
    marginRight: 5,
  },
  top: {
    backgroundColor: theme.colors.background,
    display: "flex",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: 30,
    aspectRatio: 1,
    borderRadius: 1000,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    marginHorizontal: 5,
  },
  middle: {
    display: "flex",
    minHeight: 180,
    backgroundColor: "lightgray",
    overflow: "hidden",
    borderTopWidth: 0.4,
    borderBottomWidth: 0.4,
    borderColor: theme.colors.onBackground,
  },
  media: { height: "auto", aspectRatio: 1 },
  bottom: {
    minHeight: 70,
    maxHeight: 100,
    backgroundColor: theme.colors.background,
  },
  caption: {
    marginHorizontal: 7,
    marginBottom: 10,
  },
});
