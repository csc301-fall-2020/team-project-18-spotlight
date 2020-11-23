import React, { useState, useContext, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button
} from "react-native";
import { Value } from "react-native-reanimated";

const textinfo =
    "Hey, I’m Laura! I love cycling and my dog Francis. I’m usually at the gym every weekday morning, Lmk if you wanna do some workouts together!";

const EditProfileScreen = ({ route, navigation }) => {

    const [nickname, setNickname] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [description, setDescription] = useState("");
    const [birthday, setBirthday] = useState("");


    const save = () => {
        cond = true;
        const info = {nickname:nickname, name:name, gender:gender, description:description, birthday:birthday}
        setNickname("")
        setName("")
        setGender("")
        setDescription("")
        setBirthday("")

        navigation.navigate("ProfileScreen", {nickname:nickname, name:name, gender:gender, description:description, birthday:birthday})
      };

      if (route.params != undefined) {
        const {nickname, name, gender, description, birthday} = route.params;
        setNickname(nickname)
        setName(name)
        setGender(gender)
        setDescription(description)
        setBirthday(birthday)
        route.params = undefined;

      }
    

    return (
        <View style={styles.container}>
            {/* <View style={styles.changePassword}>
                <View style={styles.textInput}>
                    <Text>
                        Change password:
                    </Text>
                    <TextInput
                        style={styles.input}
                    />
                </View>

                <View style={styles.textInput}>
                    <Text>
                        Confirm password:
                    </Text>
                    <TextInput
                        style={styles.input}
                    />
                </View>

                <Button>
                    Save
                </Button>

            </View> */}


            <View style={styles.changeInfo}>
                <View style={styles.textInput}>
                    <Text style={styles.text}>
                        Change nickname:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={nickname}
                        onChangeText={(value)=> {setNickname(value)}}
                        value = {nickname}
                    />
                </View>

                <View style={styles.textInput}>
                    <Text style={styles.text}>
                        Change name:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={name}
                        onChangeText={(value)=> {setName(value)}}
                        value = {name}
                    />
                </View>

                <View style={styles.textInput}>
                    <Text style={styles.text}>
                        Change birthday:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={birthday}
                        onChangeText={(value)=> {setBirthday(value)}}
                        value = {birthday}
                    />
                </View>

                <View style={styles.textInput}>
                    <Text style={styles.text}>
                        Change gender:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={gender}
                        onChangeText={(value)=> {setGender(value)}}
                        value = {gender}
                    />
                </View>

                <View style={styles.textInput}>
                    <Text style={styles.text}>
                        Change description:
                    </Text>
                    <TextInput
                        style={styles.description}
                        placeholder={description}
                        onChangeText={(value)=> {setDescription(value)}}
                        value = {description}
                    />
                </View>


                <Button 
                    title="SAVE"
                    color="#A20A0A"
                    onPress={()=> save()}
                />
                   

            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#A20A0A",
        flex: 1,
        position: "absolute"

    },
    textInput: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        width: 300,
        color: "grey",
    },
    description: {
        borderWidth: 1,
        width: 300,
        color: "grey",
        height: 200,
    },
    changePassword: {
        top: 80,
    },
    changeInfo: {
        flexDirection: "column",
        top: 20,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "grey",
        borderWidth: 2,
        borderRadius: 40,
        backgroundColor: 'white',
        width: '95%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        zIndex: 3,
        padding: 10,
    },
    text: {
        color: "#A20A0A",
    },
});

export default EditProfileScreen;


