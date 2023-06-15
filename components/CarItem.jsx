import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View, Alert } from "react-native";
import { useStore } from "../store";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const CarItem = ({ item }) => {
  const deleteCar = useStore((state) => state.deleteCar);

  const navigation = useNavigation();

  const showConfirmDialog = () => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove this car?",
      [
        {
          text: "Yes",
          onPress: () => {
            deleteCar(item._id);
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  return (
    <View style={styles.item}>
      <View style={styles.iconContainer}>
        <Pressable onPress={() => showConfirmDialog()}>
          <FontAwesome name="trash-o" size={24} color="black" />
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate("Update Car", {
              car: item,
            })
          }
        >
          <FontAwesome name="edit" size={24} color="black" />
        </Pressable>
      </View>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginBottom: 20,
          marginTop: -10,
        }}
      >
        <Text style={[styles.name, { fontWeight: "bold", fontSize: 20 }]}>
          {item.brand}
        </Text>
        <Text style={[styles.name, { fontWeight: "bold", fontSize: 20 }]}>
          {item.name}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>Production Year</Text>
        <Text style={styles.name}>{item.productionYears}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Clinder Volume</Text>

        {item.cylinderVolume === "none" ? (
          <Text style={styles.name}>-</Text>
        ) : (
          <Text style={styles.name}>
            {item.cylinderVolume} <Text style={styles.small}>cm3</Text>
          </Text>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Maximum Horsepower</Text>
        <Text style={styles.name}>
          {item.maximumHorsepower} <Text style={styles.small}>PS</Text>{" "}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Weight</Text>
        <Text style={styles.name}>
          {item.weight} <Text style={styles.small}>kg</Text>
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Fuel Consumption Average</Text>
        {item.fuelConsumptionAverage === "none" ? (
          <Text style={styles.name}>-</Text>
        ) : (
          <Text style={styles.name}>
            {item.fuelConsumptionAverage}{" "}
            <Text style={styles.small}>L/100km</Text>
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 5,
    marginHorizontal: 20,
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
    fontSize: 18,
    color: "black",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },

  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },

  iconContainer: {
    position: "absolute",
    top: 20,
    right: 15,
    flexDirection: "row",
    gap: 15,
    width: 60,
    zIndex: 2,
    justifyContent: "flex-end",
  },
  small: {
    fontSize: 12,
  },
});
