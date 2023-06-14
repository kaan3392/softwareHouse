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
} from "react-native";
import { Image } from "react-native";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.config";
import { useStore } from "../store";

export function AddCar({ navigation }) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [productionYears, setProductionYears] = useState("");
  const [cylinderVolume, setCylinderVolume] = useState("");
  const [maximumHorsepower, setMaximumHorsepower] = useState("");
  const [weight, setWeight] = useState("");
  const [fuelConsumptionAverage, setFuelConsumptionAverage] = useState("");
  const [image, setImage] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const addCar = useStore((state) => state.addCar);


  const handleSubmit = async () => {
    const car = {
      name: name,
      brand: brand,
      productionYears: productionYears,
      cylinderVolume: cylinderVolume,
      maximumHorsepower: maximumHorsepower,
      weight: weight,
      fuelConsumptionAverage: fuelConsumptionAverage,
      imageUrl: image,
    };

    await addCar(car);

    navigation.navigate("Cars");
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
        const uploadURL = await uploadImageAsync(result.assets[0].uri);
        setImage(uploadURL);
      } else {
        setImage(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsImageLoading(false);
    }
  };

  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    try {
      const storageRef = ref(storage, `image_${Date.now()}`);
      const result = await uploadBytes(storageRef, blob);

      blob.close();

      return await getDownloadURL(result.ref);
    } catch (error) {
      alert(`Error: ${error}`);
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView styles={styles.mainContainer}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
          <View style={styles.container}>
            <Text style={styles.title}>Add Car</Text>
            <View style={styles.inputMainContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  onChangeText={(text) => setName(text)}
                  style={styles.textInput}
                  placeholder="Brand"
                  name="brand"
                />
                <TextInput
                  onChangeText={(text) => setBrand(text)}
                  style={styles.textInput}
                  placeholder="Name"
                  name="name"
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Production Year"
                  onChangeText={(text) => setProductionYears(text)}
                  name="productionYears"
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Cylinder Volume"
                  onChangeText={(text) => setCylinderVolume(text)}
                  name="cylinderVolume"
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Maximum Horsepower"
                  onChangeText={(text) => setMaximumHorsepower(text)}
                  name="maximumHorsepower"
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Weight"
                  onChangeText={(text) => setWeight(text)}
                  name="weight"
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Fuel Consumption Average"
                  onChangeText={(text) => setFuelConsumptionAverage(text)}
                  name="fuelConsumptionAverage"
                />
              </View>
              {!image ? (
                <TouchableOpacity
                  onPress={pickImage}
                  style={styles.imagePlaceholde}
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
                  source={{ uri: image }}
                  style={{ width: 200, height: 200, alignSelf: "center" }}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text>Add Car</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setImage(null)}
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
    padding: 20,
  },
  inputMainContainer: {
    flex: 1,
    padding: 20,
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
  },

  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
    width: "40%",
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
    width: 200,
    height: 200,
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
