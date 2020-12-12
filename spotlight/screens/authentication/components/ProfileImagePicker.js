import React, { useState, useEffect, useContext } from "react";
import { View, TouchableHighlight, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Avatar } from "react-native-paper";
import { getUser, uploadUserImage } from "../../../services/userService";
import { AuthContext } from "../EmailContext/AuthProvider";

const DEFAULT_PROFILE = "../../../assets/profile_picture.png";

const ProfileImagePicker = ({ setImageURL, defaultImage }) => {
  const [image, setImage] = useState(defaultImage);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      await ImagePicker.requestCameraRollPermissionsAsync();
      await ImagePicker.requestCameraPermissionsAsync();
      // const userData = await getUser(user.uid);
      // setImageURL(userData.profilePicture);
      // setImage(userData.profilePicture);
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

  const takeImage = async () => {
    try {
      const cameraResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [3, 3],
      });
      if (!cameraResult.cancelled) {
        await handleImagePicked(cameraResult);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleImagePicked = async (pickerResult) => {
    try {
      const uploadURL = await uploadUserImage(pickerResult.uri);
      // Uses the image in local.
      setImage(pickerResult.uri);
      // Gives download link to parent to store in database.
      setImageURL(uploadURL);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <View style={styles.container}>
      {!image ? (
        <Avatar.Image source={require(DEFAULT_PROFILE)} />
      ) : (
        <Avatar.Image source={{ uri: image }} />
      )}
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          onPress={pickImage}
          underlayColor={"#DDDDDD"}
          style={styles.button}
        >
          <View style={styles.pickImageContainer}>
            <Text style={styles.pickImage}>{"Choose from camera roll"}</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={takeImage}
          underlayColor={"#DDDDDD"}
          style={styles.button}
        >
          <View style={styles.pickImageContainer}>
            <Text style={styles.pickImage}>{"Take photo"}</Text>
          </View>
        </TouchableHighlight>
      </View>
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
  button: {
    borderRadius: 2,
  },
  pickImage: {
    fontSize: 15,
    color: "blue",
    fontWeight: "bold",
  },
  pickImageContainer: {
    marginTop: "1%",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export { ProfileImagePicker };
