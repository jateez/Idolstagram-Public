import { View, Text, Pressable, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, }}>
      <Pressable>
        <Button
          title="Post Detail" onPress={() => navigation.navigate("PostDetail")} />
      </Pressable>
      <Pressable>
        <Button
          title="Register" onPress={() => navigation.navigate("Register")} />
      </Pressable>
      <Pressable>
        <Button
          title="Login" onPress={() => navigation.navigate("Login")} />
      </Pressable>
    </View>
  );
}