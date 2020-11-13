import React from 'react';
import { Text, View, StyleSheet} from 'react-native';

const FriendProfile = () => {
    return(
        <View style={styles.container}>
            <Text>
                {"Friend Profile!"}
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

export default FriendProfile;