import { LinearGradient } from "expo-linear-gradient";
import { Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useState, useEffect } from "react"
export default function LoginScreen(props) {
  const [email, setEmail] = useState("email")
  const [password, setPassword] = useState("password")
  return (

    <View style={styles.container}>
      <TextInput style={styles.input} onChangeText={setEmail} value={email} />
      <TextInput style={styles.input} onChangeText={setPassword} value={password} />

      <LinearGradient colors={["#f9ce34", "#ee2a7b", "#6228d7"]} style={styles.button} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
        <Pressable>
          <Text style={{ color: "white" }} onPress={() => props.navigation.navigate("TabScreen")} >
            Login
          </Text>
        </Pressable>
      </LinearGradient>
    </View >
  )

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    width: 300,
    height: 50,
    borderRadius: 20,
    backgroundColor: "red",
    padding: 15,
    alignItems: "center",
  },
  inside: {
    backgroundColor: "rgba(52, 52, 52, 0.8)"
  },
  input: {
    width: 300,
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "#a5adb1"
  }
})