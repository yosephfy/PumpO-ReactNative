import { View, SafeAreaView, Text, Button } from "react-native";
import React, { useContext, useState } from "react";
import { useRouter } from "expo-router";
import { AuthContext } from "../../src/context/AuthContext";
import HomeTopNav from "../../src/components/topnavs/HomeTopNav";
import FeedContainer from "../../src/components/feed/FeedContainer";
import Modal from "../../src/components/modal/Modal";
import CommentModal from "../../src/components/comment/CommentModal";
import BottomNav from "../../src/components/BottomNav";

export default function index() {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const [openComment, setOpenComment] = useState(false);
  const [post, setPost] = useState({ id: 1 });

  const onOpenComment = (post) => (toggle) => {
    setOpenComment(toggle);
    if (toggle) {
      setPost(post);
    }
  };

  return (
    <>
      <HomeTopNav />
      <SafeAreaView>
        <BottomNav />
        <FeedContainer domain={["user", "followed"]} />
      </SafeAreaView>
    </>
  );
}
