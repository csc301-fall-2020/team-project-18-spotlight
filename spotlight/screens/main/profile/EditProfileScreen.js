import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../authentication/EmailContext/AuthProvider";
import { Button } from "react-native-paper";
import moment from "moment";
import { updateUserInfo } from "../../../services/userService";
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

  const email = user.email;
  const [firstName, setFirstName] = useState(route.params.firstName);
  const [lastName, setLastName] = useState(route.params.lastName);
  const [username, setUsername] = useState(route.params.username);
  const [gender, setGender] = useState(route.params.gender);
  const [imageURL, setImageURL] = useState(route.params.profilePicture);
  const [address, setAddress] = useState(route.params.address);
  const [province, setProvince] = useState(route.params.province);
  const [zip, setZip] = useState(route.params.zip);
  const [city, setCity] = useState(route.params.city);
  const [phoneNumber, setPhoneNumber] = useState(route.params.phoneNumber);
  const [bio, setBio] = useState(route.params.bio);
  const [countryCode, setCountryCode] = useState("");
  const [country, setCountry] = useState(null);
  const [countryText, setCountryText] = useState(route.params.country);

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCountry(country);
    setCountryText(country.name);
  };

  // Date
  const [date, setDate] = useState(route.params.dateOfBirth);
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
          dateOfBirth: date ?? user.dateOfBirth,
          email: user.email,
          firstName: firstName,
          gender: gender,
          lastName: lastName,
          phoneNumber: phoneNumber,
          profilePicture: imageURL,
          province: province,
          username: username,
          zip: zip,
        },
        user.uid
      );
    })();
    navigation.navigate("ProfileScreen");
  };

  const cancel = () => {
    navigation.navigate("ProfileScreen");
  };

  // useEffect(() => {
  //   (async () => {
  //     const userData = await getUser(user.uid);
  //     setFirstName(userData.firstName);
  //     setLastName(userData.lastName);
  //     setUsername(userData.username);
  //     setGender(userData.gender);
  //     setImageURL(userData.profilePicture);
  //     setAddress(userData.address);
  //     setProvince(userData.province);
  //     setZip(userData.zip);
  //     setCity(userData.city);
  //     setPhoneNumber(userData.phoneNumber);
  //     setBio(userData.bio);
  //     setCountryText(userData.country);
  //     setDate(userData.dateOfBirth.toDate());
  //   })();
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.title}>Update your spotlight account</Text>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <ProfileImagePicker
            defaultImage={imageURL}
            setImageURL={(newPic) => setImageURL(newPic)}
          />
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
