import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export const Item = ({ item }) => {
  return (
    <View style={styles.item}>
      <View style={styles.iconContainer}>
        <Pressable>
          <FontAwesome name="trash-o" size={24} color="black" />
        </Pressable>
        <Pressable>
          <FontAwesome name="edit" size={24} color="black" />
        </Pressable>
      </View>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Text style={styles.name}>{item.brand}</Text>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Production Year</Text>
        <Text style={styles.name}>{item.productionYears}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Clinder Volume</Text>
        <Text style={styles.name}>{item.cylinderVolume}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Maximum Horsepower</Text>
        <Text style={styles.name}>{item.maximumHorsepower}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Weight</Text>
        <Text style={styles.name}>{item.weight}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Fuel Consumption Average</Text>
        <Text style={styles.name}>{item.fuelConsumptionAverage}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 30,
    alignItems: "center",
    elevation: 5,
    borderRadius: 5,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.25,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
  },
  name: {
    fontSize: 20,
    color: "black",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },

  image: {
    width: 190,
    height: 190,
    resizeMode: "contain",
  },

  iconContainer: {
    position: "absolute",
    top: 25,
    right: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 60,
  },
});
