import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Item } from "../components/CarItem";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

export default function HomePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://10.0.2.2:5000/api");
        setData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable android_ripple={{ color: "gray" }} style={styles.button}>
        <Text style={styles.buttonTitle}>Add New Car</Text>
        <Ionicons name="car-sport" size={24} color="black" />
      </Pressable>
      <View style={{marginVertical:10}}>
        <FlatList
          data={data}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item._id}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "lightgray",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 13,
    borderRadius: 6,
    borderColor: "black",
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    width: 150,
    alignSelf: "center",
    marginTop: 10,
  },
  buttonTitle: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    marginVertical: 5,
  },
});
