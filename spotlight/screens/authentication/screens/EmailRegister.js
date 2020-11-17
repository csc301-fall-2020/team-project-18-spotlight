import React, { useState, useContext } from 'react';
import {StyleSheet} from 'react-native';
import  {Container, Form, Input, Item, Button, Label , Text} from 'native-base';
import { AuthContext } from '../EmailContext/AuthProvider';

const EmailSignUp = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { emailRegister } = useContext(AuthContext);

    return (
        <Container style={styles.container}>
            <Text>Sign Up</Text>
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
                <Item floatingLabel>
                    <Label>Confirm Password</Label>
                    <Input
                        secureTextEntry={true}
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                    />
                </Item>     
                <Button style={{ marginTop: 20 }}
                full
                rounded 
                primary
                onPress = {() => emailRegister(email, password, confirmPassword)}
                >
                    <Text>Sign Up</Text>
                </Button>
            </Form>

            <Button style={{ marginTop: 20 }}
            rounded 
            success
            onPress = {() => navigation.navigate("EmailSignIn")}
            >
                <Text>Sign In</Text>
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

export default EmailSignUp;