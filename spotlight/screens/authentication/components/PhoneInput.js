import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-paper";

const PhoneInput = ({ phoneNumber, onChangePhoneNumber }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Phone (To receive text updates)</Text>

      <TextInput
        mode="outlined"
        label="Phone Number"
        underlineColorAndroid="transparent"
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType={"numeric"}
        left={<TextInput.Icon name="cellphone" />}
        value={phoneNumber}
        onChangeText={onChangePhoneNumber}
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

export { PhoneInput };
