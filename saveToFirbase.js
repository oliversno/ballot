function saveToFirebase(info) {
    var infoObject = {
        info: info
    };

    firebase.database().ref('subscription-entries').push().set(infoObject)
        .then(function(snapshot) {
            success(); // some success method
        }, function(error) {
            console.log('error' + error);
            error(); // some error method
        });
}

saveToFirebase(info);
