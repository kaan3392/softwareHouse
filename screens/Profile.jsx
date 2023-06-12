import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: user.picture }} style={styles.imageProfile} />
      <View style={styles.InfoContainer}>
        <Text style={styles.titleProfile}>email:</Text>
        <Text style={styles.titleProfile}> {user.email}!</Text>
      </View>

      <View style={styles.InfoContainer}>
        <Text style={styles.titleProfile}>name:</Text>
        <Text style={styles.titleProfile}> {user.given_name}!</Text>
      </View>

      <View style={styles.InfoContainer}>
        <Text style={styles.titleProfile}>surname:</Text>
        <Text style={styles.titleProfile}> {user.family_name}!</Text>
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
  },
  imageProfile: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  InfoContainer: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleProfile: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
