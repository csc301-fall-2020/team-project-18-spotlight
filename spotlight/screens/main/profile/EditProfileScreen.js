import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput
} from "react-native";
import { Button } from "react-native-paper";
import { AuthContext } from "../../authentication/EmailContext/AuthProvider";
import profilePic from "./images/profilePic.png";
import editProfile from "./images/editProfile.png";



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
            <View style={styles.changePassword}>
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

            </View>


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
    },
    input: {
        borderWidth: 1,
        width: 300,
    },
    changePassword: {
        top: 80,
    },
    changeInfo: {
        top: 100,
    }
});

export default EditProfileScreen;


