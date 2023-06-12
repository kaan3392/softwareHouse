import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [requestFacebook, responseFacebook, promptAsyncFacebook] =
    Facebook.useAuthRequest({
      clientId: "782322713529233",
    });
  const [requestGoogle, responseGoogle, promptAsyncGoogle] =
    Google.useIdTokenAuthRequest({
      clientId:
        "433638408319-j8jsusao7b1l7uni4ep6bc8ig79rnv7r.apps.googleusercontent.com",
      iosClientId:
        "433638408319-tkc8dujpk0qhukkfe9r3u1ggrg8steoo.apps.googleusercontent.com",
      androidClientId:
        "433638408319-rjvp9mbs9d2harooemakndipr0t8d2nr.apps.googleusercontent.com",
    });

  useEffect(() => {
    if (
      responseFacebook &&
      responseFacebook.type === "success" &&
      responseFacebook.authentication
    ) {
      (async () => {
        const userInfoResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${responseFacebook.authentication.accessToken}&fields=id,name,picture.type(large)`
        );
        const userInfo = await userInfoResponse.json();
        setUser(userInfo);
      })();
    }
  }, [responseFacebook]);

  useEffect(() => {
    if (
      responseGoogle &&
      responseGoogle.type === "success" &&
      responseGoogle.authentication
    ) {
      setAccessToken(responseGoogle.authentication.accessToken);
      accessToken && fetchUserInfo();
    }
  }, [responseGoogle, accessToken]);

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const userInfo = await response.json();
    setUser(userInfo);
  }

  console.log(user);

  const onPressFacebook = async () => {
    try {
      const result = await promptAsyncFacebook();
      console.log("response", result);
      if (result.type !== "success") {
        alert("Login failed, please try again");
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onPressGoogle = async () => {
    try {
      const result = await promptAsyncGoogle();
      if (result.type !== "success") {
        alert("Login failed, please try again");
        return;
      }
      console.log("responseGoogle*****", result);
    } catch (e) {
      console.log(e);
    }
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

function Profile({ user }) {
  console.log(user);
  return (
    <View style={styles.profile}>
      <Text style={styles.titleProfile}>Welcome {user.name}!</Text>
      <Image source={{ uri: user.picture }} style={styles.imageProfile} />
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