import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CountryPicker from "react-native-country-picker-modal";

const CountryInput = ({ country, countryCode, onSelect }) => {
  const [withCountryNameButton, setWithCountryNameButton] = useState(false);
  const [withFlag, setWithFlag] = useState(true);
  const [withEmoji, setWithEmoji] = useState(true);
  const [withFilter, setWithFilter] = useState(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState(false);
  const [withCallingCode, setWithCallingCode] = useState(false);

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Country</Text>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 5,
            paddingBottom: 5,
            width: 150,
            flexDirection: "row",
          }}
        >
          <CountryPicker
            {...{
              countryCode,
              withFilter,
              withFlag,
              withCountryNameButton,
              withAlphaFilter,
              withCallingCode,
              withEmoji,
              onSelect,
            }}
          />
          {country !== null && (
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                marginLeft: 10,
              }}
            >
              {country.name}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  data: {
    padding: 15,
    marginTop: 10,
    backgroundColor: "#ddd",
    borderColor: "#888",
    color: "#777",
  },
  instructions: {
    fontSize: 12,
    textAlign: "center",
    color: "#888",
    marginBottom: 5,
  },
});

export { CountryInput };
