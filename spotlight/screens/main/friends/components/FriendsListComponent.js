import React from 'react';
import { Text, View, SectionList, StyleSheet } from "react-native";
import {Avatar} from 'react-native-paper';
import { Entypo } from '@expo/vector-icons'; 

const Header = ({title}) => {
    return (
        <View>
            <Text style={styles.requestHeader}>{title}</Text>
        </View> 
    )
}

const FriendRequest = ({name}) => {
    return (
        <View style={styles.friendContainer}> 
            <Avatar.Text size={64} 
            label={name.slice(0, 3)} style={styles.avatarStyle}
            labelStyle={styles.avatarLabelStyle}/>
            <Text style={styles.friendName}>{name}</Text>
            <Entypo name="check" size={24} color="#adadad" 
            style={{position: "absolute", right: "20%"}}/>
            <Entypo name="block" size={24} color="#adadad"
            style={{position: "absolute", right: "7.5%"}}
            />

        </View>
    )
}

const Friend = ({name}) => {
    return (
        <View style={styles.friendContainer}>
            <Avatar.Text size={64} 
            label={name.slice(0, 3)} 
            style={styles.avatarStyle}
            labelStyle={styles.avatarLabelStyle}
            />
            <Text style={styles.friendName}>{name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    requestHeader: {
        fontFamily: "Raleway_600SemiBold",
        fontSize: 24,
        fontStyle: "normal",
        paddingTop: "4%",
        paddingBottom: "1%",
      },
      friendContainer:{
          flex:1,
          flexDirection: "row",
          alignItems: 'center',
          paddingVertical: "3%",
      },
      friendName: {
          marginLeft: 10,
          fontSize: 20,
          fontFamily: "Raleway_600SemiBold"
      },
      avatarStyle: {
        backgroundColor: "#A20A0A",
        borderRadius: 10
      },
      avatarLabelStyle: {
        fontSize: 24,
      }
})

export {FriendRequest, Header, Friend};