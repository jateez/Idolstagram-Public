import { useMutation, useQuery } from "@apollo/client"
import { FlatList, Image, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native"
import { ADD_FOLLOW_USER, GET_USER_BY_ID } from "../queries/query"
import LoadingScreen from "../components/LoadingScreen";
import { useState, useEffect } from "react";

export default function ProfileDetailScreen(props) {
  const [activeTab, setActiveTab] = useState("")
  const [postCount, setPostCount] = useState(0)
  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: {
      getUserByIdId: props.route?.params?.userId
    }
  })

  useEffect(() => {
    setPostCount(Math.floor(Math.random() * (30 - 5 + 1) + 5))
  }, [])

  const [addFollow, { loading: loadingFollow }] = useMutation(ADD_FOLLOW_USER, {
    refetchQueries: [GET_USER_BY_ID]
  })

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.LONG, ToastAndroid.TOP);
  };

  if (loading) return <LoadingScreen />;


  if (error) showToast(error.message);

  const handlerFollow = () => {
    addFollow({
      variables: {
        newFollow: {
          followingId: props.route?.params?.userId
        }
      }
    })
      .then(() => showToast("Successfully followed"))
      .catch((err) => showToast(err.message))
  }

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <Image style={styles.userAvatar} source={{ uri: `https://picsum.photos/20${Math.floor(Math.random() * (10 + 1))}` }} />
      <Text style={styles.userName}>{item.username}</Text>
    </View>

  )

  const renderContent = () => {
    let data = [];
    let emptyText = "";

    switch (activeTab) {
      case "posts":
        data = [];
        emptyText = "Coming soon";
        break;
      case "followers":
        data = data?.getUserById?.followers || [];
        emptyText = "No followers yet";
        break;
      case "followings":
        data = data?.getUserById?.followings || [];
        emptyText = "No followings yet";
        break;
    }

    return (
      <FlatList
        data={data}
        renderItem={renderUserItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.emptyStateText}>{emptyText}</Text>}
      />
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: `https://picsum.photos/20${Math.floor(Math.random() * (10 + 1))}` }} />
        <View style={styles.headerDetails}>
          <View style={styles.accountDetails}>
            <View style={styles.statGroup}>
              <Text style={styles.statNumbers}>{postCount}</Text>
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
          <TouchableOpacity style={styles.followButton} onPress={handlerFollow} disabled={loadingFollow}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.username}>{data?.getUserById?.username}</Text>
      <Text style={styles.name}>{data?.getUserById?.name}</Text>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, activeTab === "posts" && styles.activeTab]} onPress={() => setActiveTab("posts")}>
          <Text style={[styles.tabText, activeTab === "posts" && styles.activeTabText]}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === "followers" && styles.activeTab]} onPress={() => setActiveTab("followers")}>
          <Text style={[styles.tabText, activeTab === "followers" && styles.activeTabText]}>Followings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === "followings" && styles.activeTab]} onPress={() => setActiveTab("followings")}>
          <Text style={[styles.tabText, activeTab === "followings" && styles.activeTabText]}>Followers</Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#eee",
  },
  headerDetails: {
    flex: 1,
    marginLeft: 20
  },
  accountDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  statGroup: {
    alignItems: "center"
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
  followButton: {
    backgroundColor: "#0095f6",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  followButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 10,
  },
  name: {
    fontSize: 14,
    color: "#666",
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 15
  },
  tabContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#eee"
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center"
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#0095f6"
  },
  tabText: {
    color: "#0095f6",
    fontWeight: "bold"
  },
  postContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userName: {
    fontSize: 16,
    color: '#333',
  },

})