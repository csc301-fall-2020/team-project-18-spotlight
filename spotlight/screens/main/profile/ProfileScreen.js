import React, { useContext } from 'react';
import { StyleSheet} from 'react-native';
import  {Container, Button, Text} from 'native-base';
import { AuthContext } from '../../authentication/EmailContext/AuthProvider';

const ProfileScreen = ({ navigation }) => {

    const { emailLogout } = useContext(AuthContext);

    return(
        <Container style={styles.container}>
            <Text>
                {"Profile!"}
            </Text>
            <Button style={{ marginTop: 20 }}
            rounded
            small
            danger
            onPress = {() => emailLogout()}
            >
                <Text>Log Out</Text>
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
  });

export default ProfileScreen;
  