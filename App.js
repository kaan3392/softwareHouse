import { NavigationContainer } from "@react-navigation/native";
import HomePage from "./screens/HomePage";
import Login from "./screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      setUser(JSON.parse(storedUser));
    };
    getUser();
  }, []);

  if (!user) {
    return <Login />;
  }
  return (
    <NavigationContainer>
      <HomePage />;
    </NavigationContainer>
  );
}
