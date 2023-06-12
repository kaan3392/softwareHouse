import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: "782322713529233",
  });

  useEffect(() => {
    if (response && response.type === "success" && response.authentication) {
      (async () => {
        const userInfoResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name,picture.type(large)`
        );
        const userInfo = await userInfoResponse.json();
        setUser(userInfo);
        console.log(response);
      })();
    }
  }, [response]);

  console.log(user);

  const onPressFacebook = async () => {
    try {
      const result = await promptAsync();
      console.log("response",response);
      if (result.type !== "success") {
        alert("Login failed, please try again");
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onPressGoogle = () => {
    alert("Login with Google");
  };

  return (
    <View style={styles.container}>
      {user ? (
        <Profile user={user} />
      ) : (
        <>
          <StatusBar style="auto" />
          <Text style={styles.title}> Cars App</Text>
          <LinearGradient
            style={styles.gradient}
            locations={[0.5, 0.9]}
            colors={["lightgray", "darkgray"]}
          >
            <Image
              style={styles.image}
              source={require("../assets/mustang-no-bg.png")}
            />
          </LinearGradient>
          <Pressable
            android_ripple={{ color: "gray" }}
            style={styles.button}
            onPress={onPressGoogle}
          >
            <Text style={styles.text}>Login With Google</Text>
            <Image
              style={styles.icon}
              source={require("../assets/google.png")}
            />
          </Pressable>
          <Pressable
            android_ripple={{ color: "gray" }}
            style={styles.button}
            onPress={onPressFacebook}
          >
            <Text style={styles.text}>Login With Facebook</Text>
            <Image
              style={styles.icon}
              source={require("../assets/facebook.png")}
            />
          </Pressable>
        </>
      )}
    </View>
  );
}

function Profile() {
  return (
    <View style={styles.profile}>
      <Text style={styles.titleProfile}>Welcome {user.name}!</Text>
      <Image
        source={{ uri: user.picture.data.url }}
        style={styles.imageProfile}
      />
      <Text style={styles.titleProfile}>Your email is {user.email}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
  },
  title: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 13,
    paddingHorizontal: 32,
    borderRadius: 6,
    elevation: 3,
    flexDirection: "row",
    gap: 10,
    backgroundColor: "white",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
  gradient: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    borderRadius: 20,
    width: 300,
    height: 300,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    borderRadius: 50,
  },
  profile: {
    alignItems: "center",
  },
  titleProfile: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  imageProfile: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    borderRadius: 50,
  },
});
