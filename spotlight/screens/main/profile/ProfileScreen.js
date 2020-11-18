import React, { useContext } from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { Button } from 'react-native-paper';
import { AuthContext } from '../../authentication/EmailContext/AuthProvider';

const ProfileScreen = ({ navigation }) => {

    const { emailLogout } = useContext(AuthContext);

    return(
        <View style={styles.container}>
            <Text>
                {"Profile!"}
            </Text>
            <Button
            style={styles.back}
            icon="logout" 
            mode="contained" 
            onPress = {() => emailLogout()}>
                <Text style={{fontSize:15}}>Logout</Text>
            </Button>
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
    back:{
        marginTop: 20,
        backgroundColor: 'salmon',
        borderRadius:50, 
        width:120
    }
  });

export default ProfileScreen;
  