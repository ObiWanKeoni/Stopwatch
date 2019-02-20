import firebase from 'firebase';


const config = {
    // Firebase Config Here
};

firebase.initializeApp(config);

export function firebaseListener(func) {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            func(true, user);
        } else {
            func(false);
        }
    }, function(error) {
        console.log(error);
    });
}
const firestore = firebase.firestore();

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
export const db = firestore;
