// import { AddressInput } from "../../authentication/components/AddressInput";
// import { DateOfBirthInput } from "../../authentication/components/DateOfBirthInput";
// import { GenderInput } from "../../authentication/components/GenderInput";
// import { PhoneInput } from "../../authentication/components/PhoneInput";
// import { BioInput } from "../../authentication/components/BioInput";
// import { ProfileImagePicker } from "../../authentication/components/ProfileImagePicker";
// import { NameInput } from "../../authentication/components/NameInput";
// import { CountryInput } from "../../authentication/components/CountryInput";

// import React, { useState, useContext, useEffect } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   KeyboardAvoidingView,
// } from "react-native";
// import moment from "moment";
// import { Button } from "react-native-paper";
// import { SafeAreaView } from "react-native-safe-area-context";

// const textinfo =
//   "Hey, I’m Laura! I love cycling and my dog Francis. I’m usually at the gym every weekday morning, Lmk if you wanna do some workouts together!";

// const EditProfileScreen = ({ route, navigation }) => {
//   const [nickname, setNickname] = useState("");
//   const [name, setName] = useState("");
//   const [gender, setGender] = useState("");
//   const [description, setDescription] = useState("");
//   const [birthday, setBirthday] = useState("");
//   const [age, setAge] = useState("");

//   const save = () => {
//     setNickname("");
//     setName("");
//     setGender("");
//     setDescription("");
//     setBirthday("");
//     setAge("");

//     navigation.navigate("ProfileScreen", {
//       nickname: nickname,
//       name: name,
//       gender: gender,
//       description: description,
//       birthday: birthday,
//       age: age,
//     });
//   };

//   const cancel = () => {
//     setNickname("");
//     setName("");
//     setGender("");
//     setDescription("");
//     setBirthday("");
//     setAge("");

//     navigation.navigate("ProfileScreen");
//   };

//   if (route.params != undefined) {
//     const { nickname, name, gender, description, birthday, age } = route.params;
//     setNickname(nickname);
//     setName(name);
//     setGender(gender);
//     setDescription(description);
//     setBirthday(birthday);
//     setAge(age);

//     route.params = undefined;
//   }

//   return (
//     <KeyboardAvoidingView style={styles.container}>
//       <SafeAreaView style={styles.changeInfo}>
//         <View style={styles.textInput}>
//           <Text style={styles.text}>Change nickname:</Text>
//           <TextInput
//             style={styles.input}
//             placeholder={nickname}
//             onChangeText={(value) => {
//               setNickname(value);
//             }}
//             value={nickname}
//           />
//         </View>

//         <View style={styles.textInput}>
//           <Text style={styles.text}>Change name:</Text>
//           <TextInput
//             style={styles.input}
//             placeholder={name}
//             onChangeText={(value) => {
//               setName(value);
//             }}
//             value={name}
//           />
//         </View>

//         <View style={styles.textInput}>
//           <Text style={styles.text}>Change birthday:</Text>
//           <TextInput
//             style={styles.input}
//             placeholder={birthday}
//             onChangeText={(value) => {
//               setBirthday(value);
//             }}
//             value={birthday}
//           />
//         </View>

//         <View style={styles.GenderAge}>
//           <View style={styles.textInput}>
//             <Text style={styles.text}>Change gender:</Text>
//             <TextInput
//               style={styles.gainput}
//               placeholder={gender}
//               onChangeText={(value) => {
//                 setGender(value);
//               }}
//               value={gender}
//             />
//           </View>

//           <View style={styles.textInput}>
//             <Text style={styles.text}>Change age:</Text>
//             <TextInput
//               style={styles.gainput}
//               placeholder={age}
//               onChangeText={(value) => {
//                 setAge(value);
//               }}
//               value={age}
//             />
//           </View>
//         </View>

//         <View style={styles.textInput}>
//           <Text style={styles.text}>Change description:</Text>
//           <TextInput
//             style={styles.description}
//             placeholder={description}
//             onChangeText={(value) => {
//               setDescription(value);
//             }}
//             value={description}
//             multiline={true}
//           />
//         </View>


//         <Button
//           style={styles.save}
//           icon="content-save"
//           mode="contained"
//           onPress={() => save()}
//         >
//           <Text style={{ fontSize: 15 }}>Update</Text>
//         </Button>

