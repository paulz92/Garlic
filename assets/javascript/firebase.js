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

$("#submit-review").on("click", function(event) {
  event.preventDefault();

	var firstName = $("#first_name").val().trim();
 	var lastName = $("#last_name").val().trim();
 	var recipe = $("#recipeTried").val().trim();
 	var comment = $("#comment").val().trim();
 	var rating = $('input[name="group1"]:checked').attr("value");

 	var review = {
 		firstName: firstName,
 		lastName: lastName,
 		recipe: recipe,
 		comment: comment,
 		rating: rating
 	};

 	database.ref().push(review);

 	$("#first_name").val("");
 	$("#last_name").val("");
 	$("#recipeTried").val("");
 	$("#comment").val("");
 	$('input[type=checkbox]').prop('checked', false);
});

database.ref().on("child_added", function(childSnapshot) {

	var firstName = childSnapshot.val().firstName;
 	var lastName = childSnapshot.val().lastName;
 	var recipe = childSnapshot.val().recipe;
 	var comment = childSnapshot.val().comment;
  var rating = childSnapshot.val().rating;

  // creating a function to display recipe data in a card
  var createCard = function() {
    // writing to browser
    // creating card div
    var card = $("<div>");
    card.addClass("card review-card");
    // creating div for card title and info
    var cardText = $("<div>");
    cardText.addClass("card-title review-title");
    // creating card title equal to recipe name
    var cardTitle = $("<span>");
    cardTitle.addClass("user-name");
    cardTitle.text(firstName + " " + lastName);
    // putting star ratings in
    var starRating = $("<span>")
    starRating.addClass("stars");
    starRating.text(rating);
    starRating.stars();
    // creating card title equal to recipe made
    var cardRecipe = $("<span>");
    cardRecipe.addClass("recipe-made");
    cardRecipe.text(recipe);
    // creating page break
    var pageBreak1 = $("<br>");
    var pageBreak2 = $("<br>");
    // appending card title, breaks, and recipe info to card text
    cardText.append(cardRecipe);
    cardText.append(pageBreak1);
    cardText.append(cardTitle);
    cardText.append(pageBreak2);
    cardText.append(starRating);
    // creating card content div
    var cardContent = $("<div>");
    cardContent.addClass("card-content review-content");
    cardContent.text(comment);
    // appending card content to card div
    card.append(cardText);
    card.append(cardContent);  
    // appending card div to column
    $(".reviews").prepend(card);
  };

  createCard();
  }, function(errorObject) {
  	   console.log("errors handled: " + errorObject.code);
  }
);