import { createNativeStackNavigator } from "@react-navigation/native-stack"
import PostDetailScreen from "../screens/PostDetailScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TabScreen from "./TabScreen";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import SearchDetailScreen from "../screens/SearchDetailScreen";
import Ionicons from '@expo/vector-icons/Ionicons';
import { TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_USER } from "../queries/query";
import LoadingScreen from "../components/LoadingScreen";
import { useNavigation } from "@react-navigation/native";
import AddPostScreen from "../screens/AddPostScreen";
import ProfileDetailScreen from "../screens/ProfileDetailScreen";

const Stack = createNativeStackNavigator();
export default function StackScreen(props) {
  const { isSignedIn } = useContext(AuthContext)
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation();
  const [searchUser, { data, loading, error }] = useLazyQuery(SEARCH_USER)
  const showToast = (err) => {
    ToastAndroid.show(err, ToastAndroid.LONG, ToastAndroid.TOP)
  }

  const searchHandler = useCallback(
    (username) => {
      setIsLoading(true)
      setTimeout(() => {
        searchUser({
          variables: {
            query: {
              username
            }
          }
        })
          .then((res) => {
            navigation.navigate("SearchDetail", { searchData: res.data.searchUsers })
          })
          .catch((err) => showToast(err.message))
          .finally(() => setIsLoading(false))
      }, 500)
    }, [searchUser, navigation]
  )

  useEffect(() => {
    if (search) {
      searchHandler(search)
    }
  }, [search, searchHandler])

  return (
    <Stack.Navigator>
      {isSignedIn ? <>
        <Stack.Screen name="TabScreen" component={TabScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} options={{ title: "" }} />
        <Stack.Screen name="SearchDetail" component={isLoading ? LoadingScreen : SearchDetailScreen} options={{
          title: "", headerRight: () => {
            return (
              <>
                <View style={{ paddingHorizontal: 10, paddingVertical: 8, backgroundColor: "white" }}>
                  <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#f3f5f7", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 8 }} activeOpacity={0.7} >
                    <Ionicons style={{ marginRight: 8 }} name="search" size={16} color="#7c8188" />
                    <TextInput style={{ width: "80%", fontSize: 16, color: "#000" }} placeholder={"Search"} placeholderTextColor="#7c8188" value={search} onChangeText={setSearch} />
                  </TouchableOpacity>
                </View>
              </>
            )
          }
        }} />
        <Stack.Screen name="AddPost" component={AddPostScreen} options={{ title: "New Post" }} />
        <Stack.Screen name="ProfileDetail" component={ProfileDetailScreen} options={({ route }) => ({ title: route.params.userName })} />
      </> : <>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      </>}
    </Stack.Navigator>
  )
};
