import firebase from "firebase";
const config = {
    apiKey: "AIzaSyB6bhYrQqHnABFfGTb-rC2pl0YEl1dhuaI",
    authDomain: "react-food-app.firebaseapp.com",
    databaseURL: "https://react-food-app.firebaseio.com",
    projectId: "react-food-app",
    storageBucket: "react-food-app.appspot.com",
    messagingSenderId: "92087877588"
};
firebase.initializeApp(config);
const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

export {db}
export default firebase;