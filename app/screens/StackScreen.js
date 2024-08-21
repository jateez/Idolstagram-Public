import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import PostDetailScreen from "./PostDetailScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import TabScreen from "./TabScreen";

const Stack = createNativeStackNavigator();
export default function StackScreen(props) {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TabScreen" component={TabScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
    </Stack.Navigator>
  )
};
