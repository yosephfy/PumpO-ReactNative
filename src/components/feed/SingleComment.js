import { Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../core/theme";
import ProfilePicture from "../ProfilePicture";

export default function SingleComment({ comment }) {
  return (
    <View style={styles.container}>
      <View>
        <ProfilePicture picture={comment.profilePic} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{comment.desc}</Text>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <Text style={styles.commentBtns}>View Replies</Text>
          <Text style={styles.commentBtns}>Reply</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.likeBtn}>
        {true ? (
          <Entypo name="heart-outlined" size={20} color="black" />
        ) : (
          <Entypo name="heart" size={20} color="black" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    display: "flex",
    padding: 10,
    gap: 10,
    backgroundColor: "white",
    alignItems: "flex-start",
  },
  textContainer: { margin: 0, width: "85%" },
  text: { flexWrap: "wrap" },
  likeBtn: { position: "absolute", right: 10, top: 10 },
  commentBtns: {
    color: theme.colors.secondary,
    marginRight: 20,
    marginVertical: 10,
    fontSize: 11,
  },
});
