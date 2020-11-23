import * as firebase from "firebase";
import "firebase/firestore";
import useFirestoreQuery from "./useFirestoreQuery";

const useGyms = () => {
  console.log("Getting all gyms from firestore.");
  const db = firebase.firestore();
  const gymsRef = db.collection("gyms");
  return useFirestoreQuery(gymsRef);
};

export default useGyms;
