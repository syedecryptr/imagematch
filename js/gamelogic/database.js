function hashCode(str) {
    return str.split('').reduce((prevHash, currVal) =>
      (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
  }


function writeUserData(userId, name, score, channel, display) {
    var database = firebase.database().ref(channel+'/'+hashCode(userId));
    firebase.database().ref(channel+"/" + hashCode(userId)).once('value').then(function(snapshot) {
        //update the database only when user time is less than the previous time
        //Or the user is playing for the first time.
        if (snapshot.val() == null || score < snapshot.val().score){
            database.set({
                name: name,
                score: score
            }, function(error) {
                if (error) {
                  // The write failed...
                  console.log("writing to database failed")
                } else {
                    console.log("write success")
                  // Data saved successfully!
                    display()
                }
              });
        }
        else{
            display()
        }

    });
};

function ReadUserData(channel){
    var leaderboard = []
    var scoreCountRef = firebase.database().ref(channel+'/');
    // console.log(scoreCountRef)
    scoreCountRef.orderByChild("score").on('value', function(snapshot) {
        // console.log(snapshot.val())
        leaderboard = []
        snapshot.forEach(function(child) {
            leaderboard.push(child.val()) // NOW THE CHILDREN PRINT IN ORDER
        });
        var el = document.getElementById("table")
        el.removeAttribute("style")
        generate_table(leaderboard)
    });
};


 