import { Image, StyleSheet, Text, View } from "react-native"

export default function UserResult(props) {
  return (
    <>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: `https://picsum.photos/20${Math.floor(Math.random() * (10 + 1))}` }} />
        <View style={styles.userDetails}>
          <Text style={styles.username}>{props.user?.username}</Text>
          <Text style={styles.name}>{props.user?.name}</Text>
        </View>
      </View>
    </>
  )
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 12
  },
  userDetails: {
    flexDirection: "column",
    justifyContent: "center"
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black"
  },
  name: {
    color: "#a0a0a0",
    fontSize: 14,
    marginTop: 2
  }
})