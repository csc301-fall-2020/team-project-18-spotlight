import React, { useState, useContext } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput
} from "react-native";
import { Button } from "react-native-paper";



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
                    <Text>
                        Change nickname:
                    </Text>
                    <TextInput
                        style={styles.input}
                    />
                </View>

                <View style={styles.textInput}>
                    <Text>
                        Change name:
                    </Text>
                    <TextInput
                        style={styles.input}
                    />
                </View>

                <View style={styles.textInput}>
                    <Text>
                        Change birthday:
                    </Text>
                    <TextInput
                        style={styles.input}
                    />
                </View>

                <View style={styles.textInput}>
                    <Text>
                        Change gender:
                    </Text>
                    <TextInput
                        style={styles.input}
                    />
                </View>

                <View style={styles.textInput}>
                    <Text>
                        Change description:
                    </Text>
                    <TextInput
                        style={styles.input}
                    />
                </View>


                <Button>
                    Save
                </Button>

            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    textInput: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        width: 300,
    },
    changePassword: {
        top: 80,
    },
    changeInfo: {
        flexDirection: "column",
        top: 150,
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
    }
});

export default EditProfileScreen;


