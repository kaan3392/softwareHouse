import { Image, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { StyleSheet } from "react-native";

export default function GradientText(props) {
  return (
    <MaskedView
    style={{ flexDirection: "row", marginBottom: -90}}
      maskElement={
        <View
          style={{
            backgroundColor: "trasparent",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 45,
              color: "black",
              fontFamily: "Poppins-SemiBold",
            }}
          >
            {props.text}
          </Text>
        </View>
      }
    >
      <LinearGradient
        style={styles.gradient}
        start={{ x: 0.3, y: 1 }}
        end={{ x: 1, y: 1 }}
        colors={["#3B444B", "#98AFC7"]}
      /> 

    </MaskedView>
  );
}

const styles = StyleSheet.create({
  gradient: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    borderRadius: 20,
    width: 300,
    height: 300,
  },
});
