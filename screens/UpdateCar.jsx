import React, { useState } from "react";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";

import { useStore } from "../store";
import { useHeaderHeight } from "@react-navigation/elements";
import { uploadImageAsync } from "../utils/uploadImageToFirebase";

export function UpdateCar({ route, navigation }) {
  const { car } = route.params;
  const [imageUri, setImageUri] = useState(car.imageUrl);
  const [name, setName] = useState(car.name);
  const [brand, setBrand] = useState(car.brand);
  const [productionYears, setProductionYears] = useState(car.productionYears);
  const [cylinderVolume, setCylinderVolume] = useState(car.cylinderVolume);
  const [maximumHorsepower, setMaximumHorsepower] = useState(
    car.maximumHorsepower
  );
  const [weight, setWeight] = useState(car.weight);
  const [fuelConsumptionAverage, setFuelConsumptionAverage] = useState(
    car.fuelConsumptionAverage
  );
  const [isImageLoading, setIsImageLoading] = useState(false);

  const updateCar = useStore((state) => state.updateCar);
  const carUpdateLoading = useStore((state) => state.carUpdateLoading);
  const height = useHeaderHeight();

  const handleSubmit = async () => {
    try {
      let uploadURL = car.imageUrl;

      if (imageUri !== car.imageUrl && imageUri !== null) {
        uploadURL = await uploadImageAsync(imageUri);
      }

      const updatedCar = {
        name: name,
        brand: brand,
        productionYears: productionYears,
        cylinderVolume: cylinderVolume,
        maximumHorsepower: maximumHorsepower,
        weight: weight,
        fuelConsumptionAverage: fuelConsumptionAverage,
        imageUrl: uploadURL,
      };
      await updateCar(updatedCar, car._id);
      navigation.navigate("Cars");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const pickImage = async () => {
    setIsImageLoading(true);
    // No permissions request is necessary for launching the image library
    try {
      let result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log(result);
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      } else {
        setImageUri(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsImageLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView styles={styles.scrollView}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={-height * 2}
          style={{ flex: 1 }}
          behavior="position"
        >
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <View style={styles.inputItem}>
                <Text>Brand</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Brand"
                  defaultValue={car.brand}
                  onChangeText={(text) => setBrand(text)}
                />
              </View>
              <View style={styles.inputItem}>
                <Text>Name</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Name"
                  defaultValue={car.name}
                  onChangeText={(text) => setName(text)}
                />
              </View>

              <View style={styles.inputItem}>
                <Text>Production Year </Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Production Year"
                  defaultValue={car.productionYears}
                  onChangeText={(text) => setProductionYears(text)}
                  maxLength={4}
                />
              </View>
              <View style={styles.inputItem}>
                <Text>Cylinder Volume</Text>

                <TextInput
                  style={styles.textInput}
                  placeholder="Cylinder Volume"
                  defaultValue={car.cylinderVolume}
                  onChangeText={(text) => setCylinderVolume(text)}
                  maxLength={4}
                />
              </View>
              <View style={styles.inputItem}>
                <Text>Maximum Horsepower</Text>

                <TextInput
                  style={styles.textInput}
                  placeholder="Maximum Horsepower"
                  defaultValue={car.maximumHorsepower}
                  onChangeText={(text) => setMaximumHorsepower(text)}
                  maxLength={4}
                />
              </View>
              <View style={styles.inputItem}>
                <Text>Weight</Text>

                <TextInput
                  style={styles.textInput}
                  placeholder="Weight"
                  defaultValue={car.weight}
                  onChangeText={(text) => setWeight(text)}
                  maxLength={4}
                />
              </View>
              <View style={styles.inputItem}>
                <Text>Fuel Consumption Average</Text>

                <TextInput
                  style={styles.textInput}
                  placeholder="Fuel Consumption Average"
                  defaultValue={car.fuelConsumptionAverage}
                  onChangeText={(text) => setFuelConsumptionAverage(text)}
                  maxLength={4}
                />
              </View>
            </View>
            {!imageUri ? (
              <TouchableOpacity
                onPress={pickImage}
                style={styles.imagePlaceholde}
              >
                {isImageLoading ? (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ActivityIndicator size="large" animating color="gray" />
                  </View>
                ) : (
                  <Text>Pick an Image</Text>
                )}
              </TouchableOpacity>
            ) : (
              <Image
                source={{ uri: imageUri }}
                style={{
                  width: 150,
                  height: 150,
                  alignSelf: "center",
                  resizeMode: "contain",
                }}
              />
            )}

            <View style={styles.buttonContainer}>
              {carUpdateLoading ? (
                <TouchableOpacity
                  disabled={carUpdateLoading}
                  style={styles.button}
                >
                  <ActivityIndicator size="large" animating color="white" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text>Update Car</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.button}
                onPress={() => setImageUri(null)}
              >
                <Text>Remove Image</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "lightgray",
  },
  scrollView: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: "lightgray",
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },

  inputContainer: {
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  inputItem: {
    marginBottom: 10,
    gap: 5,
    width: "40%",
  },

  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },

  button: {
    alignItems: "center",
    backgroundColor: "gray",
    height: 40,
    width: 150,
    marginTop: 10,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 5,
  },
  imagePlaceholde: {
    width: 150,
    height: 150,
    backgroundColor: "#E1E1E1",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    alignSelf: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "black",
  },
});
