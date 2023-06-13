import {  Animated } from "react-native";
import { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";

export default function LoadingScreen({ width, height }) {
  const opacity = useRef(new Animated.Value(0.3));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 1,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.3,
          useNativeDriver: true,
          duration: 800,
        }),
      ])
    ).start();
  }, [opacity.current]);

  return (
    <Animated.View
      style={[{ opacity: opacity.current, height, width }, styles.skeleton]}
    >
      <Animated.View style={styles.iconContainer} />
      <Animated.View style={styles.image} />
      <Animated.View style={styles.infoTitle} />
      <Animated.View style={styles.infoContainer} />
      <Animated.View style={styles.infoContainer} />
      <Animated.View style={styles.infoContainer} />
      <Animated.View style={styles.infoContainer} />
      <Animated.View style={styles.infoContainer} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "gray",
    padding: 5,
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: "center",
    position: "relative",
    gap: 20,
  },
  infoContainer: {
    width: "90%",
    height: 20,
    padding: 10,
    backgroundColor: "lightgray",
    borderRadius: 5,
  },

  image: {
    width: 150,
    height: 100,
    backgroundColor: "lightgray",
    marginTop: 60,
    marginBottom: 20,
    borderRadius: 5,
  },

  iconContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 60,
    height: 30,
    borderRadius: 5,
    backgroundColor: "lightgray",
  },
  infoTitle: {
    width: "50%",
    height: 20,
    padding: 10,
    backgroundColor: "lightgray",
    borderRadius: 5,
    alignSelf: "center",
  },
});
