import React, { useState } from 'react';
import {StyleSheet} from 'react-native';
import {auth} from 'firebase';
import  {Container, Title, Content, Header, Form, Input, Item, Button, Label , Text} from 'native-base';
  
const EmailSignUp = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const signUpUser = () => {
        try{
            if(password.length < 6){
                alert("Please enter at least 6 characters");
                return;
            }

            if(password !== confirmPassword){
                alert("Password and Confirm Password is not the same!");
                return;
            }

            auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
            }).then(() => {
                navigation.navigate("Main");
            }).catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                alert('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                alert('That email address is invalid!');
                }

                alert(error);
            });

        } catch (error){
            alert(error.toString());
        }
    }

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
                onPress = {() => signUpUser()}
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