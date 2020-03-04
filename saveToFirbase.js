var firebase = require('firebase');

function saveToFirebase(info) {
    var infoObject = {
        info: info
    };
    var tokensRef = firebase.database().ref("tokens/");
    tokensRef.push().set(infoObject);
    return alert("pushed");
}

saveToFirebase(info);
