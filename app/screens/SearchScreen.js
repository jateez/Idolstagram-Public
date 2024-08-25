import { FlatList, Image, StyleSheet, Text, ToastAndroid, View } from "react-native"
import { GET_POSTS } from "../queries/query"
import { useQuery } from "@apollo/client"
import LoadingScreen from "../components/LoadingScreen"

export default function SearchScreen(props) {
  const { data, loading, error } = useQuery(GET_POSTS)

  const showToast = (err) => {
    ToastAndroid.show(err, ToastAndroid.LONG, ToastAndroid.TOP)
  }

  if (loading) {
    return <LoadingScreen />
  }
  if (error) {
    return showToast(error.message)
  }

  return (
    <View style={styles.container}>
      <FlatList data={data.posts}
        renderItem={({ item }) => {
          return (
            <View style={styles.post}>
              <Image
                source={{ uri: item.imgUrl || "https://picsum.photos/200" }}
                style={styles.image}
              />
            </View>
          )
        }}
        numColumns={3}
        contentContainerStyle={styles.contents} />
    </View >
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  post: {
    flex: 1,
    aspectRatio: 1,
    margin: 1
  },
  contents: {
    padding: 1
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
})