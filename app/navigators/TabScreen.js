import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import AddPostScreen from "../screens/AddPostScreen";
import FontAwesome from '@expo/vector-icons/FontAwesome';
export default function TabScreen(props) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarShowLabel: false, title: "Instagram", tabBarIcon: ({ focused }) => {
          return focused ? <MaterialCommunityIcons name="home" size={24} color="black" /> : <MaterialCommunityIcons name="home-outline" size={24} color="black" />
        }
      }} />
      <Tab.Screen name="AddPost" component={AddPostScreen} options={{
        tabBarShowLabel: false, title: "Instagram", tabBarIcon: ({ focused }) => {
          return focused ? <Ionicons name="add-circle" size={24} color="black" /> : <Ionicons name="add-circle-outline" size={24} color="black" />
        }
      }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{
        tabBarShowLabel: false, title: "Instagram", tabBarIcon: ({ focused }) => {
          return focused ? <Ionicons name="search" size={24} color="black" /> : <Ionicons name="search-outline" size={24} color="black" />
        }
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarShowLabel: false, title: props.username ? props.username : "", tabBarIcon: ({ focused }) => {
          return focused ? <FontAwesome name="user-circle" size={24} color="black" /> : <FontAwesome name="user-circle-o" size={24} color="black" />
        }
      }} />
    </Tab.Navigator>
  );
}
