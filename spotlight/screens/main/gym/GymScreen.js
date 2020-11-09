import React from 'react';
import { Text, View, StyleSheet} from 'react-native';


const GymScreen = () => {
    return(
        <View style={styles.container}>
            <Text>
                {"Gym!"}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default GymScreen;
  