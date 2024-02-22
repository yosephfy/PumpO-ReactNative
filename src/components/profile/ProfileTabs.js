import { ScrollView, View, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import { Tab, Text, TabView } from "@rneui/themed";
import FeedContainer from "../feed/FeedContainer";

export default function ProfileTabs() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  return (
    <View style={{ height: "100%" }}>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        style={{ backgroundColor: "white" }}
      >
        <Tab.Item
          title="Posts"
          titleStyle={{ fontSize: 12, color: "black" }}
          id={0}
        />
        <Tab.Item
          title="Liked"
          titleStyle={{ fontSize: 12, color: "black" }}
          id={1}
        />
        <Tab.Item
          title="Followed"
          titleStyle={{ fontSize: 12, color: "black" }}
          id={2}
        />
      </Tab>
      {/* <TabView
        value={index}
        onChange={setIndex}
        animationType="spring"
        containerStyle={{ height: "auto", width: "auto" }}
      >
        <TabView.Item style={{ width: "100%", height: "auto" }}>
          <FeedContainer domain={["user"]} />
        </TabView.Item>
        <TabView.Item style={{ width: "100%", height: "100%" }}>
          <FeedContainer domain={["liked"]} />
        </TabView.Item>
        <TabView.Item style={{ width: "100%", height: "100%" }}>
          <Text>Cart</Text>
        </TabView.Item>
      </TabView> */}
      {index == 0 ? (
        <FeedContainer domain={["user"]} />
      ) : index == 1 ? (
        <FeedContainer domain={["liked"]} />
      ) : (
        <FeedContainer domain={["followed"]} />
      )}
    </View>
  );
}
