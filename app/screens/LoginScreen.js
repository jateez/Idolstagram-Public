import { LinearGradient } from "expo-linear-gradient";
import { Image, KeyboardAvoidingView, TouchableOpacity, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View, ActivityIndicator } from "react-native";
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../contexts/authContext";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries/query";
import * as SecureStore from "expo-secure-store"
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

      const loggedUser = {
        email,
        password
      }

      const res = await Login({
        variables: {
          loggedUser
        }
      })
      console.log(res)
      console.log(res.data.login)
      await SecureStore.setItemAsync("access_token", res.data.login)
      setIsSignedIn(true)
    } catch (error) {
      console.log(error.message)
      setErrorMessage(error.message)
    } finally {

      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <View style={styles.loadingOverlay}>
        <ActivityIndicator size="large" color="#0063e1" />
      </View>
    )
  }


  return (
    <ScrollView style={{ flexGrow: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <LinearGradient colors={["#fef8f3", "#f0f4fe", "#eef8ff"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.container} >
          {errorMessage ? showToast(errorMessage) : ""}

          <View style={{ width: 300, height: 300, flex: 2, alignItems: "center", justifyContent: "center" }}>
            <Image source={require("../assets/instagram.1024x1024.png")} style={styles.image} />
          </View>
          <View style={{ flex: 2 }} >
            <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder={"Email"} />
            <TextInput style={styles.input} onChangeText={setPassword} value={password} placeholder={"Password"} secureTextEntry={true} />


            <TouchableOpacity style={styles.login} onPress={handlerLogin}>
              <Text style={{ color: "white" }}  >
                Log in
              </Text>
            </TouchableOpacity>
          </View >
          <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "flex-end" }}>
            <TouchableOpacity style={styles.register} onPress={() => props.navigation.navigate("Register")}>
              <Text style={{ color: "#5083b1", textAlign: "center" }} >
                Create new account
              </Text>
            </TouchableOpacity>
          </View>

        </LinearGradient >
      </KeyboardAvoidingView>
    </ScrollView>

  )

};


const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  login: {
    width: 350,
    height: 50,
    borderRadius: 20,
    backgroundColor: "#0063e1",
    padding: 15,
    alignItems: "center",
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