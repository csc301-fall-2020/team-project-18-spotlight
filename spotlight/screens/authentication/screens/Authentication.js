import React from 'react';
import {StyleSheet, Text} from 'react-native';
import  {Container} from 'native-base';
import { Button } from 'react-native-paper';


const Authentication = ({ navigation }) => {
    return (
        <Container style={styles.container}>
            <Text style={styles.title}>AUTHENTICATION</Text>
            
            <Button 
            icon="email" 
            mode="contained" 
            onPress={() => navigation.navigate('EmailLogIn')}>
                EMAIL AUTHENTICATION
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
    title:{
        fontWeight:'bold', 
        marginBottom:10, 
        fontSize:20,
        textAlign:"center"
    }
});

export default Authentication;