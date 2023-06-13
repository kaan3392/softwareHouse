import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  Button,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React from "react";
import { useStore } from "../store";

export default function AddCarModal() {
  const notCarModalVisible = useStore((state) => state.notCarModalVisible);
  const isCarModalVisible = useStore((state) => state.isCarModalVisible);

  const addCar = () => {
    console.log("add car");
  };

  return (
    <Modal
      style={styles.mainContainer}
      visible={isCarModalVisible}
      animationType="slide"
    >
      <KeyboardAvoidingView
        behavior="padding"
        enabled={true}
        style={styles.mainContainer}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Add Car</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.textInput} placeholder="Brand" />
            <TextInput style={styles.textInput} placeholder="Name" />
            <TextInput style={styles.textInput} placeholder="Production Year" />
            <TextInput style={styles.textInput} placeholder="Cylinder Volume" />
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
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: "lightgray",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.25,
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
