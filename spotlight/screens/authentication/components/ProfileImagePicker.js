import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TouchableHighlight,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Avatar } from "react-native-paper";
import { uploadUserImage } from "../../../services/userService";

const DEFAULT_PROFILE = "../../../assets/profile_picture.png";

const ProfileImagePicker = ({ setImageURL }) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    (async () => {
      await ImagePicker.requestCameraRollPermissionsAsync();
    })();
  }, []);

  const pickImage = async () => {
    try {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [3, 3],
      });
      if (!pickerResult.cancelled) {
        await handleImagePicked(pickerResult);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleImagePicked = async (pickerResult) => {
    const uploadURL = await uploadUserImage(pickerResult.uri);
    // Uses the image in local.
    await setImage(pickerResult.uri);
    // Gives download link to parent to store in database.
    await setImageURL(uploadURL);
  };

  return (
    <View style={styles.container}>
      {!image ? (
        <Avatar.Image source={require(DEFAULT_PROFILE)} />
      ) : (
        <Avatar.Image source={{ uri: image }} />
      )}
      <TouchableHighlight
        onPress={pickImage}
        underlayColor={"#DDDDDD"}
        style={{ borderRadius: 3 }}
      >
        <View style={styles.pickImageContainer}>
          <Text style={styles.pickImage}>{"Change profile picture"}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1%",
  },
  image: {},
  pickImage: {
    fontSize: 15,
    color: "blue",
    fontWeight: "bold",
  },
  pickImageContainer: {
    marginTop: "1%",
  },
});

export { ProfileImagePicker };
