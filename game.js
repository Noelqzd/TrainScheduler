const firebaseConfig = {
    apiKey: "AIzaSyChiXQDKBzWPjxeNPAl6uqk93M_y9fYjnY",
    authDomain: "train-schedule-ee87d.firebaseapp.com",
    databaseURL: "https://train-schedule-ee87d.firebaseio.com",
    projectId: "train-schedule-ee87d",
    storageBucket: "train-schedule-ee87d.appspot.com",
    messagingSenderId: "436318822730",
    appId: "1:436318822730:web:68f820b9ed41da64"
};
firebase.initializeApp(firebaseConfig);
let database = firebase.database();
$('#addTrainBtn').on("click", function () {

    let trainName = $("#trainNameInput").val().trim();
    let destination = $("#destinationInput").val().trim();
    let firstTrain = moment($("#timeInput").val().trim(), "HH:mm").format("HH:mm");
    let frequency = $("#frequencyInput").val().trim();

    let newTrain = {
        name: trainName,
        place: destination,
        ftrain: firstTrain,
        freq: frequency
    }

    database.ref().push(newTrain);
    console.log(newTrain.name);

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#timeInput").val("");
    $("#frequencyInput").val("");

    return false;
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    let trainName = childSnapshot.val().name;
    let destination = childSnapshot.val().place;
    let firstTrain = childSnapshot.val().ftrain;
    let frequency = childSnapshot.val().freq;

    let firstTimeConverted = moment(firstTrain, "HH:mm");
    console.log(firstTimeConverted);
    let currentTime = moment().format("HH:mm");
    console.log("CURRENT TIME: " + currentTime);

    let timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
    console.log(firstTrain);
    console.log("Difference in Time: " + timeDiff);

    let timeRemainder = timeDiff % frequency;
    console.log(timeRemainder);

    let minToTrain = frequency - timeRemainder;

    let nxTrain = moment().add(minToTrain, "minutes").format("HH:mm");
    $("#trainTable>tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + nxTrain + "</td><td>" + frequency + "</td><td>" + minToTrain + "</td></tr>");
});