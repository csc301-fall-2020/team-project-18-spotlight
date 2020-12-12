/**
 * Inspiration from https://github.com/fireship-io/react-firebase-chat
 */

import React, { useContext, useEffect, useRef, useState } from "react";

import firebase from "firebase/app";
import "firebase/firestore";

import {
  useCollectionData,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet, View, Image } from "react-native";
import { AuthContext } from "../../../authentication/EmailContext/AuthProvider";
import { Avatar, Button, TextInput, ToggleButton } from "react-native-paper";
import { FlatList } from "react-native";

/**
 * @typedef {Object} Message
 * @property {import('firebase').firestore.Timestamp} createdAt
 * @property {string} dpURL
 * @property {string} text
 * @property {string} userID
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} id
 */

const GymMessages = ({ route, navigation }) => {
  /**
   * @type {{gymID: string, title: string,}}
   */
  const { gymID, title } = route.params;

  /**
   * @type {{user: {uid: string}}}
   */
  const {
    user: { uid },
  } = useContext(AuthContext);

  // To allow scrolling to the bottom on sending a message
  const bottomAnchor = useRef();
  const db = firebase.firestore();

  const messagesRef = db.collection("gyms").doc(gymID).collection("messages");
  const messagesQuery = messagesRef.orderBy("createdAt").limit(25);

  /**
   * @type {[Message[], boolean]}
   */
  const [messages, messagesLoading] = useCollectionData(messagesQuery, {
    idField: "id",
  });

  const userRef = db.collection("users").doc(uid);
  const [user, userLoading] = useDocumentDataOnce(userRef);

  const [formValue, setFormValue] = useState("");

  /**
   * @param {TouchEvent} event
   */
  const sendMessage = async (event) => {
    event.preventDefault();

    await messagesRef.add({
      text: formValue,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      userID: uid,
      dpURL: user.profilePicture,
    });

    setFormValue("");
    bottomAnchor.current.scrollToEnd();
  };

  /**
   *
   * @param {{message: Message}}
   */
  const renderMessage = ({ item }) => {
    return <ChatMessage message={item} userID={uid} />;
  };

  if (userLoading || messagesLoading) {
    return (
      <SafeAreaView>
        <Text>Loading messages...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <ToggleButton
          icon="arrow-left-circle"
          color="#A20A0A"
          title="back"
          style={styles.back}
          onPress={() => navigation.goBack()}
        ></ToggleButton>

        <Text style={styles.header}>{title}</Text>
      </View>
      <FlatList
        ref={bottomAnchor}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(message) => message.id}
      />
      <View style={{ flexDirection: "row" }}>
        <TextInput
          value={formValue}
          onChangeText={(text) => {
            setFormValue(text);
          }}
          style={styles.textinput}
        />
        <Button title="Send" style={styles.send} onPress={sendMessage}>
          Send
        </Button>
      </View>
    </SafeAreaView>
  );
};

/**
 * @param {{userID: string, message: Message}} props
 */
const ChatMessage = ({ userID, message }) => {
  const messageType =
    message?.userID === userID ? styles.sent : styles.received;

  const source =
    message.dpURL === ""
      ? require("../../../../assets/profile_picture.png")
      : { uri: message.dpURL };

  return (
    <View style={[styles.message, messageType]}>
      <View style={{ flexDirection: "row" }}>
        <Avatar.Image size={24} source={source} />

        <Text style={styles.name}>
          {`${message?.firstName} ${message?.lastName}`}
        </Text>
      </View>
      <Text style={styles.text}>{message.text}</Text>
      <Text styles={styles.timeStamp}>
        {message?.createdAt?.toDate()?.toLocaleTimeString("en-US")}
      </Text>
    </View>
  );
};

export default GymMessages;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 25,
    fontStyle: "normal",
    textAlign: "center",
    paddingTop: "3%",
    paddingRight: "18%",
  },
  textinput: {
    borderRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: 320,
    height: 40,
  },
  message: {
    display: "flex",
    backgroundColor: "#1982FC",
    marginBottom: "2%",
  },
  back: {
    marginTop: "5%",
  },
  send: {
    marginTop: 10,
  },
  text: {
    fontSize: 20,
  },

  sent: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
    borderRadius: 20,
    marginTop: "5%",
    padding: "2%",
    marginRight: "3%",
    backgroundColor: "rgba(191, 249, 255, 0.8)",
  },

  received: {
    alignSelf: "flex-start",
    alignItems: "flex-start",
    borderRadius: 20,
    marginTop: "3%",
    padding: "2%",
    marginLeft: "5%",
    backgroundColor: "rgba(191, 255, 206, 0.8)",
  },
  name: {
    marginLeft: 10,
  },
});
