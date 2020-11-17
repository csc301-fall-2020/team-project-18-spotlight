import React, { useState, useContext } from 'react';
import {StyleSheet} from 'react-native';
import  {Container, Form, Input, Item, Button, Label , Text} from 'native-base';
import { AuthContext } from '../EmailContext/AuthProvider';

const EmailSignIn = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { emailLogin } = useContext(AuthContext);

    return (
        <Container style={styles.container}>
            <Text>Sign In</Text>
            <Form>
                <Item floatingLabel>
                    <Label>Email</Label>
                    <Input
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={(email) => setEmail(email)}
                    />
                </Item>
                <Item floatingLabel>
                    <Label>Password</Label>
                    <Input
                        secureTextEntry={true}
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={(password) => setPassword(password)}
                    />
                </Item>     
                <Button style={{ marginTop: 20 }}
                full 
                rounded 
                success
                onPress = {() => emailLogin(email, password)}
                >
                    <Text>Sign In</Text>
                </Button>    
            </Form>

            <Button style={{ marginTop: 20 }}
            rounded 
            primary
            onPress = {() => navigation.navigate("EmailSignUp")}
            >
                <Text>Sign Up</Text>
            </Button>

            <Button style={{ marginTop: 20 }}
            rounded 
            small
            danger
            onPress = {() => navigation.navigate("Authentication")}
            >
                <Text>Back</Text>
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

export default EmailSignIn;