import React from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";

const UpdateNameInput = ({
  firstName,
  onChangeFirstName,
  lastName,
  onChangeLastName,
  userName,
  onChangeUserName,
  email,
}) => {
  return (
    <View style={styles.header}>
        <TextInput
            style={styles.input}
            mode="outlined"
            label="First Name"
            underlineColorAndroid="transparent"
            value={firstName}
            autoCorrect={false}
            disabled="true"
            autoCapitalize="none"
            onChangeText={onChangeFirstName}
            left={<TextInput.Icon name="account" />}
        />

        <TextInput
            style={styles.input}
            mode="outlined"
            label="Last Name"
            underlineColorAndroid="transparent"
            value={lastName}
            autoCorrect={false}
            disabled="true"
            autoCapitalize="none"
            onChangeText={onChangeLastName}
            left={<TextInput.Icon name="account" />}
        />

        <TextInput
            mode="outlined"
            label="email"
            underlineColorAndroid="transparent"
            disabled="true"
            value={email}
            autoCorrect={false}
            autoCapitalize="none"
            left={<TextInput.Icon name="email" />}
        />

        <TextInput
            style={styles.input}
            mode="outlined"
            label="Username"
            underlineColorAndroid="transparent"
            value={userName}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={onChangeUserName}
            left={<TextInput.Icon name="account-circle" />}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 5,
    marginBottom: 5,
  },
  input: {
    marginBottom: 5,
  },
});

export { UpdateNameInput };