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
import { View } from "react-native-web";

const Tab = createBottomTabNavigator();

export default function App() {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const getUser = async () => {
  //     const storedUser = await AsyncStorage.getItem("user");
  //     setUser(JSON.parse(storedUser));
  //   };
  //   getUser();
  // }, []);

  const user = true;

  if (!user) {
    return <Login />;
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
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
