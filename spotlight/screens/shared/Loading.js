import React from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";

export default function Loading() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" animating={true} color={Colors.red800} />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
