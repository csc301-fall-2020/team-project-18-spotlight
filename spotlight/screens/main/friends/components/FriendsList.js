import React from 'react';
import { Text, View, SectionList, StyleSheet } from "react-native";
import {FriendRequest, Header, Friend} from "./FriendsListComponent"



const DATA = [
    {
        title: "Friend Requests",
        data: ["Laura", "Ala"]
    },
    {
        title: "Friends",
        data: ["Moe", "ZengHao", "Patrick", "Jennifer", "Olivia", "Samuel", "Alan"]
    }
]


const FriendsList = () => {

    const renderItem = ({item, section : {title}}) => {
        if(title === "Friend Requests"){
            return <FriendRequest name={item}/>
        } else{
            return <Friend name={item}/>
        }
    }

    return (
        <View style={styles.container}>
            <SectionList 
                style={styles.list}
                sections={DATA}
                renderItem={renderItem}
                renderSectionHeader={({section: {title}}) => {
                    return <Header title={title}/>
                }}
            />
        </View> 
    )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: "3%",
        flex: 1,
        alignItems: "flex-start",
    },
    list: {
        width: "100%",
    }
})

export default FriendsList;
