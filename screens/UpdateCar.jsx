import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";

export function UpdateCar({ route }) {
  const { car } = route.params;
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView styles={styles.mainContainer}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
          <View style={styles.container}>
            <Text style={styles.title}>Update Car</Text>
            <View style={styles.inputContainer}>
              <View style={styles.inputItem}>
                <Text>Brand</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Brand"
                  defaultValue={car.brand}
                />
              </View>
              <View style={styles.inputItem}>
                <Text>Name</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Name"
                  defaultValue={car.name}
                />
              </View>

              <View style={styles.inputItem}>
                <Text>Production Year </Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Production Year"
                  defaultValue={car.productionYears}
                />
              </View>
              <View style={styles.inputItem}>
                <Text>Cylinder Volume</Text>

                <TextInput
                  style={styles.textInput}
                  placeholder="Cylinder Volume"
                  defaultValue={car.cylinderVolume}
                />
              </View>
              <View style={styles.inputItem}>
                <Text>Maximum Horsepower</Text>

                <TextInput
                  style={styles.textInput}
                  placeholder="Maximum Horsepower"
                  defaultValue={car.maximumHorsepower}
                />
              </View>
              <View style={styles.inputItem}>
                <Text>Weight</Text>

                <TextInput
                  style={styles.textInput}
                  placeholder="Weight"
                  defaultValue={car.weight}
                />
              </View>
              <View style={styles.inputItem}>
                <Text>Fuel Consumption Average</Text>

                <TextInput
                  style={styles.textInput}
                  placeholder="Fuel Consumption Average"
                  defaultValue={car.fuelConsumptionAverage}
                />
              </View>
              <View style={styles.inputItem}>
                <Text>Image Url</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Image Url"
                  defaultValue={car.imageUrl}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Alert.alert("Simple Button pressed")}
            >
              <Text>Update Car</Text>
            </TouchableOpacity>
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
    justifyContent: "center",
    gap: 20,
    width: 150,
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
});
