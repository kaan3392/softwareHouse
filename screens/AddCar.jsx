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
  Alert,
} from "react-native";
import { Image } from "react-native";
import { useStore } from "../store";
import { uploadImageAsync } from "../utils/uploadImageToFirebase";

export function AddCar({ navigation }) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [productionYears, setProductionYears] = useState("");
  const [cylinderVolume, setCylinderVolume] = useState("");
  const [maximumHorsepower, setMaximumHorsepower] = useState("");
  const [weight, setWeight] = useState("");
  const [fuelConsumptionAverage, setFuelConsumptionAverage] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  const addCar = useStore((state) => state.addCar);
  const carAddLoading = useStore((state) => state.carAddLoading);

  const handleSubmit = async () => {
    try {
      const uploadURL = await uploadImageAsync(imageUri);

      const car = {
        name,
        brand,
        productionYears,
        cylinderVolume,
        maximumHorsepower,
        weight,
        fuelConsumptionAverage,
        imageUrl: uploadURL,
      };
      await addCar(car);
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
      Alert.alert("Error", error.message);
    } finally {
      setIsImageLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView styles={styles.mainContainer}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
          <View style={styles.container}>
            <View style={styles.inputMainContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => setName(text)}
                  placeholder="Brand"
                />
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => setBrand(text)}
                  placeholder="Name"
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Production Year"
                  onChangeText={(text) => setProductionYears(text)}
                  maxLength={4}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Cylinder Volume"
                  onChangeText={(text) => setCylinderVolume(text)}
                  maxLength={4}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Maximum Horsepower"
                  onChangeText={(text) => setMaximumHorsepower(text)}
                  maxLength={4}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Weight"
                  onChangeText={(text) => setWeight(text)}
                  maxLength={4}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Fuel Consumption Average"
                  onChangeText={(text) => setFuelConsumptionAverage(text)}
                  maxLength={4}
                />
              </View>
              {!imageUri ? (
                <TouchableOpacity
                  onPress={pickImage}
                  style={styles.imagePlaceholder}
                >
                  {isImageLoading ? (
                    <View
                      style={{ alignItems: "center", justifyContent: "center" }}
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
            </View>
            <View style={styles.buttonContainer}>
              {carAddLoading ? (
                <TouchableOpacity
                  disabled={carAddLoading}
                  style={styles.button}
                  onPress={handleSubmit}
                >
                  <ActivityIndicator size="large" animating color="white" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text>Add Car</Text>
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

  mainContainer: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: "lightgray",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  inputMainContainer: {
    flex: 1,
    paddingVertical: 20,
    borderRadius: 5,
    gap: 20,
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
    alignItems: "center",
    gap: 10,
  },

  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
    width: "45%",
    fontSize: 13,
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

  imagePlaceholder: {
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
