import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  useAnimatedValue,
} from "react-native";
import Modal from "../modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../../axios";
import { apiCalls } from "../../utility/Enums";
import SingleComment from "../feed/SingleComment";
import CommentInput from "./CommentInput";

export default function CommentModal({ post, onPostComment, onOpenComment }) {
  const [replyTo, setReplyTo] = useState(0);
  const [commentPlaceholder, setCommentPlaceholder] = useState("Add a comment");

  const AddReply = (replyUsername = null, replyCommentId = 0) => {
    setCommentPlaceholder(`You are replying to ${replyUsername}`);
    setReplyTo(replyCommentId);
  };
  return (
    <View
      style={{
        bottom: 0,
        flex: 1,
        height: "100%",
        width: "100%",
        position: "absolute",
        zIndex: 100,
      }}
    >
      <Modal onClose={onOpenComment(false)}>
        <CommentContainer post={post} AddReply={AddReply} />
      </Modal>
      <CommentInput
        post={post}
        replyToComment={replyTo}
        onComment={onPostComment}
        placeholder={commentPlaceholder}
      />
    </View>
  );
}

const CommentContainer = ({ post, AddReply }) => {
  const { error, isLoading, data, refetch } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () =>
      makeRequest.get(apiCalls(post.id).comment.get.fromPost).then((res) => {
        return res.data;
      }),
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {error ? (
        <Text>HELLLO</Text>
      ) : isLoading ? (
        <Text>HELLLO</Text>
      ) : (
        <ScrollView style={{ marginBottom: 200 }}>
          {data.map((comment) => (
            <SingleComment
              key={comment.id}
              comment={comment}
              onReplyFunc={AddReply}
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
