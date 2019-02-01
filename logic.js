var config = {
    apiKey: "AIzaSyA_QypGPkcjPtylRDscf7-HQl8ribnFeIs",
    authDomain: "time-sheet-55009.firebaseapp.com",
    databaseURL: "https://time-sheet-55009.firebaseio.com",
    storageBucket: "time-sheet-55009.appspot.com"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#submit").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name").val().trim();
    var destination = $("#train-destintion").val().trim();
    var trainTime = moment($("#train-time").val().trim(), "HH:mm").format("X");
    var frequency = moment($("#frequency").val().trim(), "mm").format("X");
  
    // Creates local "temporary" object for holding employee data
    var newTrain= {
      name:trainName,
      destination: destination,
      trainTime: trainTime,
      frequency: frequency,
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(destination.destination);
    console.log(trainTime.trainTime);
    console.log(frequency.frequency);
  
    alert("New Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-time").val("");
    $("#frequency").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var nextArrival = childSnapshot.val().nextArrival;
    var timeAway= childSnapshot.val().timeAway;

    // //Train Name</th>
    // <th>Destination</th>
    // <th>Frequency (min)</th>
    // <th>Next Arrival</th>
    // <th>Minutes Away</th>//
  
    // Employee Info
    // console.log(empName);
    // console.log(destination);
    // console.log(nextArrival);
    // console.log(minAway);
  
    // Prettify the employee start
  //   var nextArrivalPretty = moment.unix(empStart).format("HH:mm");
  
  //   // Calculate the months worked using hardcore math
  //   // To calculate the months worked
  //   var timeAway = moment().diff(moment(empStart, "X"), "months");
  //   console.log(empMonths);
  
  //   // Calculate the total billed rate
  //   var empBilled = empMonths * empRate;
  //   console.log(empBilled);
  
  //   // Create the new row
  //   var newRow = $("<tr>").append(
  //     $("<td>").text(empName),
  //     $("<td>").text(empRole),
  //     $("<td>").text(empStartPretty),
  //     $("<td>").text(empMonths),
  //     $("<td>").text(empRate),
  //     $("<td>").text(empBilled)
  //   );
  
  //   // Append the new row to the table
  //   $("#employee-table > tbody").append(newRow);
  });