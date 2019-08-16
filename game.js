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

