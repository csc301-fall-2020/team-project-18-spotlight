import React, { useContext } from 'react';
import { StyleSheet, Text} from 'react-native';
import  {Container} from 'native-base';
import { Button } from 'react-native-paper';
import { AuthContext } from '../../authentication/EmailContext/AuthProvider';

const ProfileScreen = ({ navigation }) => {

    const { emailLogout } = useContext(AuthContext);

    return(
        <Container style={styles.container}>
            <Text>
                {"Profile!"}
            </Text>
            {/* <Button style={{ marginTop: 20 }}
            rounded
            small
            danger
            onPress = {() => emailLogout()}
            >
                <Text>Log Out</Text>
            </Button> */}
            <Button
            style={styles.back}
            icon="logout" 
            mode="contained" 
            onPress = {() => emailLogout()}>
                <Text style={{fontSize:15}}>Logout</Text>
            </Button>
        </Container>
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
  