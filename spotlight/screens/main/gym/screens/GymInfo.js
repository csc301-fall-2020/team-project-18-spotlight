import React, { useEffect, useState, useContext } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { ToggleButton, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";

import {
  addFavoriteGym,
  removeFavoriteGym,
  getGymUserAttending,
  attendGym,
  unattendGym,
  getUsersInGym,
} from "../../../../services/gymService";
import { AuthContext } from "../../../authentication/EmailContext/AuthProvider";

const GymInfo = ({ route, navigation }) => {
  // Parameters passed from previous screen
  const { title, address, isFavorite, gymID } = route.params;
  const { user } = useContext(AuthContext);
  const [favoriteChecked, setFavoriteChecked] = useState(isFavorite);
  const [attendChecked, setAttendChecked] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [usersInGym, setUsersInGym] = useState(null);
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
      setUsersInGym(await getUsersInGym(gymID));
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
    getUsersInGym(gymID).then((usersInGym) => {
      setUsersInGym(usersInGym);
    });
  }, []);

  useEffect(() => {
    (async () => {
      const userAttending = await getGymUserAttending(user.uid);
      const isAttended = userAttending === gymID;
      setAttendChecked(isAttended);
    })();
  }, []);

  const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.items, style]}>
      <AwesomeIcon
        paddingTop="10%"
        marginTop="10%"
        name={
          item["gender"] != null &&
          item["gender"] == "male" &&
          item["gender"] != "non-binary"
            ? "mars"
            : "venus"
        }
        color="#A20A0A"
        size={20}
      />
      <Text style={styles.row}>
        {item["firstName"]} {item["lastName"]}
      </Text>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => {
    return <Item item={item} onPress={() => null} style={[styles.list]} />;
  };

  const goToMessages = () => {
    navigation.navigate("Gym Messages", { gymID, title });
  };

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
        <FlatList
          data={usersInGym}
          renderItem={renderItem}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          extraData={selectedId}
          style={styles.profile}
        />

        <Button
          style={{ marginBottom: 5 }}
          mode="contained"
          title="Messages"
          onPress={goToMessages}
        >
          Gym Messages
        </Button>

        {/* <View style={styles.data} /> */}
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <Button
            mode="contained"
            icon={attendChecked ? "account-arrow-left" : "account-arrow-right"}
            // labelStyle={{ fontSize: 30 }}
            color="#A20A0A"
            title="attend"
            onPress={toggleAttending}
            // paddingLeft="30%"
            status={favoriteChecked ? "checked" : "unchecked"}
          >
            <Text style={{ color: "white" }}>
              {attendChecked ? "Leave" : "Attend"}
            </Text>
          </Button>

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
    backgroundColor: "#d3d3d3",
    borderRadius: 10,
    marginBottom: "5%",
  },
  list: {
    padding: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  item: {
    backgroundColor: "#A20A0A",
  },
  row: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "bold",
    paddingLeft: 10,
  },
});

export default GymInfo;
