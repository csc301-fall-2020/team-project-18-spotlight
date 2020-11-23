import React, { useState, useContext } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button
} from "react-native";



const textinfo =
    "Hey, I’m Laura! I love cycling and my dog Francis. I’m usually at the gym every weekday morning, Lmk if you wanna do some workouts together!";

const EditProfileScreen = ({ navigation }) => {
    const [profileInfo, setInfo] = useState({
        email: "laura.la@utoronto.ca",
        phone: "647-666-6666",
        password: "123456",


        nickname: "Lara",
        name: "Laura",
        birthday: "2000-01-01",
        gender: "F",
        age_lower: 20,
        age_upper: 25,
        description: textinfo,

    });

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
                        placeholder={profileInfo.nickname}
                    />
                </View>

                <View style={styles.textInput}>
                    <Text style={styles.text}>
                        Change name:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={profileInfo.name}
                    />
                </View>

                <View style={styles.textInput}>
                    <Text style={styles.text}>
                        Change birthday:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={profileInfo.birthday}
                    />
                </View>

                <View style={styles.textInput}>
                    <Text style={styles.text}>
                        Change gender:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={profileInfo.gender}
                    />
                </View>

                <View style={styles.textInput}>
                    <Text style={styles.text}>
                        Change description:
                    </Text>
                    <TextInput
                        style={styles.description}
                        placeholder={profileInfo.description}
                    />
                </View>


                <Button 
                    title="SAVE"
                    color="#A20A0A"
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


