import { create } from "zustand";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useStore = create((set) => ({
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
  // compareTwoCar:[],

  getAllCars: async () => {
    set((prev) => ({ ...prev, carsLoading: true }));
    try {
      const { data } = await axios.get(`http://10.0.2.2:5000/api/`);
      set((prev) => ({ ...prev, carsLoading: false, cars: data }));
    } catch (error) {
      set((prev) => ({ ...prev, carsLoading: false, carsError: true }));
    }
  },

  addCar: async (car) => {
    set((prev) => ({ ...prev, carAddLoading: true }));
    try {
      const { data } = await axios.post(`http://10.0.2.2:5000/api`, car);
      set((prev) => ({
        ...prev,
        carAddLoading: false,
        cars: [...prev.cars, data],
      }));
    } catch (error) {
      set((prev) => ({ ...prev, carAddLoading: false, carAddError: true }));
    }
  },
  deleteCar: async (carId) => {
    set((prev) => ({ ...prev, carDeleteLoading: true }));
    try {
      await axios.delete(`http://10.0.2.2:5000/api/${carId}/delete`);
      console.log("delete button")
      set((prev) => ({
        ...prev,
        carDeleteLoading: false,
        cars: prev.cars.filter((car) => car._id !== carId),
      }));
    } catch (error) {
      set((prev) => ({
        ...prev,
        carDeleteLoading: false,
        carDeleteError: true,
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
        cars: prev.cars.map((car) => (car._id === id ? data : car)),
      }));
    } catch (error) {
      set((prev) => ({
        ...prev,
        carUpdateLoading: false,
        carUpdateError: true,
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
  // compareTwoCars: (car1, car2) => {
  //   set((prev) => ({ ...prev, compareTwoCar: [car1, car2] }));
  // }
}));
