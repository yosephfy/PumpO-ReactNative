import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { makeRequest } from "../../../axios";
import { AuthContext } from "../../context/AuthContext";
import { dimensions } from "../../core/theme";
import { apiCalls } from "../../utility/Enums";
import PostImage from "./PostImage";

export default function FeedContainer({ domain }) {
  const { currentUser } = useContext(AuthContext);

  /* const apiFeedCalls = {
    profile: apiCalls(params.id).feed.get.profile,
    followed: apiCalls(params.id).feed.get.followed,
    user: apiCalls(currentUser.id).feed.get.profile,
    liked: apiCalls(params.id).feed.get.liked,
  }; */
  const apiFeedCalls = {
    profile: apiCalls(currentUser.id).feed.get.profile,
    followed: apiCalls(currentUser.id).feed.get.followed,
    user: apiCalls(currentUser.id).feed.get.profile,
    liked: apiCalls(currentUser.id).feed.get.liked,
  };
  const { isLoading, error, data } = useQuery({
    queryKey: ["feed", domain],
    queryFn: async () => {
      let list = [];
      await Promise.all(
        domain.map(async (element) => {
          try {
            const res = await makeRequest.get(apiFeedCalls[element]);
            list = list.concat(res.data);
          } catch (error) {
            console.error(
              `Error fetching data for ${element}:`,
              JSON.stringify(error.message)
            );
          }
        })
      );

      if (domain == "liked") {
        return [
          ...new Map(list.map((item) => [item["id"], item])).values(),
        ].sort((a, b) => a.timestamp < b.timestamp);
      }

      return [...new Map(list.map((item) => [item["id"], item])).values()].sort(
        (a, b) => a.createdAt < b.createdAt
      );
    },
  });
  return (
    <ScrollView style={styles.container}>
      {error ? (
        <Text>"Something went wrong"</Text>
      ) : isLoading ? (
        <Text>"Loading..."</Text>
      ) : (
        data.map((fee) => {
          return <PostImage feed={fee} key={fee.id} />;
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    marginBottom: dimensions.bottomNavHeight + 20,
  },
});
