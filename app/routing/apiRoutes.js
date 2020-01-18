// Dependencies
// var path = require("path");
// var bodyParser = require('body-parser'); //middleware module to extract the entire body portion of an incoming request stream and exposes it on req.body.

// Connect JSON file to grab array of objects
var friendsList = require("../data/friends");

// Routing 
module.exports = function (app) {

    // API get request to get friends data
    app.get("/api/friends", function (req, res) {
        res.json(friendsList);
    });

    // Add friends
    app.post("/api/friends", function (req, res) {
        // capture user input 
        var newFriend = req.body;
        var friendScore = newFriend.scores;
        var score = [];
        var match = 0;
        var difference = 0;

        for (var i = 0; i < friendsList.length; i++) {
            difference = 0;

            // testing
            console.log("friends: " + JSON.stringify(friendsList[i]));

            for (var j = 0; j < friendScore.length; j++) {
                difference += (Math.abs(parseInt(friendsList[i].scores[j]) - parseInt(friendScore[j]))); // use Math.abs() to get rid of negative numbers
            }
            score.push(difference);
            }
            // compare results
            for (var i = 0; i < score.length; i++) {
                if(score[i] < score[match]) {
                    match = i;
                }
            }

            var bestFriend = friendsList[match];
            res.json(bestFriend);

            console.log(req.body);
            friendsList.push(req.body);
        });
};