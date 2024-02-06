import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import ProfilePicture from "../ProfilePicture";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../../axios";
import { apiCalls } from "../../utility/Enums";
import { Ionicons, Entypo, Octicons } from "@expo/vector-icons";
import { theme } from "../../core/theme";

export default function ProfilePage({ id }) {
  const { error, isLoading, data, refetch } = useQuery({
    queryKey: ["profilepage"],
    queryFn: () =>
      makeRequest
        .get(apiCalls(id).user.get.withId)
        .then((res) => res.data)
        .catch((err) => {
          console.error(err);
        }),
  });
  return error ? (
    <Text>Something went wrong...</Text>
  ) : isLoading ? (
    <Text>Loading...</Text>
  ) : (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.topButtons}>
          <TouchableOpacity style={styles.backBtb}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.notifBtn}>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreBtn}>
            <Entypo name="dots-three-vertical" size={22} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.username}>@{data.username}</Text>
        <View style={styles.profilePic}>
          <ProfilePicture user={data} size={100} />
        </View>
        <View style={styles.profileInfos}>
          <TouchableOpacity style={styles.profileInfosItem}>
            <Text style={{ fontWeight: "700", fontSize: 20 }}>52</Text>
            <Text style={{ color: theme.colors.secondary }}>Posts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileInfosItem}>
            <Text style={{ fontWeight: "700", fontSize: 20 }}>15</Text>
            <Text style={{ color: theme.colors.secondary }}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileInfosItem}>
            <Text style={{ fontWeight: "700", fontSize: 20 }}>35</Text>
            <Text style={{ color: theme.colors.secondary }}>Following</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profileButtons}>
          <TouchableOpacity style={styles.profileButtonItem}>
            <Text>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButtonItem}>
            <Text>Share</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.desc}>
          <Text style={styles.fullname}>{data.name}</Text>
          <Text style={styles.bio}>{data.bio}</Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <Text>8</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  top: { backgroundColor: "white", height: "auto", paddingBottom: 10 },
  bottom: { backgroundColor: "grey", height: "50%" },
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
