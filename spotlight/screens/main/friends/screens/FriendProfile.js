import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProfileHeader } from "../components/Headers";
import { Button } from "react-native-paper";
import profilePic from "../images/ben.png";
import FriendButton from "../components/FriendButtonBar";

const textinfo =
  "Hey, I’m Laura! I love cycling and my dog Francis. I’m usually at the gym every weekday morning, Lmk if you wanna do some workouts together!";

const FriendProfile = ({ navigation, route }) => {
  // const data = route.params.data;
  const [friendInfo, setInfo] = useState({
    nickname: "Aura",
    name: "Ben",
    gender: "M",
    description: textinfo,
    birthday: "2000 01 01",
    age: "22",
    isFriend: false
  });

  let buttonTitle = "";
  let displayed = "";
  if (friendInfo.isFriend) {
    displayed = <FriendButton />;
    buttonTitle = "REMOVE";
    console.log("friend is true")

  } else {
    displayed = <Text style={{ position: 'relative', top: 70 }}>add to your Friend list to check info</Text>;
    buttonTitle = "ADD AS FRIEND";
    console.log("friend is false")
  }

  const onEditFriend = () => {
    let updated = {
      nickname: friendInfo.nickname,
      name: friendInfo.name,
      gender: friendInfo.gender,
      description: friendInfo.description,
      birthday: friendInfo.birthday,
      age: friendInfo.age,
      isFriend: !friendInfo.isFriend
    }
    setInfo(updated);
    console.log(friendInfo)
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <ProfileHeader
        name={data.nickname}
        onPressBack={() => navigation.navigate("Friends Screen")}
      /> */}
      <Image source={profilePic} style={styles.background} />
      <Button style={styles.editFriend} onPress={onEditFriend}>
        <Text style={styles.addFriend}>
          {buttonTitle}
        </Text>
      </Button>

      <View style={styles.info}>
        <Text style={{ fontSize: 40 }}>
          {friendInfo.name}
        </Text>
        <Text style={styles.titleText}>
          {friendInfo.gender + " | " + friendInfo.age}
        </Text>
        <Text style={{ textAlign: "justify", fontSize: 16 }}>
          {friendInfo.description}
        </Text>
        {displayed}

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
  friendButtons: {
  },

  addFriend: {
    color: "white",
    fontSize: 20

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
    top: 345,
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
    top: 365,
    zIndex: 10,
    elevation: 3,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "black",
    borderRadius: 30
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  back: {
    marginTop: 20,
    backgroundColor: "salmon",
    borderRadius: 50,
    width: 120,
  },
});


export default FriendProfile;














  // const sendToEdit = () => {
  //   navigation.navigate("EditProfileScreen", {
  //     nickname: profileInfo.nickname,
  //     name: profileInfo.name,
  //     gender: profileInfo.gender,
  //     description: profileInfo.description,
  //     birthday: profileInfo.birthday,
  //     age: profileInfo.age,
  //   });
  // };

  // if (route.params != undefined) {
  //   const { nickname, name, gender, description, birthday, age } = route.params;
  //   const newInfo = {
  //     nickname: nickname,
  //     name: name,
  //     gender: gender,
  //     description: description,
  //     birthday: birthday,
  //     age: age,
  //   };
  //   setInfo(newInfo);
  //   route.params = undefined;
  // }