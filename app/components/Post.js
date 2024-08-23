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
            <Text>{props.post?.authorName}</Text>
          </View>
          <View>
            <SimpleLineIcons name="options" size={16} color="black" />
          </View>
        </View>
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", width: 300, height: 300 }}>
        <Image source={{ uri: props.post?.imgUrl }} style={{ width: "100%", height: "100%" }} />
      </View>
      <View style={{ flex: 1, paddingTop: 4 }}>
        <View style={{ flex: 1, }}>
          <View style={{ flex: 1, flexDirection: "row", gap: 20, alignItems: "center", marginHorizontal: 10 }}>

            {/* <FontAwesome name="heart-o" size={24} color="black" /> */}
            <FontAwesome name="heart" size={24} color="red" />
            <FontAwesome name="comment-o" size={24} style={{ paddingBottom: 4 }} color="black" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ marginHorizontal: 10 }}>
              {props.post?.likes.length} Likes
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, marginHorizontal: 10, paddingTop: 7.5, gap: 7.5 }}>
          <View>
            <Text><Text>{props.post?.authorName}</Text> {props.post?.content}</Text>

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
