import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import AddPostScreen from "../screens/AddPostScreen";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as SecureStore from "expo-secure-store"
import { TextInput, TouchableOpacity, View } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

export default function TabScreen(props) {
  const { setIsSignedIn } = useContext(AuthContext)
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarShowLabel: false, title: "Instagram", tabBarIcon: ({ focused }) => {
          return focused ? <MaterialCommunityIcons name="home" size={24} color="black" /> : <MaterialCommunityIcons name="home-outline" size={24} color="black" />
        }, headerRight: () => {
          const handlerLogOut = async () => {
            try {
              await SecureStore.deleteItemAsync("access_token");
              setIsSignedIn(false)
            } catch (error) {
              console.log(error)
            }
          }
          return (
            <>
              <TouchableOpacity activeOpacity={0.7} onPress={handlerLogOut}>
                <MaterialIcons name="logout" size={24} color="black" style={{ marginRight: 5 }} />
              </TouchableOpacity>
            </>)
        }

      }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{
        tabBarShowLabel: false, title: "", tabBarIcon: ({ focused }) => {
          return focused ? <Ionicons name="search" size={24} color="black" /> : <Ionicons name="search-outline" size={24} color="black" />
        },
        headerRight: () => {
          return (
            <>
              <View style={{ paddingHorizontal: 10, paddingVertical: 8, backgroundColor: "white" }}>
                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#f3f5f7", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 8 }} onPress={() => { props.navigation.navigate("SearchDetail") }} activeOpacity={0.7} >
                  <Ionicons style={{ marginRight: 8 }} name="search" size={16} color="#7c8188" />
                  <TextInput style={{ width: "100%", fontSize: 16, color: "#000" }} editable={false} placeholder={"Search"} placeholderTextColor="#7c8188" />
                </TouchableOpacity>
              </View>
            </>
          )
        }
      }} />
      <Tab.Screen name="AddPost" component={AddPostScreen} options={{
        tabBarShowLabel: false, title: "Instagram", tabBarIcon: ({ focused }) => {
          return focused ? <Ionicons name="add-circle" size={24} color="black" /> : <Ionicons name="add-circle-outline" size={24} color="black" />
        }
      }} />
      {/* <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarShowLabel: false, title: props.username ? props.username : "", tabBarIcon: ({ focused }) => {
          return focused ? <FontAwesome name="user-circle" size={24} color="black" /> : <FontAwesome name="user-circle-o" size={24} color="black" />
        }
      }} /> */}
    </Tab.Navigator>
  );
}
