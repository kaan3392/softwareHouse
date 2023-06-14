import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./screens/HomePage";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Comparasion from "./screens/Comparasion";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useStore } from "./store";
import { AddCar } from "./screens/AddCar";
import { UpdateCar } from "./screens/UpdateCar";
import CompareTwoCar from "./screens/CompareTwoCar";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StackNavigatorHome() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "gray",
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "black",
        tabBarStyle: {
          backgroundColor: "gray",
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: "bold",
        },
        tabBarIconStyle: {
          size: 30,
        },
      }}
    >
      <Stack.Screen
        options={({ navigation }) => ({
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerRight: () => (
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate("Add Car")}
            >
              <Text style={{ color: "white" }}>Add Car</Text>
              <Ionicons name="car-sport" size={24} color="white" />
            </Pressable>
          ),
        })}
        name="Cars"
        component={HomePage}
      />
      <Stack.Screen name="Add Car" component={AddCar} />
      <Stack.Screen name="Update Car" component={UpdateCar} />
    </Stack.Navigator>
  );
}

function StackNavigatorComparasion() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "gray",
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "black",
        tabBarStyle: {
          backgroundColor: "gray",
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: "bold",
        },
        tabBarIconStyle: {
          size: 30,
        },
      }}
    >
      <Stack.Screen
        options={({ navigation }) => ({
          tabBarLabel: "Compare",
        })}
        name="Compare "
        component={Comparasion}
      />
      <Stack.Screen name="Compare Two Car" component={CompareTwoCar} />
    </Stack.Navigator>
  );
}

export default function App() {
  const getUser = useStore((state) => state.getUser);
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const carModalVisible = useStore((state) => state.carModalVisible);

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return <Login />;
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "gray",
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "black",
          tabBarStyle: {
            backgroundColor: "gray",
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: "bold",
          },
          tabBarIconStyle: {
            size: 30,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={StackNavigatorHome}
          options={{
            headerShown: false,
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
            headerRight: () => (
              <Pressable
                style={styles.button}
                onPress={() => {
                  carModalVisible();
                }}
              >
                <Text style={{ color: "white" }}>Add Car</Text>
                <Ionicons name="car-sport" size={24} color="white" />
              </Pressable>
            ),
          }}
        />
        {/* <Tab.Screen
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
                  carModalVisible();
                }}
              >
                <Text style={{ color: "white" }}>Add Car</Text>
                <Ionicons name="car-sport" size={24} color="white" />
              </Pressable>
            ),
          }}
        /> */}
        <Tab.Screen
          name="Compare"
          component={StackNavigatorComparasion}
          options={{
            tabBarLabel: "Compare",
            headerShown: false,
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
                <Text style={{ color: "white" }}>Logout</Text>
                <MaterialCommunityIcons name="logout" size={24} color="white" />
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
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
});
