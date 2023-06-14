import { create } from "zustand";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
export const useStore = create((set, get) => ({
  user: null,
  cars: [],
  carsLoading: false,
  carsError: null,
  carUpdateLoading: false,
  carUpdateError: null,
  carDeleteLoading: false,
  carDeleteError: null,
  carAddLoading: false,
  carAddError: null,
  isCarModalVisible: false,
  compareTwoCar: [],

  getAllCars: async () => {
    set((prev) => ({ ...prev, carsLoading: true }));
    try {
      await wait();
      const { data } = await axios.get(`http://10.0.2.2:5000/api/`);
      set((prev) => ({ ...prev, carsLoading: false, cars: data.data }));
    } catch (error) {
      set((prev) => ({ ...prev, carsLoading: false, carsError: error }));
    }
  },

  addCar: async (car) => {
    set((prev) => ({ ...prev, carAddLoading: true }));
    try {
      const { data } = await axios.post(`http://10.0.2.2:5000/api`, car);
      set((prev) => ({
        ...prev,
        carAddLoading: false,
        cars: [...prev.cars, data.data],
      }));
    } catch (error) {
      set((prev) => ({ ...prev, carAddLoading: false, carAddError: error }));
    }
  },
  deleteCar: async (carId) => {
    set((prev) => ({ ...prev, carDeleteLoading: true }));
    try {
      await axios.delete(`http://10.0.2.2:5000/api/${carId}/delete`);
      set((prev) => ({
        ...prev,
        carDeleteLoading: false,
        cars: prev.cars.filter((car) => car._id !== carId),
      }));
    } catch (error) {
      set((prev) => ({
        ...prev,
        carDeleteLoading: false,
        carDeleteError: error,
      }));
    }
  },
  updateCar: async (car, id) => {
    set((prev) => ({ ...prev, carUpdateLoading: true }));
    try {
      const { data } = await axios.put(
        `http://10.0.2.2:5000/api/${id}/update`,
        car
      );
      set((prev) => ({
        ...prev,
        carUpdateLoading: false,
        cars: prev.cars.map((car) => (car._id === id ? data.data : car)),
      }));
    } catch (error) {
      set((prev) => ({
        ...prev,
        carUpdateLoading: false,
        carUpdateError: error,
      }));
    }
  },
  getUser: async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      if (!storedUser) return;
      set((prev) => ({ ...prev, user: JSON.parse(storedUser) }));
    } catch (error) {
      console.log(error);
    }
  },
  setUser: async (user) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      set((prev) => ({ ...prev, user }));
    } catch (error) {
      console.log(error);
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem("user");
      set((prev) => ({ ...prev, user: null }));
    } catch (error) {
      console.log(error);
    }
  },
  carModalVisible: () => {
    console.log("add carrr");
    set((prev) => ({
      ...prev,
      isCarModalVisible: true,
    }));
  },
  notCarModalVisible: () => {
    set((prev) => ({
      ...prev,
      isCarModalVisible: false,
    }));
  },
  setCompareTwoCar: (car) => {
    if (get().compareTwoCar.length < 2) {
      set((prev) => ({
        ...prev,
        compareTwoCar: [...prev.compareTwoCar, car],
      }));
    } else {
      set((prev) => ({
        ...prev,
        compareTwoCar: prev.compareTwoCar.slice(1, 2).concat(car),
      }));
    }
  },
}));
