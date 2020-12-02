import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProfileHeader } from "../components/Headers";
import { Button } from "react-native-paper";
import profilePic from "../images/ben.png";
import FriendButton from "../components/FriendButtonBar";
import { color } from "react-native-reanimated";
import { Entypo } from "@expo/vector-icons";
import default_pic from "../../../../assets/profile_picture.png"




const FriendProfile = ({ navigation, route }) => {
  const [friendInfo, setInfo] = useState({
    username: "",
    firstName: "",
    lastName: "",
    profilePicture: "",
    age: "",
    gender: "",
    bio: "",
    // isFriend: false,
  });

  

  if (route.params != undefined) {
    const {
      firstName,
      lastName,
      username,
      profilePicture,
      age,
      gender,
      bio,
    } = route.params.data;

    console.log("=============");
    console.log(firstName);
    console.log(lastName);
    console.log(username);
    console.log(profilePicture);
    console.log(age);
    console.log(gender);
    console.log(bio);

    let updated = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      profilePicture: profilePicture,
      age: age,
      gender: gender,
      bio: bio,
      // isFriend: false,
    }
    setInfo(updated);
    route.params = undefined;
  }

  let buttonTitle = "";
  let displayed = "";
  if (friendInfo.isFriend) {
    displayed = <FriendButton />;
    buttonTitle = "INFO";
  } else {
    displayed = (
      <Text style={{ position: "relative", top: 70 }}>
        add to your Friend list to check info
      </Text>
    );
    buttonTitle = "INFO";
  }

  // const onEditFriend = () => {
  //   let updated = {
  //     username: friendInfo.username,
  //     firstName: friendInfo.firstName,
  //     lastName: friendInfo.lastName,
  //     profilePicture: friendInfo.profilePicture,
  //     age: friendInfo.age,
  //     gender: friendInfo.gender,
  //     bio: friendInfo.bio,
  //     isFriend: !friendInfo.isFriend,
  //   };
  //   setInfo(updated);
  // };

  const sendToFriendList = () => {
    navigation.navigate("Friends Screen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => sendToFriendList()}>
        <Entypo name={"chevron-small-left"} size={40} color={"black"} />
      </TouchableOpacity>

      {/* <ProfileHeader
        name={data.nickname}
        onPressBack={() => navigation.navigate("Friends Screen")}
      /> */}
      <Image source={friendInfo.profilePicture ? { uri: friendInfo.profilePicture } : default_pic} style={styles.background} />
      <Button style={styles.editFriend}
      //  onPress={onEditFriend}
       >
        <Text style={styles.addFriend}>{"INFO"}</Text>
      </Button>

      <View style={styles.info}>
        <Text style={{ fontSize: 40 }}>{friendInfo.username}</Text>
        <Text style={styles.titleText}>
          {friendInfo.gender + " | " + friendInfo.age}
        </Text>
        <Text style={{ textAlign: "justify", fontSize: 16 }}>
          {friendInfo.bio}
        </Text>
        {/* {displayed} */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: "red"
  },
  friendButtons: {},
  addFriend: {
    color: "white",
    fontSize: 20,
  },
  background: {
    position: "absolute",
    flex: 1,
    top: 0,
    width: "100%",
    height: 460,
    justifyContent: "flex-end",
  },
  info: {
    flexDirection: "column",
    top: 300,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "grey",
    borderWidth: 2,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    backgroundColor: "white",
    width: "95%",
    height: "42%",
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
  editFriend: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    top: 325,
    zIndex: 10,
    elevation: 3,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "black",
    borderRadius: 30,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  back: {
    right: 140,
    zIndex: 20,
  },
});

export default FriendProfile;

