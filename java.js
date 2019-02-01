// Initialize Firebase
var config = {
    apiKey: "AIzaSyCf6XGANbmpwPOtn245shsiUiE8OlDZ3mo",
    authDomain: "train-scheduler-cb494.firebaseapp.com",
    databaseURL: "https://train-scheduler-cb494.firebaseio.com",
    projectId: "train-scheduler-cb494",
    storageBucket: "",
    messagingSenderId: "521254981346"
  };

firebase.initializeApp(config);

var database = firebase.database();

// Button for adding trains
$("#submit").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name").val().trim();
    var trainDest = $("#destination").val().trim();
    var trainTime = moment($("#train-time").val().trim(), "HH:mm").format("x");
    var trainFreq = $("#frequency").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: trainDest,
        time: trainTime,
        frequency: trainFreq,
    };

    // Uploads train data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name").val("");
    $("#dest").val("");
    $("#train-time").val("");
    $("#freq").val("");
});

//Creates Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    trainTime = moment.unix(trainTime).format("HH:mm");

    var trainFreq = childSnapshot.val().frequency;

    // Employee Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);

    var currentTime = moment();
    console.log("Current Time: " + currentTime);
    
    var convertedTrainTime = moment(trainTime, 'HH:mm').subtract(1, 'year');
    console.log("Converted Time " + convertedTrainTime);

    //var tFrequency = frequency;
   // console.log("Train Time: " + trainTime);

    //Time is 3:30am
    //var firstTime = trainTime;

    // First Time (pushed back 1 year to make sure it comes before current time)
    //var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

    // Difference between the times
    var diffTime = moment().diff(moment(convertedTrainTime), "minutes");
    console.log("Difference in Time: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFreq;

    // Minute Until Train
    var tMinutesTillTrain = trainFreq - tRemainder;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");


    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain),
    );

    // Append the new row to the table
    $("#table-div > tbody").append(newRow);
});


    

    