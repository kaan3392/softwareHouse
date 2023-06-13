import { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { CarItem } from "../components/CarItem";
import { useStore } from "../store";
import LoadingScreen from "../components/LoadingScreen";
import AddCarModal from "../components/AddCarModal";

export default function HomePage() {
  const cars = useStore((state) => state.cars);
  const getAllCars = useStore((state) => state.getAllCars);
  const carsLoading = useStore((state) => state.carsLoading);
  const isCarModalVisible = useStore((state) => state.isCarModalVisible);


  useEffect(() => {
    if (!cars.length) {
      getAllCars();
    }
  }, []);

  if (carsLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ marginVertical: 15 }}>
          <LoadingScreen width={"88%"} height={450} />
          <LoadingScreen width={"88%"} height={450} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {isCarModalVisible && <AddCarModal />}
      <View style={{ marginVertical: 10 }}>
        <FlatList
          data={cars}
          renderItem={({ item }) => <CarItem item={item} />}
          keyExtractor={(item) => item._id}
          initialNumToRender={4}
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
});
