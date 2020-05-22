const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// run `firebase deploy` to  sync with firebase
exports.deleteOldItems = functions.database.ref('/ballots/')
.onUpdate((change, context) => { //onUpdate because having a schedualed job costs $0.10 a month
  var now = Date.now();
  var cutoff = now - 7 * 24 * 60 * 60 * 1000; //ballot hasn't been voted on in one week
  var ballotRef = change.before.ref;
  var query = ballotRef.orderByChild('timeLastUpdated').endAt(cutoff);
  query.on('child_added', function(snapshot){
    snapshot.ref.remove()
      .then(function(){
        console.log("Removed", snapshot.ref.toString())
        return
      })
      .catch(function(error){
        console.log("Failed to remove", snapshot.ref.toString(), "Error:", error.message)
      });
  });
});


