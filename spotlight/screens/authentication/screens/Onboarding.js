import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../EmailContext/AuthProvider";
import { Button } from "react-native-paper";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import { ProfileImagePicker } from "../components/ProfileImagePicker";
import { NameInput } from "../components/NameInput";
import { CountryInput } from "../components/CountryInput";
import { createUserInfo } from "../../../services/userService";

import { AddressInput } from "../components/AddressInput";
import { DateOfBirthInput } from "../components/DateOfBirthInput";
import { GenderInput } from "../components/GenderInput";
import { PhoneInput } from "../components/PhoneInput";
import { BioInput } from "../components/BioInput";

const MINIMUM_AGE = 16;

const Onboarding = ({ route, navigation }) => {
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
  const { setIsNewUser, user } = useContext(AuthContext);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const isMandatoryFields = () => {
    return (
      firstName && lastName && username && province && zip && city && country
    );
  };

  const getAge = () => {
    return moment(new Date()).diff(date, "years");
  };

  const register = () => {
    (async () => {
      await createUserInfo(
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
          age: getAge(),
          gender,
          phoneNumber,
          bio,
        },
        user.uid
      );
    })();
    setIsNewUser(false);
  };

  const _wrongMessage = () => {
    let errorMsg = "Please fill in the mandatory fields!";
    return <Text style={styles.errorMessage}>{errorMsg}</Text>;
  };

  return (
    <LinearGradient
      colors={["red", "salmon", "orange"]}
      style={{ flex: 1 }}
      //  Linear Gradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.title}>Welcome to Spotlight!</Text>
          <Text style={{ textAlign: "center" }}>
            Please fill in your information below
          </Text>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <ProfileImagePicker
              setImageURL={(imageURL) => setImageURL(imageURL)}
            />
            <NameInput
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

            <BioInput bio={bio} onChangeBio={(newBio) => setBio(newBio)} />

            <View style={styles.header}>
              <Button
                style={styles.register}
                icon="account-plus"
                mode="contained"
                disabled={!isMandatoryFields()}
                onPress={register}
              >
                <Text>I&apos;m ready!</Text>
              </Button>
              {!isMandatoryFields() && _wrongMessage()}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
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
  //   country:{
  //       marginTop: 10,
  //       marginBottom: 60,
  //       padding: 0,
  //       backgroundColor:"pink"
  //   },
  //   welcome: {
  //     fontSize: 20,
  //     textAlign: 'center',
  //     margin: 10,
  //   },
  instructions: {
    fontSize: 12,
    textAlign: "center",
    color: "#888",
    marginBottom: 5,
  },
  //   data: {
  //     padding: 15,
  //     marginTop: 10,
  //     backgroundColor: '#ddd',
  //     borderColor: '#888',
  //     color: '#777'
  //   },
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
  errorMessage: {
    color: "red",
  },
});

export default Onboarding;
