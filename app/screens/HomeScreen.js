import { View, FlatList, ToastAndroid, StyleSheet } from "react-native";
import Post from "../components/Post";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_LIKE_TO_POST, GET_POSTS } from "../queries/query";
import LoadingScreen from "../components/LoadingScreen";
export default function HomeScreen(props) {
  const { data, loading } = useQuery(GET_POSTS)
  const [addLike, { loading: likeLoading, error }] = useMutation(ADD_LIKE_TO_POST, {
    refetchQueries: [GET_POSTS]
  })

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.LONG, ToastAndroid.TOP);
  };
  const showToastLoading = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const likeHandler = (postId) => {
    addLike({
      variables: {
        newLike: {
          postId: postId
        }
      }
    }).then(() => showToast("Successfuly liked post"))
      .catch((err) => {
        showToast(err.message)
      })
  }


  if (loading) return <LoadingScreen />

  if (likeLoading) showToastLoading("liking process..")

  if (error) showToast(error.message)

  return (
    <View style={styles.container}>
      {data.posts && (
        <FlatList
          data={data.posts}
          renderItem={({ item }) => <Post post={item} likeHandler={likeHandler} />}>
        </FlatList>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
})