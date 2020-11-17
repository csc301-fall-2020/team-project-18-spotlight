import React from 'react';
import { Icon, StyleSheet, Text, View, Image, ImageBackground, Button, TextInput, TouchableOpacity } from 'react-native';
import profilePic from "./images/profilePic.png"

import editProfile from "./images/editProfile.png"

const textinfo = "Hey, I’m Laura! I love cycling and my dog Francis. I’m usually at the gym every weekday morning, Lmk if you wanna do some workouts together!"




const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={profilePic} style={styles.background} />
            <TouchableOpacity style={styles.editProfile} onPress={() => { alert("you clicked me") }}>
                <Image source={editProfile} />
                <Text style={{ color: "white", position: "absolute", fontSize: 30 }} >
                    {"Edit Profile"}
                </Text>
            </TouchableOpacity>

            <View style={styles.info}>
                <Text style={{ fontSize: 40 }} >
                    {"Laura"}
                </Text>
                <Text style={styles.titleText} >
                    {"F | 20"}
                </Text>
                <Text style={styles.titleText} >
                    {textinfo}
                </Text>


            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center'
    },
    background: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      height: 400,
      justifyContent: 'flex-end',
    },
    text: {
      color: "white",
      fontSize: 42,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000a0"
    },
    button: {
      justifyContent: "center",
      alignItems: 'center',
  
      width: 85,
      height: 40
    },
    info: {
      flexDirection: "column",
      top: 350,
      alignItems: 'center',
      justifyContent: "center",
      width: 300,
      height: 300,
      borderColor: 'black',
      borderWidth: 1.2,
      position: 'absolute',
      zIndex: 3,
    },
    editProfile: {
      position: 'absolute',
      flexDirection: "column",
      alignItems: 'center',
      justifyContent: "center",
      top: 330,
      zIndex: 10,
      
    },
  
    buttonGroup: {
      flexDirection: "row",
      bottom: 0,
      position: 'absolute',
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 36
    },
    titleText: {
      fontFamily: '',
      fontSize: 20,
      fontWeight: "bold"
    }
  });

export default ProfileScreen;
