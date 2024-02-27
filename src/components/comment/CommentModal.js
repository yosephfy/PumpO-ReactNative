import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  useWindowDimensions,
} from "react-native";
import { makeRequest } from "../../../axios";
import { apiCalls } from "../../utility/Enums";
import Modal from "../modal/Modal";
import CommentInput from "./CommentInput";
import SingleComment from "./SingleComment";

export default function CommentModal({ post, onPostComment, onOpenComment }) {
  const [replyTo, setReplyTo] = useState(0);
  const [commentPlaceholder, setCommentPlaceholder] = useState("Add a comment");
  const dim = useWindowDimensions();

  const AddReply = (replyUsername = null, replyCommentId = 0) => {
    setCommentPlaceholder(`You are replying to ${replyUsername}`);
    setReplyTo(replyCommentId);
  };
  return (
    <KeyboardAvoidingView
      style={{
        height: dim.height,
        width: "100%",
        position: "absolute",
        zIndex: 100,
      }}
      behavior="position"
      keyboardVerticalOffset={-80}
      contentContainerStyle={{
        height: dim.height,
        width: "100%",
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
    </KeyboardAvoidingView>
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
        <ScrollView style={{ marginBottom: 300 }}>
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
