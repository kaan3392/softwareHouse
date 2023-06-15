import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.config";
import { Alert } from "react-native";

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
      Alert.alert(`Error: ${error}`);
    }
  }

  export { uploadImageAsync};