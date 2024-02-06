import { Ionicons, Entypo } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { makeRequest } from "../../../axios";
import { AuthContext } from "../../context/AuthContext";
import { theme } from "../../core/theme";
import { apiCalls } from "../../utility/Enums";
import ProfilePicture from "../ProfilePicture";
import SingleComment from "./SingleComment";
import { router } from "expo-router";

export default function CommentContainer({ post, onPostComment }) {
  const { currentUser } = useContext(AuthContext);
  const [commentInput, setCommentInput] = useState();
  const [commentPlaceholder, setCommentPlaceholder] = useState(`Add a comment`);
  const [isReplying, setIsReplying] = useState(0);
  const writeBoxRef = useRef();

  const { error, isLoading, data, refetch } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () =>
      makeRequest.get(apiCalls(post.id).comment.get.fromPost).then((res) => {
        return res.data;
      }),
  });

  const AddReply = (replyUsername = null, replyCommentId = 0) => {
    setCommentPlaceholder(`You are replying to ${replyUsername}`);
    setIsReplying(replyCommentId);
  };

  return (
    <>
      <View style={styles.writeCommentContainer}>
        <ProfilePicture user={currentUser} size={28} />
        <TextInput
          ref={writeBoxRef}
          id="commentInput"
          style={styles.input}
          numberOfLines={3}
          multiline
          textBreakStrategy="balanced"
          placeholder={commentPlaceholder}
          onChangeText={(newText) => setCommentInput(newText)}
        />
        {isReplying != 0 && (
          <TouchableOpacity
            style={styles.clearBtn}
            onPress={() => {
              setIsReplying(false);
              setCommentPlaceholder(`Add a comment`);
            }}
          >
            <Entypo name="cross" size={24} color={theme.colors.error} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.sendBtn}
          onPress={() => {
            onPostComment(commentInput, isReplying, refetch);
            writeBoxRef.current.clear();
          }}
        >
          <Ionicons name="paper-plane-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        {error ? (
          <Text>Something went wrong..</Text>
        ) : isLoading ? (
          <Text>Loading...</Text>
        ) : (
          data.map((comment) => (
            <SingleComment
              key={comment.id}
              comment={comment}
              onReplyFunc={AddReply}
            />
          ))
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    maxHeight: 400,
    marginBottom: 20,
  },
  writeCommentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginVertical: 10,
    gap: 10,
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceDisabled,
  },
  input: {
    backgroundColor: theme.colors.surface,
    flex: 1,
    minHeight: 40,
    borderRadius: 30,
    paddingLeft: 25,
    paddingRight: 50,
    paddingTop: 10,
    paddingBottom: 10,
    overflow: "hidden",
    textAlign: "left",
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  userProfilePic: {
    width: 25,
    height: 25,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  sendBtn: {
    position: "absolute",
    right: 17,
  },
  clearBtn: {
    position: "absolute",
    right: 50,
  },
});
