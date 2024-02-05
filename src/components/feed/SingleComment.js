import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../core/theme";
import ProfilePicture from "../ProfilePicture";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../../axios";
import { apiCalls } from "../../utility/Enums";

export default function SingleComment({ comment, reply, onReplyFunc }) {
  const [expandComment, setExpandSubcomment] = useState(false);
  const [subcommentCurrViewSize, setSubcommentCurrViewSize] = useState(3);

  const replyToUsername = () => {
    return reply ? " to @" + reply.username : "";
  };

  const { error, isLoading, data, refetch } = useQuery({
    queryKey: ["subcomments", comment.id],
    queryFn: () =>
      makeRequest
        .get(apiCalls(comment.id).comment.get.fromComment)
        .then((res) => {
          return res.data;
        }),
  });

  const onClickReply = () => {
    onReplyFunc(comment.username, reply ? reply.id : comment.id);
    refetch();
  };

  return (
    <View style={styles.container}>
      <View style={styles.commentsContainer}>
        <View>
          <ProfilePicture picture={comment.profilePic} />
        </View>
        <TouchableOpacity onPress={onClickReply}>
          <View style={styles.textContainer}>
            <Text style={styles.replyUsername}>
              @{comment.username}
              {replyToUsername()}
            </Text>
            <Text style={styles.text}>{comment.desc}</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "flex-start" }}
            >
              {!reply && (
                <TouchableOpacity onPress={() => setExpandSubcomment(true)}>
                  <Text style={styles.commentBtns}>View Replies</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={onClickReply}>
                <Text style={styles.commentBtns}>Reply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.likeBtn}>
          {true ? (
            <Entypo name="heart-outlined" size={20} color="black" />
          ) : (
            <Entypo name="heart" size={20} color="black" />
          )}
        </TouchableOpacity>
      </View>
      {expandComment && (
        <View style={styles.subcomment}>
          {error ? (
            <Text>Something went wrong..</Text>
          ) : isLoading ? (
            <Text>Loading...</Text>
          ) : (
            data
              .slice(0, subcommentCurrViewSize)
              .map((subcomment) => (
                <SingleComment
                  key={subcomment.id}
                  comment={subcomment}
                  reply={comment}
                  onReplyFunc={onReplyFunc}
                />
              ))
          )}
          {data &&
            data.length !== 0 &&
            data.length >= subcommentCurrViewSize && (
              <TouchableOpacity
                onPress={() => setSubcommentCurrViewSize((prev) => prev + 3)}
              >
                <Text style={styles.viewMore}>View More</Text>
              </TouchableOpacity>
            )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: theme.colors.background,
  },
  commentsContainer: {
    flexDirection: "row",
    display: "flex",
    padding: 10,
    gap: 10,
    alignItems: "flex-start",
    position: "relative",
  },
  textContainer: { margin: 0 },
  text: { flexWrap: "wrap", fontSize: 13 },
  replyUsername: {
    color: theme.colors.secondary,
    fontWeight: "600",
    marginBottom: 5,
  },
  likeBtn: { position: "absolute", right: 15, top: 10 },
  commentBtns: {
    color: theme.colors.secondary,
    marginRight: 20,
    marginVertical: 10,
    fontSize: 11,
  },
  subcomment: {
    marginLeft: 30,
  },
  viewMore: {
    left: 50,
    fontSize: 12,
    color: theme.colors.secondary,
    fontWeight: "600",
  },
});
