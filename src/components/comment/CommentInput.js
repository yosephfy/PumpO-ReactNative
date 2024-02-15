import { Entypo, Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { theme } from "../../core/theme";
import ProfilePicture from "../ProfilePicture";

export default function CommentInput() {
  const { currentUser } = useContext(AuthContext);
  const [commentInput, setCommentInput] = useState();
  const [commentPlaceholder, setCommentPlaceholder] = useState(`Add a comment`);
  const [isReplying, setIsReplying] = useState(0);
  const writeBoxRef = useRef();

  useEffect(() => {
    writeBoxRef.current.focus;
  });

  const AddReply = (replyUsername = null, replyCommentId = 0) => {
    setCommentPlaceholder(`You are replying to ${replyUsername}`);
    setIsReplying(replyCommentId);
  };

  const removeReply = () => {
    setCommentPlaceholder("Add a comment");
    setIsReplying(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.writeCommentContainer}>
        <ProfilePicture user={currentUser} size={38} />
        <TextInput
          ref={writeBoxRef}
          id="commentInput"
          style={styles.input}
          numberOfLines={3}
          multiline
          textBreakStrategy="balanced"
          placeholder={commentPlaceholder}
          onChangeText={(newText) => setCommentInput(newText)}
        />
        {isReplying != 0 && (
          <TouchableOpacity
            style={styles.clearBtn}
            onPress={() => {
              setIsReplying(false);
              setCommentPlaceholder(`Add a comment`);
            }}
          >
            <Entypo name="cross" size={24} color={theme.colors.error} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.sendBtn}
          onPress={() => {
            removeReply();
            onPostComment(commentInput, isReplying, refetch);
            writeBoxRef.current.clear();
          }}
        >
          <Ionicons name="paper-plane-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    position: "absolute",
    width: "100%",
    bottom: 100,
  },
  writeCommentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginVertical: 10,
    gap: 10,
    alignItems: "center",
    paddingVertical: 20,
  },
  input: {
    backgroundColor: theme.colors.surface,
    flex: 1,
    minHeight: 40,
    borderRadius: 30,
    paddingLeft: 25,
    paddingRight: 50,
    paddingTop: 10,
    paddingBottom: 10,
    overflow: "hidden",
    textAlign: "left",
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  userProfilePic: {
    width: 25,
    height: 25,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  sendBtn: {
    position: "absolute",
    right: 17,
  },
  clearBtn: {
    position: "absolute",
    right: 50,
  },
});
