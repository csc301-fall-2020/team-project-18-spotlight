import * as firebase from "firebase";
import "firebase/firestore";

const allGymsQuery = () => {
  return firebase.firestore().collection("gyms");
};

export { allGymsQuery };
