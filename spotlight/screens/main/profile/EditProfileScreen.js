import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../authentication/EmailContext/AuthProvider";
import { TextInput, Button, RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { createNewUser, updateUserInfo } from "../../../services/userService";
import CountryPicker from "react-native-country-picker-modal";
import Constants from "expo-constants";
import { getUser } from "../../../services/userService";

import { AddressInput } from "../../authentication/components/AddressInput";
import { DateOfBirthInput } from "../../authentication/components/DateOfBirthInput";
import { GenderInput } from "../../authentication/components/GenderInput";
import { PhoneInput } from "../../authentication/components/PhoneInput";
import { BioInput } from "../../authentication/components/BioInput";
import { ProfileImagePicker } from "../../authentication/components/ProfileImagePicker";
import { UpdateNameInput } from "./components/UpdateNameInput";
import { CountryInput } from "../../authentication/components/CountryInput";

const EditProfileScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);

  const { email } = user.email;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [country, setCountry] = useState(null);
  const [countryText, setCountryText] = useState("");

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCountry(country);
    setCountryText(country.name);
  };

  // Date
  const today = new Date();
  const [date, setDate] = useState(today);
  const [show, setShow] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const register = () => {
    (async () => {
      await updateUserInfo(
        {
          address: address,
          age: moment(new Date()).diff(date, "years"),
          bio: bio,
          city: city,
          country: countryText,
          dateOfBirth: date,
          email: user.email,
          firstName: firstName,
          gender: gender,
          lastName: lastName,
          phoneNumber: phoneNumber,
          profilePicture: imageURL,
          province: province,
          userID: user.uid,
          username: username,
          zip: zip,
        },
        user.uid
      );
    })();
    navigation.navigate("ProfileScreen", { zip: zip });
  };

  const cancel = () => {
    navigation.navigate("ProfileScreen");
  };

  useEffect(() => {
    (async () => {
      const userData = await getUser(user.uid);
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setUsername(userData.username);
      setGender(userData.gender);
      setImageURL(userData.profilePicture);
      setAddress(userData.address);
      setProvince(userData.province);
      setZip(userData.zip);
      setCity(userData.city);
      setPhoneNumber(userData.phoneNumber);
      setBio(userData.bio);
      setCountryText(userData.country);

      setDate(userData.dateOfBirth.toDate());
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.title}>Update your spotlight account</Text>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <ProfileImagePicker setImageURL={(newPic) => setImageURL(newPic)} />
          <UpdateNameInput
            firstName={firstName}
            onChangeFirstName={(newFirstName) => setFirstName(newFirstName)}
            lastName={lastName}
            onChangeLastName={(newLastName) => setLastName(newLastName)}
            userName={username}
            onChangeUserName={(newUsername) => setUsername(newUsername)}
            email={email}
          />

          <View>
            <Text>{countryText}</Text>
            <CountryInput
              country={country}
              countryCode={countryCode}
              onSelect={onSelect}
            />
          </View>

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

          <BioInput bio={bio} onChangeBio={(newBio) => setBio(newBio)} />

          <View style={styles.header}>
            <Button
              style={styles.register}
              icon="account-plus"
              mode="contained"
              onPress={register}
            >
              <Text>UPDATE MY ACCOUNT!</Text>
            </Button>
            <Button style={styles.cancel} mode="contained" onPress={cancel}>
              <Text style={{ fontSize: 10, color: "red" }}>CANCEL</Text>
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
    backgroundColor: "salmon",
  },
  cancel: {
    borderWidth: 1,
    marginTop: 10,
    borderColor: "salmon",
    backgroundColor: "white",
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
