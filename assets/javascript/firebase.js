
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAuse8BMo6IzgxhDoO8RiXxFQvUAzHyRrU",
    authDomain: "garlic-a9fc8.firebaseapp.com",
    databaseURL: "https://garlic-a9fc8.firebaseio.com",
    projectId: "garlic-a9fc8",
    storageBucket: "garlic-a9fc8.appspot.com",
    messagingSenderId: "196444623528"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit").on("click", function(event) {
    event.preventDefault();

  	var firstName = $("#first_name").val().trim();
  	var lastName = $("#last_name").val().trim();
  	var recipe = $("#recipeTried").val().trim();
  	var comment = $("#comment").val().trim();
  	// var rating = $("#rating").val().trim();

  	var review = {
  		firstName: firstName,
  		lastName: lastName,
  		recipe: recipe,
  		comment: comment,
  		// rating: rating
  	};

  	database.ref().push(review);

  	$("#first_name").val("");
  	$("#last_name").val("");
  	$("#recipeTried").val("");
  	$("#comment").val("");
  	// $("#rating").val("");

  });

  database.ref().on("child_added", function(childSnapshot) {

  	var firstName = childSnapshot.val().firstName;
  	var lastName = childSnapshot.val().lastName;
  	var recipe = childSnapshot.val().recipe;
  	var comment = childSnapshot.val().comment;
  	// var rating = childSnapshot.val().rating;

  	$("#reviewDisplay").append("<p>" + firstName + " " + lastName + "</p><br>" +
  							   "<p>" + recipe + " "  + "</p><br>" +
  							   "<p>" + comment + "</p>");

  }, function(errorObject) {
  	console.log("errors handled: " + errorObject.code);
  });
