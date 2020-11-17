import React from 'react';
import {StyleSheet} from 'react-native';
import  {Container, Button, Text} from 'native-base';


const Authentication = ({ navigation }) => {
    return (
        <Container style={styles.container}>
            <Text>Authentication</Text>
            <Button style={{ marginTop: 20 }}
            full
            rounded 
            onPress = {() => navigation.navigate('EmailLogIn')}
            >
                <Text>Email Authentication</Text>
            </Button> 
        </Container>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 50,
    },
});

export default Authentication;