import { View, Text } from "react-native";
import React, { useState } from "react";
import { useStore } from "../store";
import { SafeAreaView } from "react-native";
import { FlatList } from "react-native";
import { TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Comparasion({ navigation }) {
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState(cars);
  const cars = useStore((state) => state.cars);
  const setCompareTwoCar = useStore((state) => state.setCompareTwoCar);
  const compareTwoCar = useStore((state) => state.compareTwoCar);

  const searchFilter = (text) => {
    if (text) {
      const newData = cars.filter((item) => {
        const itemData = `${item.brand.toUpperCase()} ${item.name.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(cars);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => setCompareTwoCar(item)} style={styles.itemStyle}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginRight: 20,
          }}
        >
          <Text >
            {item.brand} {item.name}{" "}
          </Text>
          {compareTwoCar.includes(item) && (
            <MaterialIcons name="done" size={18} color="black" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const itemSeperatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "black",
        }}
      />
    );
  };

  const getCompareTwoCar = () => {
    setSearch("");
    navigation.navigate("Compare Cars");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.compareContainer}>
          <View style={styles.compareItem}>
            <Text>First Car</Text>
            {compareTwoCar && compareTwoCar.length > 0 ? (
              <TouchableOpacity
                onPress={() => setCompareTwoCar(compareTwoCar[0])}
              >
                <Image
                  source={{ uri: compareTwoCar[0]?.imageUrl }}
                  style={styles.image}
                />
              </TouchableOpacity>
            ) : (
              <View style={styles.placeholder} />
            )}
            <Text style={{ fontSize: 18 }}>{compareTwoCar[0]?.name}</Text>
          </View>
          <View style={styles.compareItem}>
            <Text>Second Car</Text>
            {compareTwoCar && compareTwoCar.length > 1 ? (
              <TouchableOpacity
                onPress={() => setCompareTwoCar(compareTwoCar[1])}
              >
                <Image
                  source={{ uri: compareTwoCar[1]?.imageUrl }}
                  style={styles.image}
                />
              </TouchableOpacity>
            ) : (
              <View style={styles.placeholder} />
            )}
            <Text style={{ fontSize: 18 }}>{compareTwoCar[1]?.name}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            compareTwoCar.length < 2 && styles.disabledButton,
          ]}
          disabled={compareTwoCar.length < 2}
          onPress={getCompareTwoCar}
        >
          <Text style={styles.buttonText}>Compare</Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Search Here"
          value={search}
          onChangeText={(text) => searchFilter(text)}
          style={styles.textInputStyle}
          underlineColorAndroid="transparent"
        />
        <FlatList
          data={filteredDataSource}
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={itemSeperatorView}
          initialNumToRender={10}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgray",
    flex: 1,
  },

  compareContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  compareItem: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },

  itemStyle: {
    padding: 15,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#009688",
    backgroundColor: "#FFFFFF",
    borderRadius:10
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  placeholder: {
    width: 150,
    height: 150,
    backgroundColor: "gray",
  },
  button: {
    backgroundColor: "#222865",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "gray",
  },
});
