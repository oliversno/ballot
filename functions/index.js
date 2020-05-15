const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// run `firebase deploy` to  sync with firebase
exports.deleteOldItems = functions.database.ref('/ballots')
.onWrite((change, context) => { //onWrite because having a schedualed job costs $0.10 a month
  var ref = change.after.ref.parent; // reference to the items
  var now = Date.now();
  var cutoff = now - 7 * 24 * 60 * 60 * 1000; //ballot hasn't been voted on in one week
  var oldItemsQuery = ref.orderByChild('timeLastUpdated').endAt(cutoff);
  return oldItemsQuery.on('child_added', function(data) {
    // create a map with all children that need to be removed
    var updates = {};
    updates[data.key] = null
    // execute all updates in one go and return the result to end the function
    return ref.update(updates);
  });
});


