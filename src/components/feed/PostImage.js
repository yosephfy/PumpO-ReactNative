import { Entypo, Ionicons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { makeRequest } from "../../../axios";
import { AuthContext } from "../../context/AuthContext";
import { theme } from "../../core/theme";
import { apiCalls } from "../../utility/Enums";
import { WhatTimeAgo } from "../../utility/utility";
import ProfilePicture from "../ProfilePicture";
import CommentContainer from "./CommentContainer";
import { router } from "expo-router";

export default function PostImage({ feed, onOpenComment }) {
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [change, setChange] = useState();
  const [viewCaption, setViewCaption] = useState(false);
  const [openComment, setOpenComment] = useState(false);

  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const [numOfComments, setNumOfComments] = useState(0);
  const [numOfLikes, setNumOfLikes] = useState(0);

  // Likes
  useEffect(() => {
    makeRequest
      .get(apiCalls(feed.id).like.get.fromPost)
      .then((res) => {
        setLiked(res.data.some((d) => d["userId"] === currentUser.id));
        setNumOfLikes(res.data.length || 0);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [change]);

  // Comments
  useEffect(() => {
    makeRequest
      .get(apiCalls(feed.id).comment.get.fromPost)
      .then((res) => {
        setNumOfComments(res.data.length || 0);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [change]);

  const onToggleLike = (action) => {
    setLiked(action);
    if (action) {
      makeRequest
        .post(apiCalls().like.add.post, {
          userId: currentUser.id,
          postId: feed.id,
        })
        .then((res) => {
          console.log(`liked post ${feed.id}`);
          setChange((prev) => !prev);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      makeRequest
        .delete(apiCalls(feed.id).like.delete.post, {
          userId: currentUser.id,
          postId: feed.id,
        })
        .then((res) => {
          console.log(`unliked post ${feed.id}`);
          setChange((prev) => !prev);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const onPostComment = (
    comment = "",
    isReply = 0,
    refetchFunction = () => {}
  ) => {
    if (!comment.trim()) return;

    if (isReply == 0) {
      makeRequest
        .post(apiCalls().comment.add.post, {
          elementType: "POST",
          postId: feed.id,
          desc: comment,
        })
        .then(() => {
          setNumOfComments((prev) => prev + 1);
          setChange((prev) => !prev);
          refetchFunction();
          queryClient.refetchQueries({ queryKey: ["subcomments"] });
        })
        .catch((err) => {
          console.error("Error sending message:", err);
        });
    } else {
      makeRequest
        .post(apiCalls().comment.add.comment, {
          elementType: "COMMENT",
          commentId: isReply,
          desc: comment,
        })
        .then(() => {
          refetchFunction();
          setNumOfComments((prev) => prev + 1);
          setChange((prev) => !prev);
          queryClient.refetchQueries({
            queryKey: ["subcomments"],
          });
        })
        .catch((err) => {
          console.error("Error sending message:", err);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ProfilePicture user={feed} size={32} />
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
              {WhatTimeAgo(feed.createdAt).short}
            </Text>
          </Text>
        </View>

        <View name="share" style={styles.topBtns}>
          {favorited ? (
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
        <TouchableOpacity onPress={() => onToggleLike(!liked)}>
          <View style={styles.interactions}>
            {liked ? (
              <Entypo name="heart" size={24} color="black" />
            ) : (
              <Entypo name="heart-outlined" size={24} color="black" />
            )}
            <Text style={styles.interactionNumbers}>{numOfLikes}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setOpenComment((prev) => !prev);
            onOpenComment(!openComment);
          }}
        >
          <View name="comment" style={styles.interactions}>
            <Ionicons name="chatbubble-outline" size={24} color="black" />
            <Text style={styles.interactionNumbers}>{numOfComments}</Text>
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
      {/* <View>
        {openComment && (
          <CommentContainer post={feed} onPostComment={onPostComment} />
        )}
      </View> */}
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
