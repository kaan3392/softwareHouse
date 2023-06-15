import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { useStore } from "../store";

export default function Profile() {
  const user = useStore((state) => state.user);

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.picture }} style={styles.imageProfile} />
      <View style={styles.InfoContainer}>
        <Text style={styles.titleProfile}>Name:</Text>
        <Text style={styles.titleProfile}> {user.given_name}</Text>
      </View>
      <View style={styles.InfoContainer}>
        <Text style={styles.titleProfile}>Surname:</Text>
        <Text style={styles.titleProfile}> {user.family_name}</Text>
      </View>
      <View style={styles.InfoContainer}>
        <Text style={styles.titleProfile}>Email:</Text>
        <Text style={styles.titleProfile}> {user.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },
  imageProfile: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: "center",
  },
  InfoContainer: {
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },
  titleProfile: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
