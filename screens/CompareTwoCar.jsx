import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { useStore } from "../store";

export default function CompareTwoCar() {
  const compareTwoCar = useStore((state) => state.compareTwoCar);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: 10,
        backgroundColor: "lightgray",
      }}
    >
      <View style={styles.container}>
        <Image
          source={{ uri: compareTwoCar[0].imageUrl }}
          style={styles.image}
        />
        <View style={styles.infoItem}>
          <Text>{compareTwoCar[0].brand}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text>{compareTwoCar[0].name}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text>{compareTwoCar[0].productionYears}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text>{compareTwoCar[0].cylinderVolume}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text>{compareTwoCar[0].maximumHorsepower}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text>{compareTwoCar[0].weight}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text>{compareTwoCar[0].fuelConsumptionAverage}</Text>
        </View>
      </View>

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
          <Text style={styles.text}>
            Cylinder Volume <Text style={styles.small}>(cm3)</Text>
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.text}>
            Maximum Horsepower <Text style={styles.small}>(PS)</Text>
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.text}>
            Weight <Text style={styles.small}>(Kg)</Text>
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.text}>
            Fuel Consumption Average <Text style={styles.small}>(L/100Km)</Text>
          </Text>
        </View>
      </View>

      <View style={styles.container}>
        <Image
          source={{ uri: compareTwoCar[1].imageUrl }}
          style={styles.image}
        />
        <View style={styles.infoItem}>
          <Text>{compareTwoCar[1].brand}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text>{compareTwoCar[1].name}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text>{compareTwoCar[1].productionYears}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text>{compareTwoCar[1].cylinderVolume}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text>{compareTwoCar[1].maximumHorsepower}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text>{compareTwoCar[1].weight}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text>{compareTwoCar[1].fuelConsumptionAverage}</Text>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    alignItems: "center",
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
    alignItems: "center",
    justifyContent: "center",
  },
  infoItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  small: {
    fontSize: 10,
  },
});
