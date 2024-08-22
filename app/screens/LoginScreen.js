import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useState, useEffect } from "react"
export default function LoginScreen(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  return (
    <LinearGradient colors={["#fef8f3", "#f0f4fe", "#eef8ff"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.container} >
      <View style={{ width: 300, height: 300, flex: 2, alignItems: "center", justifyContent: "center" }}>
        <Image source={require("../assets/instagram.1024x1024.png")} style={styles.image} />
      </View>
      <View style={{ flex: 2 }} >
        <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder={"Email"} />
        <TextInput style={styles.input} onChangeText={setPassword} value={password} placeholder={"Password"} secureTextEntry={true} />

        {/* <LinearGradient colors={["#f9ce34", "#ee2a7b", "#6228d7"]} style={styles.login} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}> */}

        <Pressable style={styles.login} onPress={() => props.navigation.navigate("TabScreen")}>
          <Text style={{ color: "white" }}  >
            Log in
          </Text>
        </Pressable>
        {/* </LinearGradient> */}
      </View >
      <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "flex-end" }}>
        <Pressable style={styles.register} onPress={() => props.navigation.navigate("Register")}>
          <Text style={{ color: "#5083b1", textAlign: "center" }} >
            Create new account
          </Text>
        </Pressable>
      </View>

    </LinearGradient >
  )

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20
  },
  image: {
    width: 102.4,
    height: 102.4,
  },
  login: {
    width: 350,
    height: 50,
    borderRadius: 20,
    backgroundColor: "#0063e1",
    padding: 15,
    alignItems: "center",
  },
  inside: {
    backgroundColor: "rgba(52, 52, 52, 0.8)"
  },
  input: {
    width: 350,
    height: 60,
    marginBottom: 15,
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    borderColor: "#a5adb1"
  },
  register: {
    width: 350,
    height: 50,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderColor: "#5083b1",
    borderWidth: 2,
    paddingVertical: 15,
  }
})