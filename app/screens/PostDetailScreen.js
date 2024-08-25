import { FlatList, Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useMutation, useQuery } from "@apollo/client";
import { ADD_COMMENT, GET_POST_BY_ID } from "../queries/query";
import LoadingScreen from "../components/LoadingScreen";
import Comment from "../components/Comment";
import Octicons from '@expo/vector-icons/Octicons';
import { useState } from "react";

export default function PostDetailScreen(props) {
  const { data, loading, error } = useQuery(GET_POST_BY_ID, {
    variables: {
      getPostId: props.route.params.postId
    }
  });
  const [comment, setComment] = useState("")
  const [addComment, { loading: addCommentLoading, error: addCommentError }] = useMutation(ADD_COMMENT, {
    onCompleted: () => {
      setComment("")
    },
    refetchQueries: [{
      query: GET_POST_BY_ID, variables: {
        getPostId: props.route.params.postId
      }
    }]
  })

  const showToast = (err) => {
    ToastAndroid.show(err, ToastAndroid.LONG, ToastAndroid.TOP);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    showToast(error.message);
  }

  const handlerComment = () => {
    if (comment.trim() === "") return
    addComment({
      variables:
      {
        newComment: {
          content: comment,
          postId: props.route.params.postId
        }
      }
    })
      .then(() => { })
      .catch((err) => showToast(err.message))
  }

  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <Image source={{ uri: "https://picsum.photos/200" }} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.username}>{data.getPost?.authorName}</Text>
          <Text style={styles.following}>Following</Text>
        </View>
        <SimpleLineIcons name="options" size={16} color="black" />
      </View>

      <Image source={{ uri: data.getPost?.imgUrl }} style={styles.postImage} />

      <View style={styles.footer}>
        <View style={styles.actions}>
          <FontAwesome name="heart-o" size={24} color="black" style={styles.actionIcon} />
          <FontAwesome name="comment-o" size={24} color="black" style={styles.actionIcon} />
        </View>
        <Text style={styles.likes}>{data.getPost.likes?.length} likes</Text>
        <Text style={styles.caption}>
          <Text style={styles.username}>{data.getPost?.authorName}</Text> {data.getPost?.content}
        </Text>
        <Text style={styles.timestamp}>9 hours ago</Text>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={data.getPost?.comments || []}
        renderItem={({ item }) => <Comment comment={item} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyCommentsContainer}>
            <Text style={styles.emptyCommentsText}>No comments yet. Be the first to comment!</Text>
          </View>
        )}
        contentContainerStyle={styles.commentsList}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.commentFooterContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Add a comment..."
            placeholderTextColor="#999"
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity onPress={handlerComment}>
            <Octicons name="paper-airplane" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  scrollContent: {
    flexGrow: 1,
  },
  commentsList: {
    paddingBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    fontSize: 14,
  },
  following: {
    fontSize: 12,
    color: '#666',
  },
  postImage: {
    width: "100%",
    height: 375,
  },
  footer: {
    padding: 12,
  },
  actions: {
    flexDirection: "row",
    marginBottom: 10,
  },
  actionIcon: {
    marginRight: 16,
  },
  likes: {
    fontWeight: "bold",
    marginBottom: 6,
    fontSize: 14,
  },
  caption: {
    marginBottom: 8,
    fontSize: 14,
    lineHeight: 18,
  },
  timestamp: {
    color: "#999",
    fontSize: 12,
    marginBottom: 10,
  },
  comments: {
    padding: 12,
    borderTopWidth: 0.5,
    borderTopColor: '#ddd',
  },
  commentHeader: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
    color: '#666',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
  emptyCommentsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyCommentsText: {
    fontSize: 16,
    color: '#666',
  },
  textInput: {
    width: "85%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 5
  },
  commentFooterContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    width: "100%",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: "center",
    justifyContent: "space-around"
  },
});
