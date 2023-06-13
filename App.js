import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomePage from "./screens/HomePage";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Comparasion from "./screens/Comparasion";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useStore } from "./store";

const Tab = createBottomTabNavigator();

export default function App() {
  const getUser = useStore((state) => state.getUser);
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);

  useEffect(() => {
    getUser();
  }, []);

  // const user = {
  //   email: "kacak3392@gmail.com",
  //   picture:
  //     "https://lh3.googleusercontent.com/a/AAcHTteZHsv7JAoJNZ0ANBCAA7No2914gsglgspvttM7UA=s96-c",
  //   given_name: "Kaan",
  //   family_name: "Alacali",
  // };

  if (!user) {
    return <Login />;
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerTintColor: "black",
          headerStyle: {
            backgroundColor: "gray",
          },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "lightgray",
          tabBarStyle: {
            backgroundColor: "gray",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomePage}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
            headerRight: () => (
              <Pressable
                style={styles.button}
                onPress={() => {
                  console.log("pressed add car");
                }}
              >
                <Text>Add Car</Text>
                <Ionicons name="car-sport" size={24} color="black" />
              </Pressable>
            ),
          }}
        />
        <Tab.Screen
          name="Compare"
          component={Comparasion}
          options={{
            tabBarLabel: "Compare",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="compare"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "Profile",
            headerRight: () => (
              <Pressable
                style={styles.button}
                onPress={() => {
                  logout();
                }}
              >
                <Text>Logout</Text>
                <MaterialCommunityIcons name="logout" size={24} color="black" />
              </Pressable>
            ),
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
});
