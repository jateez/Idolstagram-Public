import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";
export default function GradientText(props) {
  return (
    <MaskedView
      maskElement={
        <Text
          style={[
            props.style,
            {
              opacity: 0.99,
              backgroundColor: 'transparent',
            },
          ]}
        >
          {props.children}
        </Text>
      }
    >
      <LinearGradient
        colors={["#f9ce34", "#ee2a7b", "#6228d7"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <Text
          style={[
            props.style,
            {
              opacity: 0,
            },
          ]}
        >
          {props.children}
        </Text>
      </LinearGradient>
    </MaskedView>
  )
};
