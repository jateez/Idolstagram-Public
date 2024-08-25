import { useMutation } from "@apollo/client";
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import { ADD_POST, GET_POSTS } from "../queries/query";
import { useState } from "react";
import LoadingScreen from "../components/LoadingScreen";

export default function AddPostScreen(props) {
  const [addPost, { data, loading, error }] = useMutation(ADD_POST, {
    refetchQueries: [GET_POSTS],
    onCompleted: () => {
      props.navigation.navigate("Home")
    }
  })
  const [isLoading, setIsLoading] = useState("")
  const [tags, setTags] = useState("")
  const [content, setContent] = useState("")
  const [imgUrl, setImgUrl] = useState("https://picsum.photos/200")
  const showToast = (info) => {
    setIsLoading(false)
    ToastAndroid.show(info, ToastAndroid.LONG, ToastAndroid.TOP)
  }

  const handlerAddPost = () => {
    setIsLoading(true)
    let temp = tags.split(",")
    if (content.trim() === "") return showToast("Description cannot be empty")
    addPost({
      variables: {
        newPost: {
          content,
          imgUrl,
          tags: temp,
        }
      }
    })
      .then(() => { showToast("Successfully added post") })
      .catch((err) => {
        showToast(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  if (isLoading || loading) {
    return (
      <LoadingScreen />
    )
  }


  return (
    <KeyboardAvoidingView style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.imageContainer}>
          {imgUrl ? (
            <Image style={styles.image} source={{ uri: imgUrl }} />
          ) : (
            <Text style={styles.noImageText}>Image will be previewed here</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Image Post URL</Text>
            <TextInput
              style={styles.input}
              onChangeText={setImgUrl}
              value={imgUrl}
              placeholder="Put your image link here"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.multiLineInput]}
              onChangeText={setContent}
              value={content}
              placeholder="Write your post description"
              multiline
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tags</Text>
            <TextInput
              style={styles.input}
              onChangeText={setTags}
              value={tags}
              placeholder="Add tags (comma separated)"
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={handlerAddPost}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
    padding: 5,
    alignItems: "center"
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10
  },
  noImageText: {
    backgroundColor: "gray",
    width: 200,
    height: 200,
    fontWeight: "500",
    color: "#757575",
    textAlign: "center",
    textAlignVertical: "center",
  },
  inputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    width: "100%",
  },
  inputGroup: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginRight: 5
  },
  input: {
    padding: 10,
    fontSize: 16
  },
  multiLineInput: {
    height: 100,
    textAlignVertical: "top"
  },
  button: {
    backgroundColor: "#0063e1",
    width: '90%',
    maxWidth: 350,
    borderRadius: 25,
    marginBottom: 20,
    paddingVertical: 15,
    alignSelf: 'center',
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  }
})