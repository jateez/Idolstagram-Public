import { useMutation, useQuery } from "@apollo/client"
import { Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native"
import { ADD_FOLLOW_USER, GET_USER_BY_ID } from "../queries/query"
import LoadingScreen from "../components/LoadingScreen";

export default function ProfileScreen(props) {
  // const { data, loading, error } = useQuery(GET_USER_BY_ID, {
  //   variables: {
  // getUserByIdId: props.params.route.userId
  // }
  // })

  const [addFollow, { data: dataFollow, loading: loadingFollow, error: errorFollow }] = useMutation(ADD_FOLLOW_USER)

  const showToast = (err) => {
    ToastAndroid.show(err, ToastAndroid.LONG, ToastAndroid.TOP);
  };

  // if (loading) {
  //   return <LoadingScreen />;
  // }

  // if (error) {
  //   showToast(error.message);
  // }

  const handlerFollow = () => {
    addFollow({
      variables: {
        newFollow: {
          followingId: props.params.route.userId
        }
      }
    })
      .then(() => { })
      .catch((err) => {
        showToast(err.message)
      }).finally()
  }

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: "https://picsum.photos/200" }} />
        <View style={styles.headerDetails}>
          <View style={styles.accountDetails}>
            <View style={styles.statGroup}>
              <Text style={styles.statNumbers}>{Math.floor(Math.random() * (30 - 5 + 1) + 5)}</Text>
              <Text style={styles.notes}>posts</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statNumbers}>{data?.getUserById?.followers?.length}</Text>
              <Text style={styles.notes}>followers</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statNumbers}>{data?.getUserById?.followings?.length}</Text>
              <Text style={styles.notes}>followings</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.follows} onPress={handlerFollow}>
            <Text style={styles.followButton}>Follow</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#ddd"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ddd"
  },
  headerDetails: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15
  },
  accountDetails: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
    width: "100%"
  },
  statGroup: {
    alignItems: "center"
  },
  follows: {
    width: "100%",
    height: 20,
  },
  statNumbers: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  notes: {
    fontSize: 14,
    color: "#666",
  },
  follows: {
    backgroundColor: "#0095f6",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  followButton: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
})