import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { theme } from "../../core/theme";
import Interactions from "./Interactions";
import CommentContainer from "./CommentContainer";
import ProfilePicture from "../ProfilePicture";

export default function PostImage({ feed }) {
  const [viewCaption, setViewCaption] = useState(false);
  const [openComment, setOpenComment] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ProfilePicture picture={feed.profilePic} size={32} />
          <Text style={styles.title}>
            @{feed.username}
            {" • "}
            <Text
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: theme.colors.backdrop,
              }}
            >
              {"1 min"}
            </Text>
          </Text>
        </View>

        <View name="share" style={styles.topBtns}>
          {false ? (
            <Ionicons name="star" size={20} color="black" />
          ) : (
            <Ionicons name="star-outline" size={20} color="black" />
          )}
          <Ionicons name="arrow-redo-outline" size={20} color="black" />
        </View>
      </View>
      <View style={styles.middle}>
        <Image src={feed.img} style={styles.media} />
      </View>
      <View style={styles.bottomBtns}>
        <View style={styles.interactions}>
          {false ? (
            <Entypo name="heart" size={24} color="black" />
          ) : (
            <Entypo name="heart-outlined" size={24} color="black" />
          )}
          <Text style={styles.interactionNumbers}>{15}</Text>
        </View>
        <TouchableOpacity onPress={() => setOpenComment((prev) => !prev)}>
          <View name="comment" style={styles.interactions}>
            <Ionicons name="chatbubble-outline" size={24} color="black" />
            <Text style={styles.interactionNumbers}>{23}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomCaption}>
        <Text
          textBreakStrategy="balanced"
          numberOfLines={viewCaption ? null : 1}
          style={styles.caption}
          onPress={() => setViewCaption((prev) => !prev)}
        >
          {feed.desc}
        </Text>
      </View>
      <View>{openComment && <CommentContainer post={feed} />}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    minHeight: 250,
    flexDirection: "column",
    backgroundColor: theme.colors.background,
  },
  title: { fontSize: 15, marginLeft: 5, color: theme.colors.text },
  topBtns: {
    marginRight: 15,
    width: 60,
    justifyContent: "space-between",
    flexDirection: "row",
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
    backgroundColor: theme.colors.backdrop,
    overflow: "hidden",
    borderTopWidth: 0.4,
    borderBottomWidth: 0.4,
    borderColor: theme.colors.onBackground,
  },
  media: { height: "auto", aspectRatio: 1 },
  bottomBtns: {
    flexDirection: "row",
    paddingVertical: 10,
    marginHorizontal: 15,
  },
  bottomCaption: {},
  caption: {
    marginHorizontal: 7,
    marginBottom: 10,
  },
  interactions: {
    width: 50,
    height: 30,
    flexDirection: "row",
    alignItems: "baseline",
  },
  interactionNumbers: {
    fontSize: 12,
    fontWeight: "300",
    alignSelf: "flex-end",
    marginLeft: 1,
  },
});
