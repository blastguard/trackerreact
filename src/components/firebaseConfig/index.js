// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

function StartFirebase() {

    const firebaseConfig = {
        apiKey: "AIzaSyBhMgIi8lTnfRHD0tt_neZ0v9-9SeyyI6A",
        authDomain: "tracker-app-aca4b.firebaseapp.com",
        databaseURL: "https://tracker-app-aca4b-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "tracker-app-aca4b",
        storageBucket: "tracker-app-aca4b.appspot.com",
        messagingSenderId: "975698089328",
        appId: "1:975698089328:web:d9d2a93901cd6225596bb5",
        measurementId: "G-7LTW9277XZ"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    return getDatabase(app)
}

//const analytics = getAnalytics(app);

export default StartFirebase;