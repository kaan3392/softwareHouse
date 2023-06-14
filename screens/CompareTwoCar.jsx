import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useStore } from "../store";
import { Image } from "react-native";

export default function CompareTwoCar() {
  const compareTwoCar = useStore((state) => state.compareTwoCar);
  return (
    <View style={{ flex: 1, flexDirection: "row"}}>
        <View style={styles.titles}>
          <View style={styles.placeholder} />
          <View style={styles.infoItem}>
            <Text style={styles.text}>Brand</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.text}>Name</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.text}>Production Years</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.text}>Cylinder Volume</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.text}>Maximum Horsepower</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.text}>Weight</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.text}>Fuel Consumption Average</Text>
          </View>
        </View>
        {compareTwoCar.map((item, index) => (
          <View style={styles.container} key={index}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.infoItem}>
              <Text>{item.brand}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text>{item.name}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text>{item.productionYears}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text>{item.cylinderVolume}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text>{item.maximumHorsepower}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text>{item.weight}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text>{item.fuelConsumptionAverage}</Text>
            </View>
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    alignItems: "center",
    marginRight: 10,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  placeholder: {
    width: 100,
    height: 150,
  },
  titles: {
    flex: 0.7,
    gap: 10,
    marginLeft: 10,
  },
  infoItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // height:50,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
});
