import { LinearGradient } from "expo-linear-gradient"
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { useState } from "react"
import GradientText from "../components/GradientText"
export default function RegisterScreen(props) {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  return (
    <LinearGradient colors={["#fef8f3", "#f0f4fe", "#eef8ff"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.container} >
      <View style={{ width: 300, height: 300, flex: 2, alignItems: "center", justifyContent: "center" }}>
        <Image source={require("../assets/instagram.1024x1024.png")} style={styles.image} />
        <GradientText style={styles.instagramText}> Instagram</GradientText>
      </View>
      <View style={{ flex: 2 }}>
        <TextInput style={styles.input} onChangeText={setUsername} value={username} placeholder="username" />
        <TextInput style={styles.input} onChangeText={setName} value={name} placeholder="name" />
        <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder="email" />
        <TextInput style={styles.input} onChangeText={setPassword} value={password} placeholder="password" secureTextEntry={true} />
        <Pressable style={styles.register} onPress={() => props.navigation.navigate("TabScreen")}>
          <Text style={{ color: "white", fontWeight: 600 }}  >
            Create account
          </Text>
        </Pressable>
      </View>
      <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "flex-end" }}>
        <Pressable style={styles.login} onPress={() => props.navigation.navigate("Login")}>
          <Text style={{ color: "#5083b1", textAlign: "center" }} >
            Log in
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20
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
    backgroundColor: "#0063e1",
    padding: 15,
    alignItems: "center",
  },
  image: {
    width: 102.4,
    height: 102.4,
  },
  instagramText: {
    paddingTop: 20,
    fontWeight: 600,
    fontSize: 40
  },
  login: {
    width: 350,
    height: 50,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderColor: "#5083b1",
    borderWidth: 2,
    paddingVertical: 12.5,
  }
})
