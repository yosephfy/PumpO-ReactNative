import { StyleSheet, Text, View } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
export default function Interactions({ actions, interactions }) {
  return (
    <View style={styles.container}>
      <View style={styles.interactions}>
        {interactions.likedByUser ? (
          <Entypo name="heart" size={24} color="black" />
        ) : (
          <Entypo name="heart-outlined" size={24} color="black" />
        )}
        <Text style={styles.interactionNumbers}>{interactions.usersLiked}</Text>
      </View>
      <View name="comment" style={styles.interactions}>
        <Ionicons name="chatbubble-outline" size={24} color="black" />
        <Text style={styles.interactionNumbers}>{interactions.comments}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 10,
    marginLeft: 10,
  },
  interactions: {
    width: 45,
    height: 30,
    flexDirection: "row",
    alignItems: "baseline",
  },
  interactionNumbers: {
    fontSize: 12,
    fontWeight: "300",
    alignSelf: "flex-end",
    marginLeft: 1,
  },
});
