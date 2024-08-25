import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
export default function Post(props) {
  const navigation = useNavigation()
  console.log(props.post.likes)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: "https://picsum.photos/200" }} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.username}> {props.post?.authorName} </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("PostDetail", { postId: props.post?._id })}>
          <SimpleLineIcons name="options-vertical" size={16} color={"black"} />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: props.post?.imgUrl }} style={styles.postImage} />

      <View style={styles.footer}>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => props.likeHandler(props.post?._id)}>
            <FontAwesome name="heart" size={24} color="red" style={styles.actionIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("PostDetail", { postId: props.post?._id })}>
            <FontAwesome name="comment-o" size={24} color="black" style={styles.actionIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.likes}>{props.post?.likes.length} Likes</Text>
        <Text style={styles.caption}>
          <Text style={styles.username}>{props.post?.authorName}</Text> {props.post?.content}
        </Text>
        <Text style={styles.comments} onPress={() => navigation.navigate("PostDetail", { postId: props.post?._id })}>View all comments</Text>
        <Text style={styles.timestamp}>9 hours ago</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginBottom: 10
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 16
  },
  headerText: {
    flex: 1
  },
  username: {
    fontWeight: "bold"
  },
  postImage: {
    width: "100%",
    height: 375,
  },
  footer: {
    padding: 10
  },
  actions: {
    flexDirection: "row",
    marginBottom: 5,
  },
  actionIcon: {
    marginRight: 15
  },
  likes: {
    fontWeight: "bold",
    marginBottom: 5
  },
  caption: {
    marginBottom: 5
  },
  comments: {
    color: "gray",
    marginBottom: 5
  },
  timestamp: {
    color: "gray",
    fontSize: 12
  }
});
