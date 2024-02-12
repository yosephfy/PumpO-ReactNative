import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import ProfilePicture from "../ProfilePicture";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../../axios";
import { apiCalls } from "../../utility/Enums";
import { Ionicons, Entypo, Octicons } from "@expo/vector-icons";
import { theme } from "../../core/theme";
import ProfileTabs from "./ProfileTabs";
import ProfileInfo from "./ProfileInfo";
import { Tab, TabView } from "@rneui/themed";
import FeedContainer from "../feed/FeedContainer";
import { AuthContext } from "../../context/AuthContext";

export default function ProfilePage({ id }) {
  const [currUser, setUser] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const { error, isLoading, data, refetch } = useQuery({
    queryKey: ["profilepage"],
    queryFn: () =>
      makeRequest
        .get(apiCalls(id).user.get.withId)
        .then((res) => {
          setUser(res.data.id == currentUser.id);
          return res.data;
        })
        .catch((err) => {
          console.error(err);
        }),
  });
  return error ? (
    <Text style={styles.container}>Something went wrong...</Text>
  ) : isLoading ? (
    <Text style={styles.container}>Loading...</Text>
  ) : (
    <ScrollView style={styles.container}>
      <ProfileInfo data={data} isCurrUser={currUser} />
      <ProfileTabs />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { height: "100%" },
  top: { backgroundColor: "white", paddingBottom: 10 },
  bottom: {
    height: "100%",
    backgroundColor: "wheat",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: { alignItems: "center", marginTop: 50, marginBottom: 10 },
  topButtons: {},
  backBtb: { position: "absolute", top: 15, left: 10 },
  notifBtn: { position: "absolute", top: 15, right: 50 },
  moreBtn: { position: "absolute", top: 16, right: 10 },
  desc: { alignItems: "center" },
  username: {
    fontWeight: "500",
    fontSize: 15,
    color: theme.colors.secondary,
    position: "absolute",
    alignSelf: "center",
    top: 16,
  },
  fullname: { fontWeight: "700" },
  bio: { marginTop: 10, color: theme.colors.secondary },
  profileInfos: {
    flexDirection: "row",
    justifyContent: "center",
  },
  profileInfosItem: { width: 80, alignItems: "center", marginVertical: 20 },
  profileButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 10,
  },
  profileButtonItem: {
    padding: 10,
    backgroundColor: "#ededed",
    borderRadius: 5,
  },
});