//         <Button
//           style={styles.cancel}
//           color="red"
//           onPress={() => cancel()}
//         >
//           <Text style={{ fontSize: 13 }}>Cancel</Text>
//         </Button>
//       </SafeAreaView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "lightgrey",
//     flex: 1,
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//   },
//   GenderAge: {
//     flexDirection: "row",
//     alignContent: "space-between",
//     justifyContent: "space-between",
//   },
//   gainput: {
//     borderWidth: 1,
//     width: 140,
//     color: "black",
//     paddingHorizontal: 10,
//     borderRadius: 8,
//     marginRight: 10,
//   },
//   textInput: {
//     marginBottom: 10,
//   },
//   input: {
//     borderWidth: 1,
//     width: 300,
//     color: "black",
//     paddingHorizontal: 10,
//     borderRadius: 8,
//   },
//   description: {
//     borderWidth: 1,
//     width: 300,
//     color: "black",
//     height: 200,
//     textAlignVertical: "top",
//     borderRadius: 8,
//     padding: 10,
//   },
//   changePassword: {
//     top: 80,
//   },
//   changeInfo: {
//     flexDirection: "column",
//     top: 20,
//     alignItems: "center",
//     justifyContent: "center",
//     borderColor: "grey",
//     borderWidth: 2,
//     borderRadius: 40,
//     backgroundColor: "white",
//     width: "95%",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.22,
//     shadowRadius: 2.22,
//     elevation: 3,
//     zIndex: 3,
//     padding: 10,
//   },
//   text: {
//     color: "#A20A0A",
//   },
//   save: {
//     borderRadius: 50,
//     marginBottom: 10,
//   },
//   cancel: {
//     color: "red",
//   },
// });

// export default EditProfileScreen;

import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../authentication/EmailContext/AuthProvider";
import { TextInput, Button, RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { createNewUser, updateUserInfo } from "../../../services/userService";
import CountryPicker from "react-native-country-picker-modal";
import Constants from "expo-constants";


import { AddressInput } from "../../authentication/components/AddressInput";
import { DateOfBirthInput } from "../../authentication/components/DateOfBirthInput";
import { GenderInput } from "../../authentication/components/GenderInput";
import { PhoneInput } from "../../authentication/components/PhoneInput";
import { BioInput } from "../../authentication/components/BioInput";
import { ProfileImagePicker } from "../../authentication/components/ProfileImagePicker";
import { UpdateNameInput } from "./components/UpdateNameInput";
import { CountryInput } from "../../authentication/components/CountryInput";

const EditProfileScreen = ({ route, navigation }) => {
  const { email } = route.params;

  const [firstName, setFirstName] = useState(route.params.firstName);
  const [lastName, setLastName] = useState(route.params.lastName);
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("male");
  const [imageURL, setImageURL] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");

  // Country
  const [countryCode, setCountryCode] = useState("");
  const [country, setCountry] = useState(null);

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCountry(country);
  };

  // Date
  const today = new Date();
  const [date, setDate] = useState(today);
  const [show, setShow] = useState(false);

  // Register
  const { user } = useContext(AuthContext);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const register = () => {
    (async () => {
      await updateUserInfo(
        {
          profilePicture: imageURL,
          firstName,
          lastName,
          username,
          email,
          country: country.name,
          address,
          city,
          province,
          zip,
          dateOfBirth: date,
          age: moment(new Date()).diff(date, "years"),
          gender,
          phoneNumber,
        },
        user.uid
      );
    })();
  };

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.title}>Update your spotlight account</Text>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <ProfileImagePicker setImageURL={() => setImageURL} />
            <UpdateNameInput
              firstName={firstName}
              onChangeFirstName={(newFirstName) => setFirstName(newFirstName)}
              lastName={lastName}
              onChangeLastName={(newLastName) => setLastName(newLastName)}
              userName={username}
              onChangeUserName={(newUsername) => setUsername(newUsername)}
              email={email}
            />

            <CountryInput
              country={country}
              countryCode={countryCode}
              onSelect={onSelect}
            />
            <AddressInput
              address={address}
              onChangeAddress={(newAddress) => setAddress(newAddress)}
              city={city}
              onChangeCity={(newCity) => setCity(newCity)}
              province={province}
              onChangeProvince={(newProvince) => setProvince(newProvince)}
              zip={zip}
              onChangeZip={(newZip) => setZip(newZip)}
            />

            <DateOfBirthInput
              date={date}
              show={show}
              setShow={(newShow) => setShow(newShow)}
              onChangeDate={onChangeDate}
            />

            <GenderInput
              gender={gender}
              onValueChange={(newGender) => setGender(newGender)}
            />

            <PhoneInput
              phoneNumber={phoneNumber}
              onChangePhoneNumber={(newPhoneNumber) =>
                setPhoneNumber(newPhoneNumber)
              }
            />

            <BioInput 
              bio={bio}
              onChangeBio={(newBio) =>
                setBio(newBio)
              }
            />

            <View style={styles.header}>
              <Button
                style={styles.register}
                icon="account-plus"
                mode="contained"
                onPress={register}
              >
                <Text>I&apos;m ready!</Text>
              </Button>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginTop: 5,
    marginBottom: 5,
  },
  headerTitle: {
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: 5,
    marginBottom: 5,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 20,
    textAlign: "center",
  },
 
  instructions: {
    fontSize: 12,
    textAlign: "center",
    color: "#888",
    marginBottom: 5,
  },

  register: {
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "green",
  },
  info: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 15,
    paddingVertical: 40,
    paddingHorizontal: 20,
    width: "90%",
    marginVertical: 60,
    marginHorizontal: "auto",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    zIndex: 3,
  },
});

export default EditProfileScreen;
