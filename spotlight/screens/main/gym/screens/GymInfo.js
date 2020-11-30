import React, { useEffect, useState, useContext } from "react";
import { render } from "react-dom";
import { Text, View, StyleSheet, Alert } from "react-native";
import { ToggleButton, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import CurrentGym from "../components/CurrentGym";
import Icon from "react-native-vector-icons";

import {
  isGymFavorited,
  getGymByAddress,
  addFavoriteGym,
  removeFavoriteGym,
  getGymUserAttending,
  attendGym,
  unattendGym,
} from "../../../../services/gymService";
import { AuthContext } from "../../../authentication/EmailContext/AuthProvider";

const GymInfo = ({ route, navigation }) => {
  // Parameters passed from previous screen
  const { title, address, isFavorite, gymID } = route.params;
  const { user } = useContext(AuthContext);
  const [favoriteChecked, setFavoriteChecked] = useState(isFavorite);
  const [attendChecked, setAttendChecked] = useState(false);

  // const add_member = () => {
  //   (async () => {
  //     if (!attendChecked && (attending != gymID || attending == null)) {
  //       // add user to this gym
  //       await attendGym(gymID, user.uid);
  //       setAttendChecked(!attendChecked);
  //       console.log("Adding user to this gym.");
  //       Alert.alert("", "You are at the gym now!", [{ text: "OK" }], {
  //         cancelable: false,
  //       });
  //     } else if (attendChecked && attending == gymID) {
  //       // user is at a gym and this is the gym so remove user from this gym
  //       await unattendGym(gymID, user.uid);
  //       setAttendChecked(!attendChecked);
  //       console.log("Removed user from this gym.");
  //       Alert.alert("", "You left the gym!", [{ text: "OK" }], {
  //         cancelable: false,
  //       });
  //     } else {
  //       // user is at a gym and this isn't the gym user is at, so give alert user
  //       Alert.alert(
  //         "",
  //         "You are already at a different gym!",
  //         [{ text: "OK" }],
  //         { cancelable: false }
  //       );
  //     }
  //   })();
  // };
  const toggleAttending = () => {
    (async () => {
      const userAttending = await getGymUserAttending(user.uid);

      if (!attendChecked && userAttending == null) {
        // add user to this gym
        await attendGym(gymID, user.uid);
        await setAttendChecked(!attendChecked);
        console.log("Adding user to this gym.");
        Alert.alert("", "You are at the gym now!", [{ text: "OK" }], {
          cancelable: false,
        });
      } else if (attendChecked && userAttending === gymID) {
        // user is at a gym and this is the gym so remove user from this gym
        await unattendGym(gymID, user.uid);
        setAttendChecked(!attendChecked);
        console.log("Removed user from this gym.");
        Alert.alert("", "You left the gym!", [{ text: "OK" }], {
          cancelable: false,
        });
      } else {
        // user is at a gym and this isn't the gym user is at, so give alert user
        Alert.alert(
          "",
          "You are already at a different gym!",
          [{ text: "OK" }],
          { cancelable: false }
        );
      }
    })();
  };

  const toggleFavorite = () => {
    (async () => {
      if (favoriteChecked) {
        // remove gym from favorites
        await removeFavoriteGym(gymID, user.uid);
        console.log("Removing gym from favorites.");
      } else {
        // add gym to favorites
        await addFavoriteGym(gymID, user.uid);
        console.log("Adding gym to favorites.");
      }
      setFavoriteChecked(!favoriteChecked);
    })();
  };

  useEffect(() => {
    (async () => {
      const userAttending = await getGymUserAttending(user.uid);
      const isAttended = userAttending === gymID;
      setAttendChecked(isAttended);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ToggleButton
        icon={favoriteChecked ? "heart" : "heart-outline"}
        iconSize="50"
        labelStyle={{ fontSize: 30 }}
        color="#A20A0A"
        marginTop="8%"
        marginLeft="80%"
        marginRight="10%"
        title="favourite"
        onPress={toggleFavorite}
        status={favoriteChecked ? "checked" : "unchecked"}
      ></ToggleButton>

      <Text style={styles.header}>{title}</Text>
      <Text style={styles.description}>{address}</Text>
      <View style={styles.block}>
        <View style={styles.profile} />
        <View style={styles.data} />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ToggleButton
            icon={attendChecked ? "minus" : "plus"}
            labelStyle={{ fontSize: 30 }}
            color="#A20A0A"
            title="attend"
            onPress={toggleAttending}
            paddingLeft="30%"
            status={favoriteChecked ? "checked" : "unchecked"}
          >
            Attend
          </ToggleButton>
          <Button
            title="Return to map"
            onPress={() => navigation.goBack()}
            color="#A20A0A"
            mode={"outlined"}
          >
            Return to map
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  block: {
    flex: 1,
    backgroundColor: "#fff",
    paddingRight: "5%",
    paddingLeft: "5%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  header: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 30,
    fontStyle: "normal",
    textAlign: "center",
    paddingTop: "3%",
  },
  description: {
    fontFamily: "Raleway_600SemiBold",
    textAlign: "center",
    marginBottom: "5%",
    paddingLeft: "3%",
  },
  profile: {
    flex: 0.3,
    backgroundColor: "#d3d3d3",
    borderRadius: 10,
    paddingTop: "85%",
    marginBottom: "5%",
  },
  data: {
    flex: 0.3,
    backgroundColor: "#d3d3d3",
    borderRadius: 10,
    paddingBottom: "50%",
    marginBottom: "5%",
  },
  favourite: {},
});

export default GymInfo;
