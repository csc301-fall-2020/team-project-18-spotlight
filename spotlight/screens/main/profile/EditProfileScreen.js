import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Button } from "react-native-paper";
// import { Value } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
// import SelectPicker from 'react-native-select-picker';

const textinfo =
  "Hey, I’m Laura! I love cycling and my dog Francis. I’m usually at the gym every weekday morning, Lmk if you wanna do some workouts together!";

const EditProfileScreen = ({ route, navigation }) => {
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [birthday, setBirthday] = useState("");
  const [age, setAge] = useState("");

  const save = () => {
    setNickname("");
    setName("");
    setGender("");
    setDescription("");
    setBirthday("");
    setAge("");

    navigation.navigate("ProfileScreen", {
      nickname: nickname,
      name: name,
      gender: gender,
      description: description,
      birthday: birthday,
      age: age,
    });
  };

  const cancel = () => {
    setNickname("");
    setName("");
    setGender("");
    setDescription("");
    setBirthday("");
    setAge("");

    navigation.navigate("ProfileScreen");
  };

  if (route.params != undefined) {
    const { nickname, name, gender, description, birthday, age } = route.params;
    setNickname(nickname);
    setName(name);
    setGender(gender);
    setDescription(description);
    setBirthday(birthday);
    setAge(age);

    route.params = undefined;
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* <View style={styles.changePassword}>
                <View style={styles.textInput}>
                    <Text>
                        Change password:
                    </Text>
                    <TextInput
                        style={styles.input}
                    />
                </View>

                <View style={styles.textInput}>
                    <Text>
                        Confirm password:
                    </Text>
                    <TextInput
                        style={styles.input}
                    />
                </View>

                <Button>
                    Save
                </Button>

            </View> */}

      <SafeAreaView style={styles.changeInfo}>
        <View style={styles.textInput}>
          <Text style={styles.text}>Change nickname:</Text>
          <TextInput
            style={styles.input}
            placeholder={nickname}
            onChangeText={(value) => {
              setNickname(value);
            }}
            value={nickname}
          />
        </View>

        <View style={styles.textInput}>
          <Text style={styles.text}>Change name:</Text>
          <TextInput
            style={styles.input}
            placeholder={name}
            onChangeText={(value) => {
              setName(value);
            }}
            value={name}
          />
        </View>

        <View style={styles.textInput}>
          <Text style={styles.text}>Change birthday:</Text>
          <TextInput
            style={styles.input}
            placeholder={birthday}
            onChangeText={(value) => {
              setBirthday(value);
            }}
            value={birthday}
          />
        </View>

        <View style={styles.GenderAge}>
          <View style={styles.textInput}>
            <Text style={styles.text}>Change gender:</Text>
            <TextInput
              style={styles.gainput}
              placeholder={gender}
              onChangeText={(value) => {
                setGender(value);
              }}
              value={gender}
            />
          </View>

          <View style={styles.textInput}>
            <Text style={styles.text}>Change age:</Text>
            <TextInput
              style={styles.gainput}
              placeholder={age}
              onChangeText={(value) => {
                setAge(value);
              }}
              value={age}
            />
          </View>
        </View>

        <View style={styles.textInput}>
          <Text style={styles.text}>Change description:</Text>
          <TextInput
            style={styles.description}
            placeholder={description}
            onChangeText={(value) => {
              setDescription(value);
            }}
            value={description}
            multiline={true}
          />
        </View>

        {/* <Button
                    title="SAVE"
                    color="#A20A0A"
                    style={styles.save}
                    onPress={() => save()}
                /> */}

        <Button
          style={styles.save}
          icon="content-save"
          mode="contained"
          onPress={() => save()}
        >
          <Text style={{ fontSize: 15 }}>Update</Text>
        </Button>

        <Button
          style={styles.cancel}
          // icon="close-circle"
          // mode="outlined"
          color="red"
          onPress={() => cancel()}
        >
          <Text style={{ fontSize: 13 }}>Cancel</Text>
        </Button>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  GenderAge: {
    flexDirection: "row",
    alignContent: "space-between",
    justifyContent: "space-between",
  },
  gainput: {
    borderWidth: 1,
    width: 140,
    color: "black",
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  textInput: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    width: 300,
    color: "black",
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  description: {
    borderWidth: 1,
    width: 300,
    color: "black",
    height: 200,
    textAlignVertical: "top",
    borderRadius: 8,
    padding: 10,
  },
  changePassword: {
    top: 80,
  },
  changeInfo: {
    flexDirection: "column",
    top: 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 40,
    backgroundColor: "white",
    width: "95%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    zIndex: 3,
    padding: 10,
  },
  text: {
    color: "#A20A0A",
  },
  save: {
    borderRadius: 50,
    marginBottom: 10,
  },
  cancel: {
    color: "red",
  },
});

export default EditProfileScreen;
