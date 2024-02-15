import React from "react";
import { SafeAreaView, ScrollView, Text, useAnimatedValue } from "react-native";
import Modal from "../modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../../axios";
import { apiCalls } from "../../utility/Enums";
import SingleComment from "../feed/SingleComment";
import CommentInput from "./CommentInput";

export default function CommentModal({
  post,
  AddReply,
  onPostComment,
  onOpenComment,
}) {
  return (
    <>
      <Modal onClose={onOpenComment}>
        <CommentContainer post={post} />
      </Modal>
      <CommentInput />
    </>
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
    <SafeAreaView style={{}}>
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
