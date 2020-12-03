import React from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";

const BioInput = ({ bio, onChangeBio }) => {
  return (
    <View style={styles.header}>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Bio"
        underlineColorAndroid="transparent"
        value={bio}
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={onChangeBio}
        multiline={true}
        left={<TextInput.Icon name="human" />}
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

export { BioInput };
