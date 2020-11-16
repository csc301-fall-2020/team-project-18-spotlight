import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Icon, StyleSheet, Text, View, Image, ImageBackground, Button, TextInput, TouchableOpacity } from 'react-native';
import profilePic from "./images/profilePic.png"
import book from "./images/book.png"
import calender from "./images/calender.png"
import friend from "./images/friend.png"
import profile from "./images/profile.png"
import editProfile from "./images/editProfile.png"
import back from "./images/back.png"
import location from "./images/location.png"
import message from "./images/message.png"

const textinfo = "Hey, I’m Laura! I love cycling and my dog Francis. I’m usually at the gym every weekday morning, Lmk if you wanna do some workouts together!"




const ProfileScreen2 = () => {
    return (
        <View style={styles.container}>
          <Image source={profilePic} style={styles.background} />
    
          <TouchableOpacity style={styles.backButton} onPress={() => { alert("you clicked me") }}>
            <Image source={back} />
          </TouchableOpacity>
    
          <TouchableOpacity style={styles.editProfile} onPress={() => { alert("you clicked me") }}>
            <Image source={editProfile} />
            <Text style={{ color: "white", position: "absolute", fontSize: 30 }} >
              {"Friends"}
            </Text>
          </TouchableOpacity>
    
          <View style={styles.info}>
            <Text style={{ fontSize: 40 ,top: 30}} >
              {"Laura"}
            </Text>
            <Text style={styles.titleText} >
              {"F | 20"}
            </Text>
            <Text style={styles.titleText} >
              {textinfo}
            </Text>
    
    
    
    
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.button} onPress={() => { alert("you clicked me") }}>
                <Image source={location} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => { alert("you clicked me") }}>
                <Image source={message} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => { alert("you clicked me") }}>
                <Image source={calender} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center'
    },
    backButton: {
      position: 'absolute',
      justifyContent: "center",
      alignItems: 'center',
      top: 40,
      left: 20
  
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
      backgroundColor: 'rgba(162, 10, 10, 1)',
      borderRadius: 50,
  
      width: 85,
      height: 40
    },
    info: {
      flexDirection: "column",
      top: 350,
      alignItems: 'center',
      width: 300,
      height: 370,
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
      marginBottom: 20
    },
    titleText: {
  
      fontSize: 20,
      fontWeight: "bold",
      top: 30
    }
  });

export default ProfileScreen2;
