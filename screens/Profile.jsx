import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export default function Profile() {

  const user = {
    email:"kacak3392@gmail.com",
    picture:"https://lh3.googleusercontent.com/a/AAcHTteZHsv7JAoJNZ0ANBCAA7No2914gsglgspvttM7UA=s96-c",
    given_name:"Kaan",
    family_name:"Alacali",
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.picture }} style={styles.imageProfile} />
      <View style={styles.InfoContainer}>
        <Text style={styles.titleProfile}>email:</Text>
        <Text style={styles.titleProfile}> {user.email}</Text>
      </View>

      <View style={styles.InfoContainer}>
        <Text style={styles.titleProfile}>name:</Text>
        <Text style={styles.titleProfile}> {user.given_name}</Text>
      </View>

      <View style={styles.InfoContainer}>
        <Text style={styles.titleProfile}>surname:</Text>
        <Text style={styles.titleProfile}> {user.family_name}</Text>
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
