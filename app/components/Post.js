import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
export default function Post(props) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <View style={{ marginHorizontal: 10 }}>
          <Image source={{ uri: "https://picsum.photos/200" }} style={{ width: 40, height: 40, borderRadius: 20 }} />
        </View>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", paddingRight: 15, paddingLeft: 5 }}>
          <View>
            <Text>Username</Text>
          </View>
          <View>
            <SimpleLineIcons name="options" size={16} color="black" />
          </View>
        </View>
      </View>
      <View style={{ flex: 6, alignItems: "center", justifyContent: "center" }}>
        <Image source={{ uri: "https://picsum.photos/200" }} style={{ width: "100%", height: "100%" }} />
      </View>
      <View style={{ flex: 2.5, paddingTop: 4 }}>
        <View style={{ flex: 1, }}>
          <View style={{ flex: 1, flexDirection: "row", gap: 20, alignItems: "center", marginHorizontal: 10 }}>

            {/* <FontAwesome name="heart-o" size={24} color="black" /> */}
            <FontAwesome name="heart" size={24} color="red" />
            <FontAwesome name="comment-o" size={24} style={{ paddingBottom: 4 }} color="black" />
          </View>
          <View style={{ flex: 0.5 }}>
            <Text style={{ marginHorizontal: 10 }}>
              12121 Likes
            </Text>
          </View>
        </View>
        <View style={{ flex: 2, marginHorizontal: 10, paddingTop: 7.5, gap: 7.5 }}>
          <View>
            <Text><Text>Username</Text> Captions</Text>

          </View>
          <View style={{ gap: 7.5 }}>
            <Text>View all comments</Text>
            <Text>9 hours agos</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: 400,
    flex: 1,
  },
});
