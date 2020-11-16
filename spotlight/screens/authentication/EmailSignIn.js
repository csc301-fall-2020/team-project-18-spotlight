import React, { useState } from 'react';
import {StyleSheet} from 'react-native';
import {auth} from 'firebase';
import  {Container, Title, Content, Header, Form, Input, Item, Button, Label , Text} from 'native-base';
  
const EmailSignIn = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const logInUser = () => {
        try{
            if(password.length < 6){
                alert("Please enter at least 6 characters");
                return;
            }

            auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                alert('User signed in!');
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
                onPress = {() => logInUser()}
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