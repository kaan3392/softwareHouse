import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useStore } from "../store";
import {
  FACEBOOK_CLIENT_ID,
  GOOGLE_WEB_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
} from "@env";
import GradientText from "../components/GradientText";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const setUser = useStore((state) => state.setUser);

  const [accessToken, setAccessToken] = useState(null);

  const [requestFacebook, responseFacebook, promptAsyncFacebook] =
    Facebook.useAuthRequest({
      clientId: FACEBOOK_CLIENT_ID,
    });


  const [requestGoogle, responseGoogle, promptAsyncGoogle] =
    Google.useIdTokenAuthRequest({
      clientId: GOOGLE_WEB_CLIENT_ID,
      iosClientId: GOOGLE_IOS_CLIENT_ID,
      androidClientId: GOOGLE_ANDROID_CLIENT_ID,
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
    try{

      let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const userInfo = await response.json();
      setUser(userInfo);
    }
    catch(e){
      Alert.alert("Login failed, please try again");
    }
  }

  const onPressFacebook = async () => {
    try {
      const result = await promptAsyncFacebook();
      console.log(result)
      if (result.type !== "success") {
        Alert.alert("Login failed, please try again");
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
        Alert.alert("Login failed, please try again");
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <GradientText text="<CarApp/>" />
      <LinearGradient
        style={styles.gradient}
        locations={[0.5, 0.9]}
        colors={["lightgray", "darkgray"]}
      >
        <Image
          style={styles.image}
          source={require("../assets/loginPic.png")}
        />
      </LinearGradient>
      <Pressable
        android_ripple={{ color: "gray" }}
        style={styles.button}
        onPress={onPressGoogle}
      >
        <Text style={styles.text}>Login with Google</Text>
        <Image style={styles.icon} source={require("../assets/google.png")} />
      </Pressable>
      <Pressable
        android_ripple={{ color: "gray" }}
        style={styles.button}
        onPress={onPressFacebook}
      >
        <Text style={styles.text}>Login with Facebook</Text>
        <Image style={styles.icon} source={require("../assets/facebook.png")} />
      </Pressable>
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
    color: "black",
    fontSize: 40,
    fontFamily:"Montserrat-SemiBold"
  
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
