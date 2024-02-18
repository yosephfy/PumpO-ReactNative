import { Entypo } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../core/theme";
import ProfilePicture from "../ProfilePicture";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../../axios";
import { apiCalls } from "../../utility/Enums";
import { router } from "expo-router";
import { AuthContext } from "../../context/AuthContext";
import Icon from "../icons/Icon";

export default function SingleComment({ comment, reply, onReplyFunc }) {
  const { currentUser } = useContext(AuthContext);
  const [expandComment, setExpandSubcomment] = useState(false);
  const [subcommentCurrViewSize, setSubcommentCurrViewSize] = useState(3);
  const [liked, setLiked] = useState(false);
  const [numOfLikes, setNumOfLikes] = useState(0);
  const [change, setChange] = useState(false);
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

  const onToggleLike = (action) => {
    setLiked(action);
    if (action) {
      makeRequest
        .post(apiCalls().like.add.comment, {
          userId: currentUser.id,
          commentId: comment.id,
        })
        .then((res) => {
          console.log(`liked comment ${comment.id}`);
          setChange((prev) => !prev);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      makeRequest
        .delete(apiCalls(comment.id).like.delete.comment, {
          userId: currentUser.id,
          commentId: comment.id,
        })
        .then((res) => {
          console.log(`unliked comment ${comment.id}`);
          setChange((prev) => !prev);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    makeRequest
      .get(apiCalls(comment.id).like.get.fromComment)
      .then((res) => {
        setLiked(res.data.some((d) => d["userId"] === currentUser.id));
        setNumOfLikes(res.data.length || 0);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [change]);

  return (
    <View style={styles.container}>
      <View style={styles.commentsContainer}>
        <View>
          <ProfilePicture user={comment} size={30} />
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
              {!reply && data && data.length !== 0 && (
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
        {/* <TouchableOpacity
          style={styles.likeBtn}
          onPress={() => onToggleLike(!liked)}
        >
          {liked ? (
            <Entypo name="heart" size={20} color="black" />
          ) : (
            <Entypo name="heart-outlined" size={20} color="black" />
          )}
        </TouchableOpacity> */}
        <Icon
          type="Entypo"
          name={liked ? "heart" : "heart-outlined"}
          size={20}
          style={styles.likeBtn}
          onClick={() => {
            onToggleLike(!liked);
          }}
          query={{
            func: makeRequest
              .get(apiCalls(comment.id).like.get.fromComment)
              .then((res) => res.data.length || 0)
              .catch((err) => console.warn(`Couldn't find comment likes`)),
            key: ["numcommentlikes", comment.id],
          }}
          showText
        />
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
    backgroundColor: theme.colors.background,
    overflow: "hidden",
    display: "flex",
    justifyContent: "space-between",
  },
  commentsContainer: {
    flexDirection: "row",
    display: "flex",
    padding: 10,
    gap: 10,
    alignItems: "flex-start",
    position: "relative",
  },
  textContainer: { marginRight: 60, width: "auto", overflow: "hidden" },
  text: { fontSize: 13, width: "auto" },
  replyUsername: {
    color: theme.colors.secondary,
    fontWeight: "600",
    marginBottom: 5,
    width: "100%",
  },
  likeBtn: { position: "absolute", right: 15, top: 5 },
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
