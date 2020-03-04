// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyByAyDFaMNDwKpfRhAQPk0B70ILYst-oS4",
authDomain: "ballot-d933a.firebaseapp.com",
databaseURL: "https://ballot-d933a.firebaseio.com",
projectId: "ballot-d933a",
storageBucket: "ballot-d933a.appspot.com",
messagingSenderId: "227086842486",
appId: "1:227086842486:web:849611a5373b9fc0ce7d57",
measurementId: "G-Y8X924EG6M"
};
// Initialize Firebase
initializeApp(firebaseConfig);
analytics();

import { initializeApp, analytics, database } from 'firebase';

function saveToFirebase(info) {
    var infoObject = {
        info: info
    };
    var tokensRef = database().ref("tokens/");
    tokensRef.push().set(infoObject);
    return alert("pushed");
}

saveToFirebase(info);
