import React from 'react';
import { Text, View, StyleSheet} from 'react-native';


const CalanderScreen = () => {
    return(
        <View style={styles.container}>
            <Text>
                {"Calander!"}
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

export default CalanderScreen;
  