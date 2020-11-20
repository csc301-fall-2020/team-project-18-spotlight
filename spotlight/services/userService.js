import * as firebase from "firebase";
import "firebase/firestore";

const db = firebase.firestore();

const createNewUser = async (userID) => {
  const data = {userID: userID};

  try{
    const userRef = db.collection("users").doc(userID);
    userRef.get().then( 
      (doc) => {
        if(!doc.exists()){
          doc.set(data);
        }
      }
    )
  }
  catch (e){
    console.log(e);
  }
}

const getAllUsers = () => {
  return [];
};

export { getAllUsers };