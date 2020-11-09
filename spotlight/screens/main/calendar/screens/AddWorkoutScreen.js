import React, { useState } from 'react';
import { Text, View, StyleSheet} from 'react-native';

const AddWorkoutScreen = () => {
    return (
        <View style={styles.container}>
            <Text>
                Add Workout!
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        fontFamily: "Raleway_600SemiBold",
        fontSize: 40,
        fontStyle: "normal",
        textAlign: "center",
        paddingTop: 20,
        paddingBottom: 20,
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
  });

export default AddWorkoutScreen;