import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-paper";

const AddressInput = ({
  address,
  onChangeAddress,
  city,
  onChangeCity,
  province,
  onChangeProvince,
  zip,
  onChangeZip,
}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Address for promotions/coupons</Text>

      <TextInput
        mode="outlined"
        label="Address"
        underlineColorAndroid="transparent"
        autoCorrect={false}
        autoCapitalize="none"
        value={address}
        onChangeText={onChangeAddress}
        left={<TextInput.Icon name="home" />}
      />

      <TextInput
        mode="outlined"
        label="City"
        underlineColorAndroid="transparent"
        autoCorrect={false}
        autoCapitalize="none"
        value={city}
        onChangeText={onChangeCity}
        left={<TextInput.Icon name="city" />}
      />

      <TextInput
        mode="outlined"
        label="State/Province"
        underlineColorAndroid="transparent"
        autoCorrect={false}
        autoCapitalize="none"
        value={province}
        onChangeText={onChangeProvince}
        left={<TextInput.Icon name="image-filter-hdr" />}
      />

      <TextInput
        mode="outlined"
        label="ZIP Code"
        underlineColorAndroid="transparent"
        autoCorrect={false}
        autoCapitalize="none"
        value={zip}
        onChangeText={onChangeZip}
        left={<TextInput.Icon name="map-marker" />}
      />
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
});

export { AddressInput };
