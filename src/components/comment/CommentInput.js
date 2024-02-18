import { Entypo, Ionicons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { makeRequest } from "../../../axios";
import { AuthContext } from "../../context/AuthContext";
import { theme } from "../../core/theme";
import { apiCalls } from "../../utility/Enums";
import ProfilePicture from "../ProfilePicture";
import Icon from "../icons/Icon";

export default function CommentInput({ post, replyToComment, placeholder }) {
  const { currentUser } = useContext(AuthContext);
  const [commentInput, setCommentInput] = useState();
  const [commentPlaceholder, setCommentPlaceholder] = useState(`Add a comment`);
  const [isReplying, setIsReplying] = useState(0);
  const writeBoxRef = useRef();
  const queryClient = useQueryClient();

  useEffect(() => {
    writeBoxRef.current.focus;
  }, []);

  useEffect(() => {
    setIsReplying(replyToComment);
    setCommentPlaceholder(placeholder);
  }, [post, replyToComment]);

  const AddReply = (replyUsername = null, replyCommentId = 0) => {
    setCommentPlaceholder(`You are replying to ${replyUsername}`);
    setIsReplying(replyCommentId);
  };

  const removeReply = () => {
    setCommentPlaceholder("Add a comment");
    setIsReplying(0);
  };

  const onPostComment = () => {
    if (!commentInput.trim()) return;

    if (isReplying == 0) {
      makeRequest
        .post(apiCalls().comment.add.post, {
          elementType: "POST",
          postId: post.id,
          desc: commentInput,
        })
        .then(() => {
          queryClient.refetchQueries({ queryKey: ["comments"] });
        })
        .catch((err) => {
          console.error("Error sending message:", err);
        });
    } else {
      makeRequest
        .post(apiCalls().comment.add.comment, {
          elementType: "COMMENT",
          commentId: isReplying,
          desc: commentInput,
        })
        .then(() => {
          queryClient.refetchQueries({
            queryKey: ["subcomments"],
          });
        })
        .catch((err) => {
          console.error("Error sending message:", err);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
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
          {/* <TouchableOpacity
            style={styles.sendBtn}
            onPress={() => {
              removeReply();
              onPostComment();
              writeBoxRef.current.clear();
            }}
          >
            <Ionicons name="paper-plane-outline" size={24} color="black" />
          </TouchableOpacity> */}
          <Icon
            type="Ionicons"
            name="paper-plane-outline"
            size={24}
            style={styles.sendBtn}
            onClick={() => {
              removeReply();
              onPostComment();
              writeBoxRef.current.clear();
            }}
          />
        </View>
      </KeyboardAvoidingView>
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
    right: 7,
  },
  clearBtn: {
    position: "absolute",
    right: 50,
  },
});
