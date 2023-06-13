import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useStore } from "../store";
import { Platform } from "react-native";

export function AddCar() {
  const notCarModalVisible = useStore((state) => state.notCarModalVisible);

  const addCar = () => {
    console.log("add car");
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView styles={styles.mainContainer}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="position"
        >
          <View style={styles.container}>
            <Text style={styles.title}>Add Car</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.textInput} placeholder="Brand" />
              <TextInput style={styles.textInput} placeholder="Name" />
              <TextInput
                style={styles.textInput}
                placeholder="Production Year"
              />
              <TextInput
                style={styles.textInput}
                placeholder="Cylinder Volume"
              />
              <TextInput
                style={styles.textInput}
                placeholder="Maximum Horsepower"
              />
              <TextInput style={styles.textInput} placeholder="Weight" />
              <TextInput
                style={styles.textInput}
                placeholder="Fuel Consumption Average"
              />
              <TextInput style={styles.textInput} placeholder="Image Url" />
            </View>
            <View style={styles.buttonContainer}>
              <Button style={styles.button} title="Add Car" onPress={addCar} />
              <Button
                color={"gray"}
                style={styles.button}
                title="Cancel"
                onPress={notCarModalVisible}
              />
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

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },

  inputContainer: {
    width: "100%",
    marginBottom: 20,
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
  },
});
