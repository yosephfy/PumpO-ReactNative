import { View, SafeAreaView, Text, Button } from "react-native";
import React, { useContext } from "react";
import { useRouter } from "expo-router";
import { AuthContext } from "../../src/context/AuthContext";
import HomeTopNav from "../../src/components/topnavs/HomeTopNav";
import FeedContainer from "../../src/components/feed/FeedContainer";

export default function index() {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <HomeTopNav />
      <SafeAreaView>
        <FeedContainer domain={["user", "followed"]} />
      </SafeAreaView>
    </>
  );
}
