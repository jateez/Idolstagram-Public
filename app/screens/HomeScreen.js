import { View, Text, Pressable, Button, FlatList, ToastAndroid } from "react-native";
import Post from "../components/Post";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../queries/query";
import { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";

export default function HomeScreen({ navigation }) {
  const { data, loading, error } = useQuery(GET_POSTS)

  const showToast = (err) => {
    ToastAndroid.show(err, ToastAndroid.LONG, ToastAndroid.TOP)
  }

  if (true) {
    console.log("jalan loading")
    return
    <>
      <LoadingScreen />
    </>
  }

  if (error) {
    return showToast(error)
  }


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

      <FlatList
        data={data.posts}
        renderItem={({ item }) => <Post post={item} />}>

      </FlatList>
    </View>
  );
}