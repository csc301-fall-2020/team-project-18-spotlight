import React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import SignOutBtn from '../../authentication/SignOut'


const ProfileScreen = () => {
    return(
        <View style={styles.container}>
            <Text>
                {"Profile!"}
            </Text>
            <SignOutBtn />
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

export default ProfileScreen;
  