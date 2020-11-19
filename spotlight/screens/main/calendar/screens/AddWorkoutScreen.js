import React, { useState } from 'react';
import { Text, View, Button, StyleSheet} from 'react-native';
import WorkoutDetails  from '../components/WorkoutDetails';

const AddWorkoutScreen = ({navigation}) => {
    const muscles = ['Arms', 'Abs', 'Glutes']
    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                Add Workout!
            </Text>
            <Button
                title="Back"
                color="#A20A0A"
                onPress={() =>
                    navigation.navigate('Calendar Stack')}
                />

            {muscles.map((muscle) => {
                return (
                    <WorkoutDetails muscle={muscle}/>
                );
            })}

        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        fontFamily: "Raleway_600SemiBold",
        fontSize: 30,
        fontStyle: "normal",
        textAlign: "center",
        paddingTop: "21%"
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
      overflow: 'scroll',
    },
  });

export default AddWorkoutScreen;