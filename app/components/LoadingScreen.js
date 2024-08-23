import { ActivityIndicator, StyleSheet, View } from "react-native"

export default function LoadingScreen(props) {
  return (
    <>
      <View style={styles.loadingOverlay}>
        <ActivityIndicator size="large" color="#0063e1" />
      </View>
    </>
  )
};

const styles = StyleSheet.create({
  loadingOverlay: {
    // ...StyleSheet.absoluteFillObject,
    flex: 1,
    // backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
})