const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// run `firebase deploy` to  sync with firebase
exports.deleteOldItems = functions.database.ref('/ballot')
.onWrite((change, context) => {
  var ref = change.after.ref.parent; // reference to the items
  var now = Date.now();
  var cutoff = now - 5 * 1000; //older than 5 seconds
  var oldItemsQuery = ref.orderByChild('timeLastUpdated').endAt(cutoff);
  return oldItemsQuery.once('value', function(snapshot) {
    // create a map with all children that need to be removed
    var updates = {};
    snapshot.forEach(function(child) {
      updates[child.key] = null
    });
    // execute all updates in one go and return the result to end the function
    return ref.update(updates);
  });
});


