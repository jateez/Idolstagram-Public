import { LinearGradient } from "expo-linear-gradient"
import { ActivityIndicator, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native"
import { useState } from "react"
import GradientText from "../components/GradientText"
import { REGISTER } from "../queries/query"
import { useMutation } from "@apollo/client"


export default function RegisterScreen(props) {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");


  const [Register, { data, loading, error }] = useMutation(REGISTER)
  const handleRegister = async () => {
    try {
      setIsLoading(true)
      const newUser = {
        email,
        username,
        name,
        password
      }

      const res = await Register({
        variables: {
          newUser
        }
      })
      props.navigation.navigate("Login")
    } catch (error) {
      console.log(error)
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false)
    }
  }
  const showToast = (err) => {
    ToastAndroid.show(err, ToastAndroid.LONG, ToastAndroid.TOP)
    setErrorMessage("")
  }

  if (isLoading) {
    return (
      <View style={styles.loadingOverlay}>
        <ActivityIndicator size="large" color="#0063e1" />
      </View>
    )
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <LinearGradient colors={["#fef8f3", "#f0f4fe", "#eef8ff"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.container} >
          {errorMessage ? showToast(errorMessage) : ""}
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Image source={require("../assets/instagram.1024x1024.png")} style={styles.image} />
            <GradientText style={styles.instagramText}> Instagram</GradientText>
          </View>
          <View style={{ flex: 2, justifyContent: "center" }}>
            <TextInput style={styles.input} onChangeText={setUsername} value={username} placeholder="username" />
            <TextInput style={styles.input} onChangeText={setName} value={name} placeholder="name" />
            <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder="email" />
            <TextInput style={styles.input} onChangeText={setPassword} value={password} placeholder="password" secureTextEntry={true} />
            <TouchableOpacity style={styles.register} onPress={handleRegister}>
              <Text style={{ color: "white", fontWeight: 600 }}  >
                Create account
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20 }}>
            <TouchableOpacity style={styles.login} onPress={() => props.navigation.navigate("Login")}>
              <Text style={{ color: "#5083b1", textAlign: "center" }} >
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
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
  input: {
    width: 350,
    height: 60,
    marginBottom: 15,
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    borderColor: "#a5adb1"
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
  register: {
    width: 350,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#0063e1",
    justifyContent: "center",
    alignItems: "center",
  },
  login: {
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
