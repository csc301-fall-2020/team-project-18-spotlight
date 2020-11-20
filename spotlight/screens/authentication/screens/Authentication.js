import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { Button } from 'react-native-paper';


const Authentication = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>AUTHENTICATION</Text>
            
            <Button 
            icon="email" 
            mode="contained" 
            onPress={() => navigation.navigate('EmailLogIn')}>
                EMAIL AUTHENTICATION
            </Button>
        </View>
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