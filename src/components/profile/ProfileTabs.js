import { ScrollView, View, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import { Tab, Text, TabView } from "@rneui/themed";
import FeedContainer from "../feed/FeedContainer";

export default function ProfileTabs() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  return (
    <>
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
          title="cart"
          titleStyle={{ fontSize: 12, color: "black" }}
          id={2}
        />
      </Tab>
      <View style={{ height: 500 }}>
        <TabView value={index} onChange={setIndex} animationType="spring">
          <TabView.Item style={{ width: "100%", height: "100%" }}>
            <FeedContainer domain={["user"]} />
          </TabView.Item>
          <TabView.Item style={{ width: "100%", height: "100%" }}>
            <FeedContainer domain={["liked"]} />
          </TabView.Item>
          <TabView.Item style={{ width: "100%", height: "100%" }}>
            <Text>Cart</Text>
          </TabView.Item>
        </TabView>
      </View>
    </>
  );
}

const FirstRoute = () => {
  const layout = useWindowDimensions();

  return (
    <ScrollView
      style={{
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <Text>YOOOO</Text>
    </ScrollView>
  );
};

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);
