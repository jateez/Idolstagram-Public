import { createNativeStackNavigator } from "@react-navigation/native-stack"
import PostDetailScreen from "../screens/PostDetailScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TabScreen from "./TabScreen";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

const Stack = createNativeStackNavigator();
export default function StackScreen(props) {

  const { isSignedIn } = useContext(AuthContext)

  return (
    <Stack.Navigator>
      {isSignedIn ? <>
        <Stack.Screen name="TabScreen" component={TabScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      </> : <>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      </>}
    </Stack.Navigator>
  )
};
