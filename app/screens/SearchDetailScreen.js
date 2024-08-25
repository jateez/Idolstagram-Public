import { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList } from "react-native"
import UserResult from "../components/UserResult"
import { useNavigation } from "@react-navigation/native"
export default function SearchDetailScreen(props) {
  const { searchData } = props.route.params || {}
  const navigation = useNavigation()
  if (!searchData) {
    return (
      <View style={styles.containerStart}>
      </View>
    );
  }

  if (searchData.length === 0) {
    return (
      <View style={styles.containerEmpty}>
        <Text style={styles.textEmpty}>
          {"No User Found :("}
        </Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>

      <FlatList
        data={searchData}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("ProfileDetail", { userId: item?._id, userName: item?.username })}>
            <UserResult user={item} />
          </TouchableOpacity>
        )} />

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",

  },
  containerStart: {
    height: "100%",
    backgroundColor: "white"
  },
  containerEmpty: {
    height: "100%",
    backgroundColor: "white",
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  textEmpty: {
    fontSize: 16,
    fontWeight: "medium"
  }
})