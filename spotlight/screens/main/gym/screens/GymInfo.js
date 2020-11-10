import React from 'react';
import { Text, View, StyleSheet, Button} from 'react-native';
import { IconButton, Colors } from 'react-native-paper';



const GymInfo = () => {
    return(
        <View style = {styles.container}>
            <Text style = {styles.header}>Gym Name</Text>
            <Text style = {styles.description}>Address</Text>
            <View style = {styles.block}>
                <View style = {styles.top} />
                <View style = {styles.middle} />
                <View style = {styles.bottom}  />
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    block: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "#fff",
        padding: "5%",
        margin: "5%",
      },
    header:{
        fontFamily: "Raleway_600SemiBold",
        fontSize: 30,
        fontStyle: "normal",
        textAlign: "center",
        paddingTop: "20%",
    },
    description:{
        fontFamily: "Raleway_600SemiBold",
        textAlign: "center",
        marginBottom: "5%",
        paddingLeft: "3%",
    },
    top: {
        flex: 0.3,
        backgroundColor: "#d3d3d3",
        borderRadius: 10,
      },
      middle: {
        flex: 0.3,
        backgroundColor: "#d3d3d3",
        borderRadius: 10,

      },
      bottom: {
        flex: 0.3,
        backgroundColor: "#d3d3d3",
        borderRadius: 10,
      },
    });

export default GymInfo;