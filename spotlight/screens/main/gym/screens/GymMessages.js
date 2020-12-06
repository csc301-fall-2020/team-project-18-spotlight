/**
 * Inspiration from https://github.com/fireship-io/react-firebase-chat
 */

import React, { useContext, useRef, useState } from "react";

import firebase from "firebase/app";
import "firebase/firestore";

import {
  useCollectionData,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet, View, Image } from "react-native";
import { AuthContext } from "../../../authentication/EmailContext/AuthProvider";
import { Avatar, Button, TextInput } from "react-native-paper";
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
      <Text style={styles.header}>{title}</Text>
      <FlatList
        ref={bottomAnchor}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(message) => message.id}
      />
      <TextInput
        value={formValue}
        onChangeText={(text) => {
          setFormValue(text);
        }}
      />
      <Button title="Send" onPress={sendMessage}>
        Send
      </Button>
    </SafeAreaView>
  );
};

/**
 * @param {{userID: string, message: Message}} props
 */
const ChatMessage = ({ userID, message }) => {
  const messageType =
    message?.userID === userID ? styles.sent : styles.received;

  return (
    <View style={[styles.message, messageType]}>
      <Avatar.Image size={24} source={{ uri: message?.dpURL }} />
      <Text styles={styles.timeStamp}>
        {message?.createdAt?.toDate()?.toLocaleTimeString("en-US")}
      </Text>
      <Text style={styles.name}>
        {`${message?.firstName} ${message?.lastName}`}
      </Text>
      <Text>{message.text}</Text>
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
    fontSize: 30,
    fontStyle: "normal",
    textAlign: "center",
    paddingTop: "3%",
  },
  message: {
    display: "flex",
  },

  sent: { alignSelf: "flex-end", alignItems: "flex-end" },

  received: { alignSelf: "flex-start", alignItems: "flex-start" },
});
