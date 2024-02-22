import React, { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import CommentModal from "../../src/components/comment/CommentModal";
import FeedContainer from "../../src/components/feed/FeedContainer";
import HomeTopNav from "../../src/components/topnavs/HomeTopNav";
import { dimensions } from "../../src/core/theme";

export default function index() {
  const [currentPost, setCurrentPost] = useState(null);

  const onCommentOp = (post) => (open) => {
    setCurrentPost(open ? post : null);
  };

  return (
    <>
      <HomeTopNav />
      <SafeAreaView>
        <ScrollView
          style={{
            flexDirection: "column",
            marginBottom: dimensions.bottomNavHeight + 70,
            position: "relative",
            zIndex: -10,
          }}
        >
          <FeedContainer
            domain={["user", "followed"]}
            onCommentOp={onCommentOp}
          />
        </ScrollView>
        {currentPost !== null && (
          <CommentModal
            post={currentPost}
            onOpenComment={() => onCommentOp(currentPost)}
          />
        )}
      </SafeAreaView>
    </>
  );
}
