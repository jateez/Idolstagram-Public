import { Image, StyleSheet, Text, View } from "react-native";

export default function Comment(props) {
  return (
    <View style={styles.commentGroup}>
      <Image source={{ uri: "https://picsum.photos/200" }} style={styles.avatar} />
      <View style={styles.commentContent}>
        <Text style={styles.username}>{props.comment?.username}</Text>
        <Text style={styles.commentText}>{props.comment?.content}</Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  commentGroup: {
    flexDirection: "row",
    marginBottom: 10,
    paddingHorizontal: 12
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
    paddingLeft: 12
  },
  commentContent: {
    flex: 1
  },
  username: {
    fontWeight: "bold",
    marginBottom: 2
  },
  commentText: {
    fontSize: 14
  }
})