import { LinearGradient } from "expo-linear-gradient";
import { Image, KeyboardAvoidingView, TouchableOpacity, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View, ActivityIndicator } from "react-native";
import { useState, useContext } from "react"
import { AuthContext } from "../contexts/authContext";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries/query";
import * as SecureStore from "expo-secure-store"
import GradientText from "../components/GradientText"
import LoadingScreen from "../components/LoadingScreen";

export default function LoginScreen(props) {
  const [email, setEmail] = useState("jateez@mail.com")
  const [password, setPassword] = useState("jateez")
  const { setIsSignedIn } = useContext(AuthContext)
  const [Login, { data, loading, error }] = useMutation(LOGIN)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");

  const showToast = (err) => {
    ToastAndroid.show(err, ToastAndroid.LONG, ToastAndroid.TOP)
    setErrorMessage("")
  }

  const handlerLogin = async () => {
    try {
      setIsLoading(true)
      const loggedUser = { email, password }
      const res = await Login({ variables: { loggedUser } })
      await SecureStore.setItemAsync("access_token", res.data.login)
      console.log(res.data.login)
      setIsSignedIn(true)
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <LoadingScreen />
    )
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <LinearGradient colors={["#fef8f3", "#f0f4fe", "#eef8ff"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.container} >
          {errorMessage ? showToast(errorMessage) : ""}
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", width: 250, height: 250 }}>
            <Image source={require("../assets/instagram.1024x1024.png")} style={styles.image} />
            <GradientText style={styles.instagramText}> Instagram</GradientText>
          </View>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder="Email" />
            <TextInput style={styles.input} onChangeText={setPassword} value={password} placeholder="Password" secureTextEntry={true} />
            <TouchableOpacity style={styles.login} onPress={handlerLogin}>
              <Text style={{ color: "white", fontWeight: '600' }}>
                Log in
              </Text>
            </TouchableOpacity>

          </View>
          <View style={{ marginTop: 20 }}>
            <TouchableOpacity style={styles.register} onPress={() => props.navigation.navigate("Register")}>
              <Text style={{ color: "#5083b1", textAlign: "center" }}>
                Create new account
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20
  },
  image: {
    width: 102.4,
    height: 102.4,
  },
  instagramText: {
    paddingTop: 20,
    fontWeight: '600',
    fontSize: 40
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
  login: {
    width: 350,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#0063e1",
    justifyContent: "center",
    alignItems: "center",
  },
  register: {
    width: 350,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'transparent',
    borderColor: "#5083b1",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  }
})